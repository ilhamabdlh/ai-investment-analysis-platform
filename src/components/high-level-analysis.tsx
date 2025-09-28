import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
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
  const companyData = {
    name: "TechFlow AI",
    industry: "Artificial Intelligence",
    stage: "Series A",
    founded: "2022",
    headquarters: "San Francisco, CA",
    employees: 47,
    website: "techflow.ai",
    overallScore: 87
  }

  const metrics = [
    {
      category: "Financial Health",
      score: 82,
      trend: "up",
      change: "+5%",
      details: [
        { label: "Revenue Growth", value: "340% YoY", status: "positive" },
        { label: "Burn Rate", value: "$280K/month", status: "neutral" },
        { label: "Runway", value: "18 months", status: "positive" },
        { label: "ARR", value: "$2.1M", status: "positive" }
      ]
    },
    {
      category: "Market Position",
      score: 89,
      trend: "up",
      change: "+12%",
      details: [
        { label: "Market Size", value: "$45B TAM", status: "positive" },
        { label: "Competition", value: "Moderate", status: "neutral" },
        { label: "Differentiation", value: "Strong", status: "positive" },
        { label: "Customer Base", value: "85 enterprises", status: "positive" }
      ]
    },
    {
      category: "Team & Execution",
      score: 91,
      trend: "up",
      change: "+3%",
      details: [
        { label: "Leadership", value: "Experienced", status: "positive" },
        { label: "Technical Team", value: "Strong", status: "positive" },
        { label: "Retention Rate", value: "94%", status: "positive" },
        { label: "Hiring Velocity", value: "12 hires/quarter", status: "positive" }
      ]
    },
    {
      category: "Technology & IP",
      score: 85,
      trend: "stable",
      change: "0%",
      details: [
        { label: "Patent Portfolio", value: "3 granted, 5 pending", status: "positive" },
        { label: "Technology Stack", value: "Modern", status: "positive" },
        { label: "Scalability", value: "High", status: "positive" },
        { label: "Security", value: "SOC2 compliant", status: "positive" }
      ]
    }
  ]

  const riskFactors = [
    {
      type: "High",
      title: "Competitive Pressure",
      description: "Major tech companies entering the space with significant resources",
      impact: "Revenue growth may slow if unable to maintain differentiation"
    },
    {
      type: "Medium",
      title: "Talent Acquisition",
      description: "Difficulty hiring specialized AI talent in competitive market",
      impact: "Could delay product development and market expansion"
    },
    {
      type: "Low",
      title: "Regulatory Changes",
      description: "Potential AI regulation could impact business model",
      impact: "May require compliance investments but unlikely to be prohibitive"
    }
  ]

  const opportunities = [
    {
      title: "Enterprise Expansion",
      description: "Strong demand from Fortune 500 companies for AI solutions",
      potential: "Could 3x revenue within 18 months"
    },
    {
      title: "International Markets",
      description: "European market showing high interest with minimal competition",
      potential: "Additional $5M ARR opportunity"
    },
    {
      title: "Product Extensions",
      description: "Natural expansion into adjacent AI verticals",
      potential: "40% increase in average deal size"
    }
  ]

  const aiInsights = [
    "Company shows exceptional execution with 340% YoY growth and strong unit economics",
    "Technical moat is strengthening with proprietary ML algorithms and patent portfolio",
    "Management team has proven track record with previous successful exits",
    "Customer concentration risk is low with no single customer >15% of revenue",
    "Market timing is optimal with increasing enterprise AI adoption"
  ]

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
                <CardTitle className="text-xl">{companyData.name}</CardTitle>
                <p className="text-muted-foreground">{companyData.industry} • {companyData.stage}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-1">{companyData.overallScore}</div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Investment Ready
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData.founded}</div>
              <div className="text-sm text-muted-foreground">Founded</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Building2 className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData.headquarters}</div>
              <div className="text-sm text-muted-foreground">HQ</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData.employees}</div>
              <div className="text-sm text-muted-foreground">Employees</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-medium">{companyData.website}</div>
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
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.category}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold">{metric.score}</div>
                      <div className={`flex items-center space-x-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {metric.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
                        {metric.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
                        {metric.trend === 'stable' && <Activity className="h-4 w-4" />}
                        <span className="text-sm">{metric.change}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {metric.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{detail.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{detail.value}</span>
                        {detail.status === 'positive' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {detail.status === 'negative' && <XCircle className="h-4 w-4 text-red-500" />}
                        {detail.status === 'neutral' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {riskFactors.map((risk, index) => (
            <Card key={index} className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    risk.type === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    risk.type === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {risk.type} Risk
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{risk.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{risk.description}</p>
                    <p className="text-sm"><strong>Potential Impact:</strong> {risk.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <Card key={index} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{opportunity.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{opportunity.description}</p>
                    <p className="text-sm text-green-600 font-medium">
                      <strong>Potential:</strong> {opportunity.potential}
                    </p>
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
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{insight}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    Analysis confidence: <strong>94%</strong>
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