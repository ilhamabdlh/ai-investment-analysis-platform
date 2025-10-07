import React, { useEffect, useMemo, useState } from 'react'
import { useCompany } from '../context/company-context'
import { apiService } from '../services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  GitCompare, 
  TrendingUp, 
  Zap,
  Shield,
  DollarSign,
  Star,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

export function CompetitiveAnalysis() {
  const { company } = useCompany()
  const [analysisData, setAnalysisData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
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
      } catch (e) {
        if (!isMounted) return
        setError('Failed to load analysis')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [company?.id])

  const competitive = useMemo(() => {
    return analysisData?.competitive_analyses?.[0] || null
  }, [analysisData])

  const companyName = analysisData?.company?.name || '—'
  
  // Use structured competitors from the database, fall back to legacy competitor_analysis JSON
  const competitors = useMemo(() => {
    // Prefer the new structured competitors field
    if (competitive?.competitors && competitive.competitors.length > 0) {
      return competitive.competitors.map((c: any) => ({
        name: c.name || 'Competitor',
        position: c.position || '—',
        marketShare: c.market_share || '-',
        revenue: c.revenue || '-',
        funding: c.funding || '-',
        employees: c.employees || '-',
        founded: c.founded || '-',
        headquarters: c.headquarters || '-',
        strengths: c.strengths || [],
        weaknesses: c.weaknesses || [],
        score: c.score || 0,
        trend: c.trend || 'stable',
        logo: c.logo || '📊',
      }))
    }
    
    // Fall back to legacy competitor_analysis JSON field
    return (competitive?.competitor_analysis || []).map((c: any) => {
      if (typeof c === 'string') {
        return {
          name: c,
          position: '—',
          marketShare: '-',
          revenue: '-',
          funding: '-',
          employees: '-',
          founded: '-',
          headquarters: '-',
          strengths: [],
          weaknesses: [],
          score: 0,
          trend: 'stable',
          logo: '📊',
        }
      }
      return {
        name: c.name || c.title || 'Competitor',
        position: c.position || '—',
        marketShare: c.marketShare || c.market_share || '-',
        revenue: c.revenue || '-',
        funding: c.funding || '-',
        employees: c.employees || '-',
        founded: c.founded || '-',
        headquarters: c.headquarters || '-',
        strengths: c.strengths || [],
        weaknesses: c.weaknesses || [],
        score: c.score || 0,
        trend: c.trend || 'stable',
        logo: c.logo || '📊',
      }
    })
  }, [competitive])
  
  const swotAnalysis = {
    strengths: competitive?.swot_strengths || [],
    weaknesses: competitive?.swot_weaknesses || [],
    opportunities: competitive?.swot_opportunities || [],
    threats: competitive?.swot_threats || [],
  }
  
  // Competitive advantages - simple list
  const competitiveAdvantages = competitive?.competitive_advantages || []
  
  // Competitive threats - simple list
  const competitiveThreats = competitive?.competitive_threats || []
  
  // Differentiation factors - simple list
  const differentiationFactors = competitive?.differentiation_factors || []

  // Strategic recommendations - prefer structured data from database, fall back to legacy JSON
  const strategicRecommendations = useMemo(() => {
    // Use new structured strategic_recommendation_items field
    if (competitive?.strategic_recommendation_items && competitive.strategic_recommendation_items.length > 0) {
      return competitive.strategic_recommendation_items.map((item: any) => ({
        category: item.category || 'Strategy',
        priority: item.priority ? item.priority.charAt(0).toUpperCase() + item.priority.slice(1) : 'Medium',
        recommendations: Array.isArray(item.recommendations) ? item.recommendations : []
      })).filter((item: any) => item.recommendations.length > 0)
    }
    
    // Fall back to legacy strategic_recommendations JSON field
    return (competitive?.strategic_recommendations || []).map((r: any) => ({
      category: r.category || 'Strategy',
      priority: r.priority || 'Medium',
      recommendations: Array.isArray(r.recommendations) ? r.recommendations : []
    })).filter((item: any) => item.recommendations.length > 0)
  }, [competitive])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <GitCompare className="h-6 w-6" />
          <span>Competitive Analysis</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          Comprehensive competitor benchmarking and strategic positioning analysis
        </p>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>Last analysis update: {lastUpdated}</span>
        </div>
      </div>

      {/* Company In Focus */}
      <div className="rounded-lg border bg-muted/40 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-base md:text-lg">
            {(company?.name || companyName).charAt(0)}
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Analyzing company</div>
            <div className="font-medium">{company?.name || companyName}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">In focus</Badge>
          <Button variant="ghost" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('open-company-selector'))}>Change</Button>
        </div>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="landscape" className="space-y-6">
        <TabsList className="inline-flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="landscape">Landscape</TabsTrigger>
          <TabsTrigger value="swot">SWOT</TabsTrigger>
          <TabsTrigger value="advantages">Advantages</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="differentiation">Differentiation</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="landscape" className="space-y-6">
          <div className="space-y-6">
            {competitors.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No competitor data available
                </CardContent>
              </Card>
            )}
            {competitors.map((competitor, index) => (
              <Card key={index} className={`hover:shadow-md transition-shadow ${
                competitor.name === 'TechFlow AI' ? 'ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="text-4xl">{competitor.logo}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold">{competitor.name}</h3>
                            <Badge variant={competitor.name === 'TechFlow AI' ? 'default' : 'outline'}>
                              {competitor.position}
                            </Badge>
                            {competitor.name === 'TechFlow AI' && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Our Company
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-4 w-4" />
                              <span>{competitor.employees} employees</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{competitor.headquarters}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Founded {competitor.founded}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{competitor.funding} funding</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="text-2xl font-bold">{competitor.score}</span>
                            <div className={`flex items-center space-x-1 ${
                              competitor.trend === 'up' ? 'text-green-600' : 
                              competitor.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                            }`}>
                              {competitor.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
                              {competitor.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
                              {competitor.trend === 'stable' && <Activity className="h-4 w-4" />}
                            </div>
                          </div>
                          {/* <div className="text-sm text-muted-foreground mb-1">
                            {competitor.marketShare} market share
                          </div> */}
                          <div className="font-semibold">{competitor.revenue} revenue</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2 text-green-700 dark:text-green-300">
                            <CheckCircle className="h-4 w-4" />
                            <span>Strengths</span>
                          </h4>
                          <div className="space-y-1">
                            {competitor.strengths.map((strength, strengthIndex) => (
                              <Badge key={strengthIndex} variant="outline" className="mr-2 text-xs bg-green-50 border-green-200 text-green-700">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2 text-red-700 dark:text-red-300">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Weaknesses</span>
                          </h4>
                          <div className="space-y-1">
                            {competitor.weaknesses.map((weakness, weaknessIndex) => (
                              <Badge key={weaknessIndex} variant="outline" className="mr-2 text-xs bg-red-50 border-red-200 text-red-700">
                                {weakness}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button variant="ghost" size="sm">
                          Deep Analysis
                        </Button>
                      </div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="swot" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {swotAnalysis.strengths.length === 0 && (
                  <p className="text-sm text-muted-foreground">No strengths identified</p>
                )}
                {swotAnalysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof strength === 'string' ? strength : strength.description || strength.title || JSON.stringify(strength)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Weaknesses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {swotAnalysis.weaknesses.length === 0 && (
                  <p className="text-sm text-muted-foreground">No weaknesses identified</p>
                )}
                {swotAnalysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof weakness === 'string' ? weakness : weakness.description || weakness.title || JSON.stringify(weakness)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {swotAnalysis.opportunities.length === 0 && (
                  <p className="text-sm text-muted-foreground">No opportunities identified</p>
                )}
                {swotAnalysis.opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof opportunity === 'string' ? opportunity : opportunity.description || opportunity.title || JSON.stringify(opportunity)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  <span>Threats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {swotAnalysis.threats.length === 0 && (
                  <p className="text-sm text-muted-foreground">No threats identified</p>
                )}
                {swotAnalysis.threats.map((threat, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof threat === 'string' ? threat : threat.description || threat.title || JSON.stringify(threat)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advantages" className="space-y-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-green-500" />
                <span>Competitive Advantages</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {competitiveAdvantages.length === 0 && (
                <p className="text-sm text-muted-foreground">No competitive advantages identified</p>
              )}
              {competitiveAdvantages.map((advantage: any, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{typeof advantage === 'string' ? advantage : advantage.description || advantage.title || advantage.name || JSON.stringify(advantage)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Competitive Threats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {competitiveThreats.length === 0 && (
                <p className="text-sm text-muted-foreground">No competitive threats identified</p>
              )}
              {competitiveThreats.map((threat: any, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{typeof threat === 'string' ? threat : threat.description || threat.title || threat.name || JSON.stringify(threat)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="differentiation" className="space-y-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-blue-500" />
                <span>Differentiation Factors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {differentiationFactors.length === 0 && (
                <p className="text-sm text-muted-foreground">No differentiation factors identified</p>
              )}
              {differentiationFactors.map((factor: any, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{typeof factor === 'string' ? factor : factor.description || factor.title || factor.name || JSON.stringify(factor)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="space-y-6">
            {strategicRecommendations.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No strategic recommendations available
                </CardContent>
              </Card>
            )}
            {strategicRecommendations.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{category.category}</CardTitle>
                    <Badge variant={category.priority === 'High' ? 'default' : 'secondary'}>
                      {category.priority} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.recommendations.map((recommendation, recIndex) => (
                    <div key={recIndex} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}