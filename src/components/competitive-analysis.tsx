import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  GitCompare, 
  TrendingUp, 
  Target,
  Zap,
  Shield,
  Users,
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
  const competitors = [
    {
      name: "AI Innovations",
      position: "Market Leader",
      marketShare: "18.5%",
      revenue: "$45M",
      funding: "$120M Series C",
      employees: 340,
      founded: "2019",
      headquarters: "San Francisco, CA",
      strengths: ["Brand Recognition", "Enterprise Sales", "Product Maturity"],
      weaknesses: ["High Pricing", "Complex Implementation", "Slow Innovation"],
      score: 78,
      trend: "stable",
      logo: "🚀"
    },
    {
      name: "DataMind Corp",
      position: "Strong Challenger",
      marketShare: "12.3%",
      revenue: "$32M",
      funding: "$85M Series B",
      employees: 280,
      founded: "2020",
      headquarters: "Austin, TX",
      strengths: ["Technical Innovation", "Customer Support", "Competitive Pricing"],
      weaknesses: ["Limited Brand Awareness", "Smaller Sales Team", "Geographic Concentration"],
      score: 74,
      trend: "up",
      logo: "🧠"
    },
    {
      name: "TechFlow AI",
      position: "Rising Star",
      marketShare: "3.1%",
      revenue: "$2.8M",
      funding: "$15M Series A",
      employees: 47,
      founded: "2022",
      headquarters: "San Francisco, CA",
      strengths: ["Product Innovation", "Team Quality", "Growth Rate"],
      weaknesses: ["Market Presence", "Customer Base Size", "Sales Infrastructure"],
      score: 87,
      trend: "up",
      logo: "⚡"
    },
    {
      name: "Neural Systems",
      position: "Niche Player",
      marketShare: "8.7%",
      revenue: "$28M",
      funding: "$60M Series B",
      employees: 220,
      founded: "2018",
      headquarters: "Boston, MA",
      strengths: ["Specialized Solutions", "Research Depth", "Academic Partnerships"],
      weaknesses: ["Limited Market Appeal", "Slow Growth", "High Technical Complexity"],
      score: 65,
      trend: "down",
      logo: "🔬"
    },
    {
      name: "Quantum Analytics",
      position: "Fast Follower",
      marketShare: "6.2%",
      revenue: "$18M",
      funding: "$40M Series A",
      employees: 180,
      founded: "2021",
      headquarters: "Seattle, WA",
      strengths: ["Aggressive Pricing", "Quick Implementation", "Customer Acquisition"],
      weaknesses: ["Product Depth", "Technical Differentiation", "Investor Confidence"],
      score: 62,
      trend: "stable",
      logo: "📊"
    }
  ]

  const competitiveMetrics = [
    {
      metric: "Product Features",
      techflow: 92,
      aiInnovations: 85,
      datamind: 88,
      neural: 90,
      quantum: 75
    },
    {
      metric: "Market Position",
      techflow: 45,
      aiInnovations: 95,
      datamind: 78,
      neural: 65,
      quantum: 58
    },
    {
      metric: "Customer Satisfaction",
      techflow: 94,
      aiInnovations: 76,
      datamind: 89,
      neural: 82,
      quantum: 71
    },
    {
      metric: "Innovation Rate",
      techflow: 96,
      aiInnovations: 72,
      datamind: 84,
      neural: 88,
      quantum: 69
    },
    {
      metric: "Pricing Competitiveness",
      techflow: 85,
      aiInnovations: 55,
      datamind: 78,
      neural: 60,
      quantum: 92
    }
  ]

  const swotAnalysis = {
    strengths: [
      "Superior technical innovation and product quality",
      "Exceptional team with proven track records",
      "Fastest growth rate in the market segment",
      "Strong customer satisfaction and retention",
      "Competitive pricing with high value proposition"
    ],
    weaknesses: [
      "Limited market presence compared to established players",
      "Small customer base relative to competitors",
      "Underdeveloped sales and marketing infrastructure",
      "Limited geographic reach and international presence",
      "Dependency on founder expertise and vision"
    ],
    opportunities: [
      "Rapidly growing AI/ML market with high demand",
      "Increasing enterprise adoption of automated solutions",
      "Potential for strategic partnerships with cloud providers",
      "International expansion opportunities",
      "Adjacent market segments and product extensions"
    ],
    threats: [
      "Well-funded competitors with aggressive expansion plans",
      "Potential market consolidation through acquisitions",
      "Economic downturn affecting enterprise software spending",
      "Regulatory changes impacting AI development",
      "Big tech companies entering the market segment"
    ]
  }

  const competitiveAdvantages = [
    {
      advantage: "Technical Innovation",
      description: "Proprietary ML algorithms delivering 40% better performance than competitors",
      sustainability: "High",
      timeToReplicate: "18-24 months",
      evidence: "Independent benchmarks and customer case studies"
    },
    {
      advantage: "Team Quality",
      description: "Leadership team from top-tier tech companies with proven execution",
      sustainability: "Medium",
      timeToReplicate: "12-18 months",
      evidence: "Previous company achievements and industry recognition"
    },
    {
      advantage: "Product-Market Fit",
      description: "94% customer satisfaction with 85% recurring revenue",
      sustainability: "High",
      timeToReplicate: "24+ months", 
      evidence: "Customer retention metrics and organic growth"
    },
    {
      advantage: "Agility & Speed",
      description: "Faster product development and customer response than larger competitors",
      sustainability: "Medium",
      timeToReplicate: "6-12 months",
      evidence: "Feature release velocity and customer feedback cycles"
    }
  ]

  const threats = [
    {
      threat: "AI Innovations Market Dominance",
      probability: "Medium",
      impact: "High",
      description: "Market leader could use resources to undercut pricing or acquire key customers",
      mitigation: "Focus on product differentiation and customer loyalty programs"
    },
    {
      threat: "Big Tech Entry",
      probability: "High",
      impact: "Very High",
      description: "Google, Microsoft, or Amazon could launch competing solutions",
      mitigation: "Build strong moats through proprietary technology and customer relationships"
    },
    {
      threat: "Economic Downturn",
      probability: "Medium",
      impact: "Medium",
      description: "Reduced enterprise spending on new technology initiatives",
      mitigation: "Demonstrate clear ROI and focus on cost-saving value propositions"
    }
  ]

  const strategicRecommendations = [
    {
      category: "Product Strategy",
      priority: "High",
      recommendations: [
        "Continue investing in R&D to maintain technical leadership",
        "Develop enterprise-grade security and compliance features",
        "Build integrations with popular enterprise software platforms"
      ]
    },
    {
      category: "Market Strategy",
      priority: "High",
      recommendations: [
        "Accelerate enterprise sales team hiring and training",
        "Establish strategic partnerships with systems integrators",
        "Develop vertical-specific solutions for key industries"
      ]
    },
    {
      category: "Competitive Strategy",
      priority: "Medium",
      recommendations: [
        "Position against larger competitors on agility and innovation",
        "Build defensive moats through customer success and retention",
        "Consider strategic acquisitions to accelerate growth"
      ]
    }
  ]

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
      </div>

      {/* Competitive Landscape Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Market Position Summary
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                TechFlow AI ranked #3 overall with highest innovation score and fastest growth
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">3.1%</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Market Share</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">#1</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Innovation Score</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">+240%</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Revenue Growth</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">94%</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Customer Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="landscape" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="landscape">Competitive Landscape</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
          <TabsTrigger value="advantages">Competitive Advantages</TabsTrigger>
          <TabsTrigger value="strategy">Strategic Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="landscape" className="space-y-6">
          <div className="space-y-6">
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
                              <span>{competitor.funding}</span>
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
                          <div className="text-sm text-muted-foreground mb-1">
                            {competitor.marketShare} market share
                          </div>
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

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button variant="ghost" size="sm">
                          Deep Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <div className="space-y-6">
            {competitiveMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{metric.metric}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">TechFlow AI</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.techflow} className="w-32 h-2" />
                        <span className="font-semibold text-blue-600">{metric.techflow}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AI Innovations</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.aiInnovations} className="w-32 h-2" />
                        <span className="font-medium">{metric.aiInnovations}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">DataMind Corp</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.datamind} className="w-32 h-2" />
                        <span className="font-medium">{metric.datamind}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Neural Systems</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.neural} className="w-32 h-2" />
                        <span className="font-medium">{metric.neural}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quantum Analytics</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.quantum} className="w-32 h-2" />
                        <span className="font-medium">{metric.quantum}</span>
                      </div>
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
                {swotAnalysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{strength}</p>
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
                {swotAnalysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{weakness}</p>
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
                {swotAnalysis.opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{opportunity}</p>
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
                {swotAnalysis.threats.map((threat, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{threat}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advantages" className="space-y-6">
          <div className="space-y-6">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{advantage.advantage}</h3>
                        <Badge 
                          variant={advantage.sustainability === 'High' ? 'default' : 'secondary'}
                          className={advantage.sustainability === 'High' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {advantage.sustainability} Sustainability
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{advantage.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Time to Replicate</h4>
                          <p className="text-sm text-muted-foreground">{advantage.timeToReplicate}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Supporting Evidence</h4>
                          <p className="text-sm text-muted-foreground">{advantage.evidence}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Threat Analysis */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Competitive Threats</h2>
              {threats.map((threat, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{threat.threat}</h3>
                          <Badge variant="outline">{threat.probability} Probability</Badge>
                          <Badge variant={threat.impact === 'Very High' || threat.impact === 'High' ? 'destructive' : 'secondary'}>
                            {threat.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{threat.description}</p>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm"><strong>Mitigation:</strong> {threat.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="space-y-6">
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

          {/* AI Strategic Insights */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span>AI Strategic Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">18 months</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Optimal window for aggressive growth</div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">3x</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Potential market share growth</div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">85%</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Success probability with current strategy</div>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Market analysis indicates optimal timing for Series B funding round within next 12 months
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Competitive positioning suggests focus on enterprise segment will yield highest returns
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Technical moat strength provides 18-24 month lead time advantage over closest competitors
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}