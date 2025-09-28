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
  const marketData = {
    estimatedRevenue: "$2.8M",
    revenueGrowth: "+240%",
    marketShare: "0.12%",
    marketShareTrend: "up",
    totalAddressableMarket: "$45B",
    servicableMarket: "$12B",
    confidenceScore: 87
  }

  const revenueBreakdown = [
    { source: "Enterprise Licenses", amount: "$1.8M", percentage: 64, growth: "+280%" },
    { source: "Professional Services", amount: "$640K", percentage: 23, growth: "+190%" },
    { source: "API Usage", amount: "$360K", percentage: 13, growth: "+420%" }
  ]

  const marketMetrics = [
    {
      category: "Market Size",
      tam: "$45B",
      sam: "$12B",
      som: "$1.2B",
      growth: "18% CAGR",
      trend: "up"
    },
    {
      category: "Customer Segments",
      enterprise: "68%",
      midMarket: "24%",
      smb: "8%",
      growth: "Expanding enterprise",
      trend: "up"
    },
    {
      category: "Geographic Distribution",
      northAmerica: "72%",
      europe: "19%",
      asiaPacific: "9%",
      growth: "EU expansion",
      trend: "up"
    }
  ]

  const competitorRevenue = [
    { company: "AI Innovations", revenue: "$45M", marketShare: "1.8%", growth: "+85%" },
    { company: "DataMind Corp", revenue: "$32M", marketShare: "1.3%", growth: "+62%" },
    { company: "Neural Systems", revenue: "$28M", marketShare: "1.1%", growth: "+95%" },
    { company: "TechFlow AI", revenue: "$2.8M", marketShare: "0.12%", growth: "+240%" },
    { company: "Quantum Analytics", revenue: "$18M", marketShare: "0.7%", growth: "+45%" }
  ]

  const salesData = [
    {
      platform: "Salesforce AppExchange",
      installs: "1,247",
      rating: 4.6,
      reviews: 89,
      revenue: "$340K",
      growth: "+156%"
    },
    {
      platform: "AWS Marketplace",
      installs: "856",
      rating: 4.4,
      reviews: 67,
      revenue: "$280K",
      growth: "+210%"
    },
    {
      platform: "Microsoft AppSource",
      installs: "634",
      rating: 4.5,
      reviews: 45,
      revenue: "$180K",
      growth: "+189%"
    },
    {
      platform: "Google Cloud Marketplace",
      installs: "423",
      rating: 4.3,
      reviews: 32,
      revenue: "$120K",
      growth: "+234%"
    }
  ]

  const marketInsights = [
    "Enterprise AI market experiencing unprecedented growth with 18% CAGR",
    "TechFlow positioned in fastest-growing segment (AutoML) with 31% annual growth",
    "Customer acquisition cost has decreased 40% while lifetime value increased 180%",
    "Recurring revenue now represents 85% of total revenue, indicating strong product-market fit",
    "Geographic expansion into Europe showing 3x faster adoption than projected"
  ]

  const industryTrends = [
    {
      trend: "Automated Machine Learning",
      impact: "High",
      relevance: 95,
      description: "Growing demand for no-code/low-code ML solutions"
    },
    {
      trend: "AI Ethics & Governance",
      impact: "Medium",
      relevance: 78,
      description: "Increased focus on responsible AI development"
    },
    {
      trend: "Edge AI Computing",
      impact: "Medium",
      relevance: 65,
      description: "Processing AI workloads closer to data sources"
    },
    {
      trend: "MLOps Standardization",
      impact: "High", 
      relevance: 89,
      description: "Operational best practices for ML lifecycle management"
    }
  ]

  const marketForces = [
    {
      force: "Competitive Rivalry",
      intensity: "Medium",
      score: 65,
      description: "Moderate competition with few direct competitors",
      factors: ["Market fragmentation", "High switching costs", "Product differentiation"]
    },
    {
      force: "Supplier Power",
      intensity: "Low",
      score: 35,
      description: "Multiple cloud providers and tech stack options",
      factors: ["Multiple vendors", "Low switching costs", "Standardized infrastructure"]
    },
    {
      force: "Buyer Power",
      intensity: "Medium",
      score: 55,
      description: "Enterprise buyers have negotiation leverage",
      factors: ["Large deal sizes", "Procurement processes", "ROI requirements"]
    },
    {
      force: "Threat of Substitutes",
      intensity: "Low",
      score: 40,
      description: "Limited alternatives to automated ML platforms",
      factors: ["In-house development", "Consulting services", "Manual processes"]
    },
    {
      force: "Barriers to Entry",
      intensity: "High",
      score: 80,
      description: "Significant technical and capital requirements",
      factors: ["Technical expertise", "AI talent", "Research investment"]
    }
  ]

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
              <span>{marketData.revenueGrowth} YoY</span>
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
                {revenueBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{item.amount}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.growth}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.percentage}% of total</span>
                      <span>{item.growth} YoY growth</span>
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
                {marketMetrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{metric.category}</h4>
                      <div className="flex items-center space-x-1 text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{metric.tam || metric.enterprise || metric.northAmerica}</div>
                        <div className="text-xs text-muted-foreground">
                          {metric.tam ? 'TAM' : metric.enterprise ? 'Enterprise' : 'North America'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{metric.sam || metric.midMarket || metric.europe}</div>
                        <div className="text-xs text-muted-foreground">
                          {metric.sam ? 'SAM' : metric.midMarket ? 'Mid-Market' : 'Europe'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{metric.som || metric.smb || metric.asiaPacific}</div>
                        <div className="text-xs text-muted-foreground">
                          {metric.som ? 'SOM' : metric.smb ? 'SMB' : 'Asia Pacific'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Growth: {metric.growth}
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
              {competitorRevenue.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-medium">{index + 1}</div>
                    <div>
                      <div className={`font-medium ${competitor.company === 'TechFlow AI' ? 'text-blue-600' : ''}`}>
                        {competitor.company}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Market Share: {competitor.marketShare}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{competitor.revenue}</div>
                    <div className={`text-sm ${competitor.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {competitor.growth} growth
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salesData.map((platform, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{platform.platform}</h3>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{platform.installs}</div>
                      <div className="text-xs text-muted-foreground">Installs</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{platform.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{platform.rating}</span>
                      <span className="text-sm text-muted-foreground">({platform.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {platform.growth}
                    </Badge>
                  </div>
                  
                  <Progress value={platform.rating * 20} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryTrends.map((trend, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{trend.trend}</h3>
                    <Badge 
                      variant={trend.impact === 'High' ? 'default' : 'secondary'}
                    >
                      {trend.impact} Impact
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Relevance</span>
                      <span className="font-medium">{trend.relevance}%</span>
                    </div>
                    <Progress value={trend.relevance} className="h-2" />
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
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
              {marketInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}