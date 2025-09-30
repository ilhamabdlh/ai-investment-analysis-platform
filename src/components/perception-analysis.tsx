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
  Star,
  ThumbsUp,
  ThumbsDown,
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

      {/* Overall Sentiment */}
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
                    {perception?.overall_score ?? 0}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {perception?.summary ? 'Positive' : '—'}
                  </Badge>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    {Math.round(((perception?.confidence_score ?? 0) * 100))}% confidence
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-700 dark:text-green-300 mb-1">
                Score components
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                via metrics
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

        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentiment by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment by Source</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(perception?.metrics || []).map((item: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={(item.score ?? 0) >= 80 ? "default" : (item.score ?? 0) >= 60 ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {item.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.value}</span>
                      </div>
                    </div>
                    <Progress value={item.score ?? 0} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Score: {item.score ?? 0}</span>
                      {item.change_percentage != null && <span>{item.change_percentage}% vs last period</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Competitor Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Competitor Sentiment Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(analysisData?.perception_analyses || []).concat(analysisData?.competitive_analyses || []).slice(0,5).map((comp: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm`}>
                        {comp.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-lg font-semibold">{comp.overall_score ?? 0}</div>
                      <div className={`text-xs text-muted-foreground`}>
                        {Math.round(((comp.confidence_score ?? 0) * 100))}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          {(perception?.key_findings || []).map((mention: any, index: number) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{mention.title || 'Finding'}</h3>
                      <Badge 
                        variant={(mention.score ?? 0) >= 80 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {(mention.sentiment || 'Insight')}
                      </Badge>
                      <div className="text-sm font-medium text-blue-600">
                        {mention.score ?? ''}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{mention.source || '—'}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mention.date || ''}</span>
                      </div>
                      {mention.reach && <span>Reach: {mention.reach}</span>}
                      {mention.engagement && <span>Engagement: {mention.engagement}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {mention.excerpt || mention.summary || (typeof mention === 'string' ? mention : '')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Source
                      </Button>
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

        <TabsContent value="topics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(perception?.opportunities || []).map((topic: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{topic.topic || topic.title || 'Topic'}</h3>
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
                    <Progress value={topic.sentiment ?? topic.score ?? 0} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Score: {topic.sentiment ?? topic.score ?? 0}</span>
                      {topic.volume && <span className="text-muted-foreground">{topic.volume} mentions</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brand" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(perception?.metrics || []).slice(0,6).map((metric: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{metric.name}</h3>
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
                      <span className="font-semibold">{metric.score ?? 0}</span>
                    </div>
                    <Progress value={metric.score ?? 0} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Value: {metric.value}</span>
                      {metric.change_percentage != null && (
                        <span className={metric.change_percentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {metric.change_percentage}% vs last period
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {(perception?.risk_factors || []).map((risk: any, index: number) => (
            <Card key={index} className={`border-l-4 ${
              'border-l-yellow-500'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className={`h-6 w-6 flex-shrink-0 mt-1 text-yellow-500`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{risk.title || risk.name || 'Risk'}</h3>
                      <Badge variant={'secondary'}>
                        Risk
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{risk.description || String(risk)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}