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
  const overallSentiment = {
    score: 74,
    sentiment: "Positive",
    trend: "up",
    change: "+8%",
    volume: 1247,
    sources: 156
  }

  const sentimentBreakdown = [
    { category: "News Media", score: 78, sentiment: "Positive", volume: 45, change: "+12%" },
    { category: "Social Media", score: 71, sentiment: "Neutral-Positive", volume: 892, change: "+5%" },
    { category: "Industry Reports", score: 85, sentiment: "Very Positive", volume: 23, change: "+15%" },
    { category: "Customer Reviews", score: 69, sentiment: "Neutral-Positive", volume: 234, change: "-3%" },
    { category: "Forum Discussions", score: 67, sentiment: "Neutral", volume: 53, change: "+2%" }
  ]

  const keyTopics = [
    { topic: "Innovation", sentiment: 88, volume: 234, trend: "up" },
    { topic: "Leadership", sentiment: 76, volume: 156, trend: "up" },
    { topic: "Product Quality", sentiment: 72, volume: 198, trend: "stable" },
    { topic: "Company Culture", sentiment: 81, volume: 89, trend: "up" },
    { topic: "Market Position", sentiment: 69, volume: 167, trend: "down" },
    { topic: "Customer Service", sentiment: 74, volume: 145, trend: "up" }
  ]

  const recentMentions = [
    {
      source: "TechCrunch",
      title: "TechFlow AI Raises $15M Series A to Revolutionize Enterprise Machine Learning",
      sentiment: "Positive",
      score: 92,
      date: "2 days ago",
      excerpt: "The company's breakthrough in automated ML model optimization has caught the attention of major enterprise clients...",
      reach: "2.3M",
      engagement: "High"
    },
    {
      source: "LinkedIn",
      title: "CEO Sarah Chen discusses AI ethics and responsible development",
      sentiment: "Very Positive", 
      score: 89,
      date: "5 days ago",
      excerpt: "Impressive leadership stance on ethical AI development. The industry needs more companies like TechFlow...",
      reach: "156K",
      engagement: "High"
    },
    {
      source: "Reddit (r/MachineLearning)",
      title: "Anyone tried TechFlow's new AutoML platform?",
      sentiment: "Neutral-Positive",
      score: 68,
      date: "1 week ago",
      excerpt: "Mixed reviews but generally positive. Some users report significant improvements in model performance...",
      reach: "45K",
      engagement: "Medium"
    },
    {
      source: "Industry Report",
      title: "Emerging Leaders in Enterprise AI - Q4 2024",
      sentiment: "Positive",
      score: 84,
      date: "1 week ago",
      excerpt: "TechFlow AI positioned as a 'Company to Watch' with strong technology differentiation and growing market share...",
      reach: "50K",
      engagement: "Low"
    }
  ]

  const brandMetrics = [
    { metric: "Brand Awareness", score: 34, benchmark: 45, trend: "up" },
    { metric: "Brand Trust", score: 78, benchmark: 65, trend: "up" },
    { metric: "Innovation Perception", score: 87, benchmark: 70, trend: "up" },
    { metric: "Leadership Credibility", score: 82, benchmark: 75, trend: "up" },
    { metric: "Market Position", score: 56, benchmark: 60, trend: "down" },
    { metric: "Customer Satisfaction", score: 74, benchmark: 72, trend: "stable" }
  ]

  const competitorComparison = [
    { company: "TechFlow AI", score: 74, change: "+8%" },
    { company: "DataMind Corp", score: 68, change: "+3%" },
    { company: "AI Innovations", score: 82, change: "-2%" },
    { company: "Neural Systems", score: 71, change: "+12%" },
    { company: "Industry Average", score: 65, change: "+5%" }
  ]

  const riskAlerts = [
    {
      type: "Medium",
      title: "Negative Customer Review Trend",
      description: "3% increase in negative reviews mentioning customer support response times",
      impact: "Could affect customer acquisition if not addressed",
      recommendation: "Review customer support processes and response times"
    },
    {
      type: "Low",
      title: "Competitor Narrative Shift",
      description: "DataMind Corp increasing marketing spend on innovation messaging",
      impact: "Potential erosion of innovation leadership perception",
      recommendation: "Reinforce thought leadership through content marketing"
    }
  ]

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
                    {overallSentiment.score}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {overallSentiment.sentiment}
                  </Badge>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    {overallSentiment.change} vs last month
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-700 dark:text-green-300 mb-1">
                {overallSentiment.volume} mentions
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                from {overallSentiment.sources} sources
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
                {sentimentBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={item.score >= 80 ? "default" : item.score >= 60 ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {item.sentiment}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.volume}</span>
                      </div>
                    </div>
                    <Progress value={item.score} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Score: {item.score}</span>
                      <span>{item.change} vs last month</span>
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
                {competitorComparison.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        company.company === 'TechFlow AI' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        company.company === 'TechFlow AI' ? 'font-medium' : ''
                      }`}>
                        {company.company}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-lg font-semibold">{company.score}</div>
                      <div className={`text-xs ${
                        company.change.startsWith('+') ? 'text-green-600' : 
                        company.change.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {company.change}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          {recentMentions.map((mention, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{mention.title}</h3>
                      <Badge 
                        variant={mention.score >= 80 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {mention.sentiment}
                      </Badge>
                      <div className="text-sm font-medium text-blue-600">
                        {mention.score}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{mention.source}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mention.date}</span>
                      </div>
                      <span>Reach: {mention.reach}</span>
                      <span>Engagement: {mention.engagement}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {mention.excerpt}
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
            {keyTopics.map((topic, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{topic.topic}</h3>
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
                    <Progress value={topic.sentiment} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sentiment: {topic.sentiment}</span>
                      <span className="text-muted-foreground">{topic.volume} mentions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brand" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{metric.metric}</h3>
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
                      <span className="font-semibold">{metric.score}</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Industry Benchmark: {metric.benchmark}</span>
                      <span className={metric.score >= metric.benchmark ? 'text-green-600' : 'text-red-600'}>
                        {metric.score >= metric.benchmark ? '+' : ''}{metric.score - metric.benchmark} vs benchmark
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {riskAlerts.map((risk, index) => (
            <Card key={index} className={`border-l-4 ${
              risk.type === 'High' ? 'border-l-red-500' : 
              risk.type === 'Medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className={`h-6 w-6 flex-shrink-0 mt-1 ${
                    risk.type === 'High' ? 'text-red-500' : 
                    risk.type === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{risk.title}</h3>
                      <Badge variant={
                        risk.type === 'High' ? 'destructive' : 
                        risk.type === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {risk.type} Priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{risk.description}</p>
                    <p className="text-sm mb-3"><strong>Impact:</strong> {risk.impact}</p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm"><strong>Recommendation:</strong> {risk.recommendation}</p>
                    </div>
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