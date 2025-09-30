import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Star
} from 'lucide-react'
import { apiService } from '../services/api'

interface Company {
  id: string
  name: string
  description: string
  industry: string
  stage: string
  founded_year: number
  headquarters: string
  website?: string
  logo_url?: string
  employee_range: string
  funding_raised?: number
  funding_currency: string
  ai_score?: number
  ai_confidence?: number
  created_at: string
  updated_at: string
}

export function LeadsGeneration() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedStage, setSelectedStage] = useState('all')
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const response = await apiService.companies.list()
      setCompanies(response.data.results || response.data)
    } catch (err) {
      console.error('Error fetching companies:', err)
      setError('Failed to load companies')
    } finally {
      setLoading(false)
    }
  }

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = !selectedIndustry || selectedIndustry === 'all' || company.industry === selectedIndustry
    const matchesStage = !selectedStage || selectedStage === 'all' || company.stage === selectedStage
    
    return matchesSearch && matchesIndustry && matchesStage
  })

  const industries = [...new Set(companies.map(c => c.industry))]
  const stages = [...new Set(companies.map(c => c.stage))]

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading companies...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchCompanies}>Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Search className="h-6 w-6" />
          <span>Leads Generation</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          Discover and analyze potential investment opportunities powered by AI
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search companies, descriptions, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                AI Market Intelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">247</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">New Companies</div>
                  <div className="text-xs text-blue-500">This week</div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">87%</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Match Score</div>
                  <div className="text-xs text-blue-500">Avg relevance</div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">12</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Hot Leads</div>
                  <div className="text-xs text-blue-500">High potential</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Companies ({filteredCompanies.length} results)
          </h2>
          <Button variant="outline" size="sm">
            Export List
          </Button>
        </div>

        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {company.name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{company.name}</h3>
                        <Badge variant="outline">{company.industry}</Badge>
                        <Badge variant="secondary">{company.stage}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {company.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{company.headquarters}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Founded {company.founded_year}</span>
                        </div>
                        {company.funding_raised && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${(company.funding_raised / 1000000).toFixed(1)}M raised</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{company.employee_range} employees</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {company.ai_score && (
                        <>
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-lg">{company.ai_score}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          <Badge 
                            variant={company.ai_score >= 90 ? "default" : company.ai_score >= 80 ? "secondary" : "outline"}
                            className="mb-3"
                          >
                            {company.ai_score >= 90 ? "High Potential" : company.ai_score >= 80 ? "Good Fit" : "Moderate Fit"}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        View Analysis
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Quick Report
                      </Button>
                    </div>
                    <Button size="sm">
                      Deep Dive
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}