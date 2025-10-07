import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { apiService } from '../services/api'
import { useCompany } from '../context/company-context'
import { Building2, Calendar, MapPin, Search } from 'lucide-react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanySelector({ open, onOpenChange }: Props) {
  const { setCompany } = useCompany()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<any[]>([])

  useEffect(() => {
    if (!open) return
    fetchCompanies('')
    setQuery('')
  }, [open])

  useEffect(() => {
    const handle = setTimeout(() => {
      if (open) fetchCompanies(query)
    }, 250)
    return () => clearTimeout(handle)
  }, [query, open])

  const fetchCompanies = async (q: string) => {
    try {
      setLoading(true)
      // Prefer search endpoint if exists, else fallback to list with client filter
      let data: any[] = []
      try {
        const resp = await apiService.companies.search({ q })
        data = resp.data.results || resp.data
      } catch {
        const resp = await apiService.companies.list()
        const all = resp.data.results || resp.data
        data = q ? all.filter((c: any) => (
          (c.name || '').toLowerCase().includes(q.toLowerCase()) ||
          (c.description || '').toLowerCase().includes(q.toLowerCase())
        )) : all
      }
      setCompanies(data)
    } catch (e) {
      console.error('Company search failed', e)
      setCompanies([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (c: any) => {
    setCompany({
      id: c.id,
      name: c.name,
      industry: c.industry,
      stage: c.stage,
      headquarters: c.headquarters,
      logo_url: c.logo_url,
    })
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-background rounded-lg border shadow-lg w-full max-w-2xl max-h-[90vh] mx-4 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Select a company</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="relative">
            <Input
              autoFocus
              placeholder="Search companies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-3 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-search-decoration]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-results-button]:hidden"
            />
          </div>

          <div className="max-h-[60vh] overflow-auto space-y-2">
            {loading && (
              <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                Loading companies...
              </div>
            )}
            {!loading && companies.length === 0 && (
              <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                No companies found
              </div>
            )}

            {!loading && companies.map((c) => (
              <button
                key={c.id}
                className="w-full text-left p-3 rounded-lg border transition-colors flex items-start space-x-3 focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 hover:border-ring hover:shadow-sm cursor-pointer"
                onClick={() => handleSelect(c)}
              >
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {(c.name || '?').charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="font-medium">{c.name}</span>
                    {c.industry && <Badge variant="outline">{c.industry}</Badge>}
                    {c.stage && <Badge variant="secondary">{c.stage}</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {c.headquarters && (
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.headquarters}</span>
                    )}
                    {c.founded_year && (
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {c.founded_year}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


