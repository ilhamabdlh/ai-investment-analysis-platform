import React, { useEffect, useMemo, useState } from 'react'
import { useCompany } from '../context/company-context'
import { apiService } from '../services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Target,
  Globe,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  ShoppingCart,
  Star,
  ExternalLink
} from 'lucide-react'

export function MarketAnalysis() {
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

  const market = useMemo(() => {
    return analysisData?.market_analyses?.[0] || null
  }, [analysisData])

  const companyName = analysisData?.company?.name || '—'
  
  // Structured data from new models
  const revenueInformation = useMemo(() => {
    const data = market?.revenue_information
    return Array.isArray(data) ? data : []
  }, [market])

  const marketData = {
    marketSize: market?.market_size || '-',
    marketGrowthRate: market?.market_growth_rate ? `${market.market_growth_rate}%` : '-',
    confidenceScore: Math.round(((market?.confidence_score ?? 0) * 100)),
  }

  // Legacy JSON field support
  const salesData = useMemo(() => {
    const data = market?.sales_channels
    return Array.isArray(data) ? data : []
  }, [market])
  const marketInsights = (market?.market_trends || [])
  const industryTrends = useMemo(() => {
    const data = market?.industry_trends_items
    return Array.isArray(data) ? data : []
  }, [market])
  const marketForces = useMemo(() => {
    const data = market?.market_forces
    return Array.isArray(data) ? data : []
  }, [market])
  

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <TrendingUp className="h-6 w-6" />
          <span>Market Analysis</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          AI-powered market share, revenue analysis, and competitive positioning
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50 dark:border-purple-700/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Market Size</span>
            </div>
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-1">
              {marketData.marketSize}
            </div>
            <div className="text-sm text-purple-600">
              Total addressable market
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-700/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Growth Rate</span>
            </div>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-1">
              {marketData.marketGrowthRate}
            </div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>Market growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200/50 dark:border-orange-700/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">AI Confidence</span>
            </div>
            <div className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-1">
              {marketData.confidenceScore}%
            </div>
            <div className="text-sm text-orange-600">
              High accuracy
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="market">Market Dynamics</TabsTrigger>
          <TabsTrigger value="sales">Sales Channels</TabsTrigger>
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          {/* Revenue Information - Same style as Recent Mentions */}
          {revenueInformation.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No revenue information available
              </CardContent>
            </Card>
          )}
          {revenueInformation.map((item: any, index: number) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge 
                        variant={item.reliability === 'verified' ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.reliability.charAt(0).toUpperCase() + item.reliability.slice(1)}
                      </Badge>
                      <div className="text-sm font-medium text-green-600">
                        {item.revenue_figure}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{item.source}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date_display || item.date}</span>
                      </div>
                      {item.growth_rate && <span className="text-green-600">{item.growth_rate}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {item.url && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(item.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Source
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketForces.map((force: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{force.force_name}</CardTitle>
                    <Badge 
                      variant={force.intensity === 'high' ? 'destructive' : force.intensity === 'medium' ? 'secondary' : 'outline'}
                    >
                      {typeof force.intensity === 'string' ? force.intensity.charAt(0).toUpperCase() + force.intensity.slice(1) : force.intensity}
                    </Badge>
                  </div>
                  <Progress value={force.score ?? 0} className="h-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{force.description}</p>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Key Factors:</h4>
                    {(force.factors || []).map((factor: any, factorIndex: number) => (
                      <div key={factorIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{factor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salesData.map((platform: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{platform.platform_name}</h3>
                    {platform.url && (
                      <Button variant="outline" size="sm" onClick={() => window.open(platform.url, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{platform.installs_count || '-'}</div>
                      <div className="text-xs text-muted-foreground">{platform.count_unit || 'Units'}</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{platform.revenue_amount || '-'}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{platform.rating ?? '-'}</span>
                      {platform.reviews_count && <span className="text-sm text-muted-foreground">({platform.reviews_count} reviews)</span>}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {platform.change_percentage != null ? `${platform.change_percentage}%` : ''}
                    </Badge>
                  </div>
                  
                  <Progress value={(platform.rating ?? 0) * 20} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryTrends.map((trend: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{trend.title}</h3>
                    <Badge 
                      variant={trend.impact === 'high' ? 'default' : 'secondary'}
                    >
                      {typeof trend.impact === 'string' ? trend.impact.charAt(0).toUpperCase() + trend.impact.slice(1) : trend.impact} Impact
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Relevance</span>
                      <span className="font-medium">{trend.relevance ?? 0}%</span>
                    </div>
                    <Progress value={trend.relevance ?? 0} className="h-2" />
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          
        </TabsContent>
      </Tabs>
    </div>
  )
}