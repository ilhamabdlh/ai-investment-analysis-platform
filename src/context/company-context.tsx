import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiService } from '../services/api'

export interface CompanySummary {
  id: string
  name: string
  industry?: string
  stage?: string
  headquarters?: string
  logo_url?: string
}

interface CompanyContextValue {
  company: CompanySummary | null
  setCompany: (company: CompanySummary | null) => void
  loading: boolean
}

const CompanyContext = createContext<CompanyContextValue | undefined>(undefined)

const STORAGE_KEY = 'selected_company'

function getCompanyIdFromUrl(): string | null {
  try {
    const url = new URL(window.location.href)
    return url.searchParams.get('company')
  } catch {
    return null
  }
}

function setCompanyIdInUrl(companyId: string | null) {
  try {
    const url = new URL(window.location.href)
    if (companyId) {
      url.searchParams.set('company', companyId)
    } else {
      url.searchParams.delete('company')
    }
    window.history.replaceState({}, '', url.toString())
  } catch {
    // ignore URL errors
  }
}

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompanyState] = useState<CompanySummary | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    async function hydrate() {
      setLoading(true)
      try {
        // Priority: URL param, else localStorage
        const urlCompanyId = getCompanyIdFromUrl()
        if (urlCompanyId) {
          const resp = await apiService.companies.get(urlCompanyId)
          const data = resp.data
          const summary: CompanySummary = {
            id: data.id,
            name: data.name,
            industry: data.industry,
            stage: data.stage,
            headquarters: data.headquarters,
            logo_url: data.logo_url,
          }
          if (!isMounted) return
          setCompanyState(summary)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(summary))
          return
        }

        const persisted = localStorage.getItem(STORAGE_KEY)
        if (persisted) {
          const parsed: CompanySummary = JSON.parse(persisted)
          if (isMounted) setCompanyState(parsed)
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    hydrate()
    return () => {
      isMounted = false
    }
  }, [])

  const setCompany = (next: CompanySummary | null) => {
    setCompanyState(next)
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setCompanyIdInUrl(next.id)
    } else {
      localStorage.removeItem(STORAGE_KEY)
      setCompanyIdInUrl(null)
    }
  }

  const value = useMemo(() => ({ company, setCompany, loading }), [company, loading])

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  )
}

export function useCompany(): CompanyContextValue {
  const ctx = useContext(CompanyContext)
  if (!ctx) throw new Error('useCompany must be used within CompanyProvider')
  return ctx
}


