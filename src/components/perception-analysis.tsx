import React, { useEffect, useMemo, useState } from 'react'
import { useCompany } from '../context/company-context'
import { apiService } from '../services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Eye, 
  TrendingUp, 
  MessageSquare, 
  AlertTriangle,
  Sparkles,
  Calendar,
  ExternalLink,
  BarChart3
} from 'lucide-react'

export function PerceptionAnalysis() {
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

  const perception = useMemo(() => {
    return analysisData?.perception_analyses?.[0] || null
  }, [analysisData])

  // Get structured data from API
  const sentimentSources = useMemo(() => {
    const data = perception?.sentiment_sources
    return Array.isArray(data) ? data : []
  }, [perception])

  const competitorSentiments = useMemo(() => {
    const data = perception?.competitor_sentiments
    return Array.isArray(data) ? data : []
  }, [perception])

  const recentMentions = useMemo(() => {
    const data = perception?.recent_mentions
    return Array.isArray(data) ? data : []
  }, [perception])

  const keyTopics = useMemo(() => {
    const data = perception?.key_topics
    return Array.isArray(data) ? data : []
  }, [perception])

  const brandMetrics = useMemo(() => {
    const data = perception?.brand_metrics
    return Array.isArray(data) ? data : []
  }, [perception])

  const riskAlerts = useMemo(() => {
    const data = perception?.risk_alerts
    return Array.isArray(data) ? data : []
  }, [perception])

  // Legacy support for old JSON fields
  const brandPerception = useMemo(() => {
    const data = perception?.brand_perception
    return Array.isArray(data) ? data : []
  }, [perception])

  const socialSentiment = useMemo(() => {
    const data = perception?.social_sentiment
    return Array.isArray(data) ? data : []
  }, [perception])

  const riskFactors = useMemo(() => {
    const data = perception?.risk_factors
    return Array.isArray(data) ? data : []
  }, [perception])

  // Calculate total mentions from sentiment sources
  const totalMentions = useMemo(() => {
    return sentimentSources.reduce((sum: number, item: any) => sum + (item.mentions_count || 0), 0)
  }, [sentimentSources])

  // Calculate number of sources
  const totalSources = useMemo(() => {
    return sentimentSources.length
  }, [sentimentSources])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-muted-foreground">Loading perception analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Error Loading Analysis</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!company?.id) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No Company Selected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please select a company to view perception analysis
            </p>
            <Button onClick={() => window.dispatchEvent(new CustomEvent('open-company-selector'))}>
              Select Company
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Eye className="h-6 w-6" />
          <span>Perception Analysis</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          AI-powered analysis of public sentiment and brand perception
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
            {(company?.name || analysisData?.company?.name || 'C').charAt(0)}
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Analyzing company</div>
            <div className="font-medium">{company?.name || analysisData?.company?.name || '—'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">In focus</Badge>
          <Button variant="ghost" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('open-company-selector'))}>Change</Button>
        </div>
      </div>

      {/* Overall Sentiment Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-green-200/50 dark:border-green-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Overall Sentiment Score
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="text-3xl font-bold text-green-800 dark:text-green-200">
                    {perception?.sentiment_score ?? perception?.overall_score ?? 0}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {(perception?.sentiment_score ?? 0) >= 70 ? 'Positive' : (perception?.sentiment_score ?? 0) >= 50 ? 'Neutral' : 'Negative'}
                  </Badge>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    {perception?.confidence_score ? `${Math.round(perception.confidence_score * 100)}% confidence` : ''}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-700 dark:text-green-300 mb-1">
                {totalMentions} mentions
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                from {totalSources} sources
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="sentiment" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="mentions">Recent Mentions</TabsTrigger>
          <TabsTrigger value="topics">Key Topics</TabsTrigger>
          <TabsTrigger value="brand">Brand Metrics</TabsTrigger>
          <TabsTrigger value="risks">Risk Alerts</TabsTrigger>
        </TabsList>

        {/* Sentiment Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentiment by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment by Source</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sentimentSources.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">
                    No sentiment source data available
                  </div>
                )}
                {sentimentSources.map((item: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.source_name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={(item.positive_percentage ?? 0) >= 80 ? "default" : (item.positive_percentage ?? 0) >= 60 ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {item.sentiment_label || `${item.positive_percentage}%`}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.mentions_count} mentions</span>
                      </div>
                    </div>
                    <Progress value={item.positive_percentage ?? 0} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Positive: {item.positive_percentage ?? 0}%</span>
                      {item.change_vs_previous && <span>{item.change_vs_previous}</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Competitor Sentiment Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Competitor Sentiment Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {competitorSentiments.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">
                    No competitor sentiment data available
                  </div>
                )}
                {competitorSentiments.map((comp: any, index: number) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      comp.is_current_company 
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800' 
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${comp.is_current_company ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                      <span className={`text-sm ${comp.is_current_company ? 'font-medium' : ''}`}>
                        {comp.company_name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-lg font-semibold">{comp.positive_percentage ?? 0}%</div>
                      <div className="text-xs text-muted-foreground">
                        {comp.mentions_count} mentions
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Mentions Tab */}
        <TabsContent value="mentions" className="space-y-4">
          {recentMentions.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No recent mentions available
              </CardContent>
            </Card>
          )}
          {recentMentions.map((mention: any, index: number) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{mention.title}</h3>
                      <Badge 
                        variant={(mention.sentiment_score ?? 0) >= 80 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {mention.sentiment_label}
                      </Badge>
                      <div className="text-sm font-medium text-blue-600">
                        {mention.sentiment_score}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{mention.source}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mention.date_display || mention.date}</span>
                      </div>
                      {mention.reach && <span>Reach: {mention.reach}</span>}
                      {mention.engagement_level && <span>Engagement: {mention.engagement_level.charAt(0).toUpperCase() + mention.engagement_level.slice(1).replace('_', ' ')}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {mention.excerpt}
                    </p>
                    <div className="flex items-center space-x-2">
                      {mention.url && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(mention.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Source
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Key Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyTopics.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="p-6 text-center text-muted-foreground">
                  No key topics available
                </CardContent>
              </Card>
            )}
            {keyTopics.map((topic: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{topic.topic_name}</h3>
                    <div className={`flex items-center space-x-1 ${
                      topic.trend === 'up' ? 'text-green-600' : 
                      topic.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {topic.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                      {topic.trend === 'down' && <TrendingUp className="h-4 w-4 rotate-180" />}
                      {topic.trend === 'stable' && <div className="w-4 h-0.5 bg-current"></div>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={topic.sentiment_score ?? 0} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sentiment: {topic.sentiment_score}%</span>
                      {topic.mentions_count && <span className="text-muted-foreground">{topic.mentions_count} mentions</span>}
                    </div>
                  </div>
                  {topic.description && (
                    <p className="text-xs text-muted-foreground mt-2">{topic.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Brand Metrics Tab */}
        <TabsContent value="brand" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandMetrics.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="p-6 text-center text-muted-foreground">
                  No brand metrics available
                </CardContent>
              </Card>
            )}
            {brandMetrics.map((metric: any, index: number) => {
              const diff = metric.benchmark_difference ?? 0
              const isPositive = metric.is_above_benchmark ?? (diff > 0)
              
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">{metric.metric_name}</h3>
                      <div className={`flex items-center space-x-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {metric.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                        {metric.trend === 'down' && <TrendingUp className="h-4 w-4 rotate-180" />}
                        {metric.trend === 'stable' && <BarChart3 className="h-4 w-4" />}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Score</span>
                        <span className="font-semibold text-2xl">{metric.current_score ?? 0}</span>
                      </div>
                      <Progress value={metric.current_score ?? 0} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Industry Benchmark: {metric.industry_benchmark ?? 0}</span>
                        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                          {isPositive ? '+' : ''}{diff} vs benchmark
                        </span>
                      </div>
                    </div>
                    {metric.description && (
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                        {metric.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Risk Alerts Tab */}
        <TabsContent value="risks" className="space-y-4">
          {riskAlerts.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No risk alerts identified
              </CardContent>
            </Card>
          )}
          {riskAlerts.map((risk: any, index: number) => {
            const priority = risk.priority || 'medium'
            const borderColorClass = priority === 'critical' || priority === 'high' ? 'border-l-red-500' : 
                               priority === 'low' ? 'border-l-blue-500' : 'border-l-yellow-500'
            const iconColorClass = priority === 'critical' || priority === 'high' ? 'text-red-500' : 
                             priority === 'low' ? 'text-blue-500' : 'text-yellow-500'
            
            return (
              <Card key={index} className={`border-l-4 ${borderColorClass}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className={`h-6 w-6 flex-shrink-0 mt-1 ${iconColorClass}`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{risk.title}</h3>
                        <Badge variant={priority === 'critical' || priority === 'high' ? 'destructive' : 'secondary'}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {risk.description}
                      </p>
                      {risk.impact && (
                        <div className="mb-2 p-3 bg-muted/50 rounded-md">
                          <span className="text-sm font-medium">Impact: </span>
                          <span className="text-sm text-muted-foreground">{risk.impact}</span>
                        </div>
                      )}
                      {risk.recommendation && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                          <span className="text-sm font-medium">Recommendation: </span>
                          <span className="text-sm text-muted-foreground">{risk.recommendation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}