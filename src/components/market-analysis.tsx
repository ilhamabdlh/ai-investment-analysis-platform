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
  const marketData = {
    estimatedRevenue: market?.metrics?.find((m: any) => m.name?.toLowerCase().includes('revenue'))?.value || '-',
    revenueGrowth: `${market?.metrics?.find((m: any) => m.name?.toLowerCase().includes('growth'))?.change_percentage ?? ''}%`,
    marketShare: market?.metrics?.find((m: any) => m.name?.toLowerCase().includes('market share'))?.value || '-',
    marketShareTrend: market?.metrics?.find((m: any) => m.name?.toLowerCase().includes('market share'))?.trend || 'stable',
    totalAddressableMarket: market?.metrics?.find((m: any) => m.name?.toLowerCase().includes('tam'))?.value || '-',
    servicableMarket: market?.metrics?.find((m: any) => m.name?.toLowerCase().includes('sam'))?.value || '-',
    confidenceScore: Math.round(((market?.confidence_score ?? 0) * 100)),
  }

  const revenueBreakdown = (market?.metrics || []).filter((m: any) => m.category === 'financial')
  const marketMetrics = (market?.metrics || []).filter((m: any) => m.category === 'market')
  const competitorRevenue = (analysisData?.competitive_analyses || []).flatMap((a: any) => a.metrics || [])
  const salesData = (market?.metrics || []).filter((m: any) => (m.name || '').toLowerCase().includes('marketplace'))
  const marketInsights = market?.key_findings || []
  const industryTrends = market?.opportunities || []
  const marketForces = market?.risk_factors || []

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-700/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Estimated Revenue</span>
            </div>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-1">
              {marketData.estimatedRevenue}
            </div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>{marketData.revenueGrowth || ''} YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200/50 dark:border-blue-700/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Market Share</span>
            </div>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">
              {marketData.marketShare}
            </div>
            <div className="flex items-center space-x-1 text-sm text-blue-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>Growing rapidly</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50 dark:border-purple-700/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">TAM</span>
            </div>
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-1">
              {marketData.totalAddressableMarket}
            </div>
            <div className="text-sm text-purple-600">
              {marketData.servicableMarket} SAM
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
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="market">Market Dynamics</TabsTrigger>
          <TabsTrigger value="competitors">Competitive Position</TabsTrigger>
          <TabsTrigger value="sales">Sales Channels</TabsTrigger>
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBreakdown.map((item: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{item.value}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.change_percentage != null ? `${item.change_percentage}%` : ''}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.score ?? 0} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.score ?? 0}% of total</span>
                      {item.change_percentage != null && <span>{item.change_percentage}% vs last period</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Market Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketMetrics.map((metric: any, index: number) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{metric.name}</h4>
                      <div className="flex items-center space-x-1 text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {metric.category}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Change: {metric.change_percentage != null ? `${metric.change_percentage}%` : '—'}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketForces.map((force, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{force.force}</CardTitle>
                    <Badge 
                      variant={force.intensity === 'High' ? 'destructive' : force.intensity === 'Medium' ? 'secondary' : 'outline'}
                    >
                      {force.intensity}
                    </Badge>
                  </div>
                  <Progress value={force.score} className="h-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{force.description}</p>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Key Factors:</h4>
                    {force.factors.map((factor, factorIndex) => (
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

        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Revenue Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {competitorRevenue.map((competitor: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-medium">{index + 1}</div>
                    <div>
                      <div className={`font-medium`}>
                        {competitor.name || competitor.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Value: {competitor.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{competitor.score ?? 0}</div>
                    <div className={`text-sm ${Number(competitor.change_percentage) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {competitor.change_percentage != null ? `${competitor.change_percentage}%` : ''} change
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salesData.map((platform: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{platform.name || platform.platform}</h3>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{platform.installs || '-'}</div>
                      <div className="text-xs text-muted-foreground">Installs</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{platform.revenue || platform.value || '-'}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{platform.rating ?? '-'}</span>
                      {platform.reviews && <span className="text-sm text-muted-foreground">({platform.reviews} reviews)</span>}
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
                    <h3 className="font-semibold">{trend.trend || trend.title || 'Trend'}</h3>
                    <Badge 
                      variant={trend.impact === 'High' ? 'default' : 'secondary'}
                    >
                      {trend.impact} Impact
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Relevance</span>
                      <span className="font-medium">{trend.relevance ?? trend.score ?? 0}%</span>
                    </div>
                    <Progress value={trend.relevance ?? trend.score ?? 0} className="h-2" />
                    <p className="text-sm text-muted-foreground">{trend.description || String(trend)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span>AI Market Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketInsights.map((insight: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{typeof insight === 'string' ? insight : (insight?.text || JSON.stringify(insight))}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}