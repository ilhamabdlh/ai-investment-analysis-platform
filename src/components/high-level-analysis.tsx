import React, { useEffect, useMemo, useState } from 'react'
import { useCompany } from '../context/company-context'
import { apiService } from '../services/api'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2,
  Calendar,
  Target,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react'

export function HighLevelAnalysis() {
  const { company } = useCompany()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<any | null>(null)
  const lastUpdated = useMemo(() => new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }), [])

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      if (!company?.id) return
      setLoading(true)
      setError(null)
      try {
        const resp = await apiService.companies.fullAnalysis(company.id)
        if (!isMounted) return
        setAnalysisData(resp.data)
      } catch (e: any) {
        if (!isMounted) return
        setError('Failed to load analysis')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [company?.id])

  const companyData = useMemo(() => {
    const c = analysisData?.company
    return c ? {
      name: c.name,
      industry: c.industry,
      stage: c.stage,
      founded: c.founded_year,
      headquarters: c.headquarters,
      employees: c.employee_range,
      website: c.website || c.logo_url || '-',
      overallScore: analysisData?.high_level_analyses?.[0]?.overall_score ?? c.ai_score ?? 0,
    } : null
  }, [analysisData])

  const highLevelAnalysis = useMemo(() => {
    return analysisData?.high_level_analyses?.[0] || null
  }, [analysisData])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <span>High-Level Analysis</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          Comprehensive company overview and fundamental analysis
        </p>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>Last analysis update: {lastUpdated}</span>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Company In Focus */}
      <div className="rounded-lg border bg-muted/40 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-base md:text-lg">
            {(company?.name || companyData?.name || 'C').charAt(0)}
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Analyzing company</div>
            <div className="font-medium">{company?.name || companyData?.name || '—'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">In focus</Badge>
          <Button variant="ghost" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('open-company-selector'))}>Change</Button>
        </div>
      </div>

      {/* Company Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div>
                <CardTitle className="text-xl">{companyData?.name || '—'}</CardTitle>
                <p className="text-muted-foreground">{companyData?.industry || '—'} • {companyData?.stage || '—'}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-1">{companyData?.overallScore ?? 0}</div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Overall Score
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData?.founded ?? '—'}</div>
              <div className="text-sm text-muted-foreground">Founded</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Building2 className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData?.headquarters ?? '—'}</div>
              <div className="text-sm text-muted-foreground">HQ</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData?.employees ?? '—'}</div>
              <div className="text-sm text-muted-foreground">Employees</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData?.website ?? '—'}</div>
              <div className="text-sm text-muted-foreground">Website</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(highLevelAnalysis?.metrics || []).map((metric: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.category}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold">{metric.score ?? 0}</div>
                      <div className={`flex items-center space-x-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {metric.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
                        {metric.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
                        {metric.trend === 'stable' && <Activity className="h-4 w-4" />}
                        {metric.change_percentage != null && (
                          <span className="text-sm">{metric.change_percentage > 0 ? `+${metric.change_percentage}%` : `${metric.change_percentage}%`}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Progress value={metric.score ?? 0} className="h-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{metric.value}</span>
                      {metric.score != null && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {(highLevelAnalysis?.risk_factors || []).map((risk: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    Risk
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{risk.title || risk.name || 'Risk'}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{risk.description || String(risk)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          {(highLevelAnalysis?.opportunities || []).map((opportunity: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{opportunity.title || opportunity.name || 'Opportunity'}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{opportunity.description || String(opportunity)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span>AI-Generated Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(highLevelAnalysis?.key_findings || []).map((insight: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{typeof insight === 'string' ? insight : (insight?.text || JSON.stringify(insight))}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    Analysis confidence: <strong>{Math.round(((highLevelAnalysis?.confidence_score ?? 0) * 100))}%</strong>
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}