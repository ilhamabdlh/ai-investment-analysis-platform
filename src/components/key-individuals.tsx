import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback } from './ui/avatar'
import { 
  Users, 
  Briefcase, 
  GraduationCap,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Calendar,
  Building2,
  Star,
  Linkedin,
  Twitter,
  Globe,
  BookOpen
} from 'lucide-react'

export function KeyIndividuals() {
  const executiveTeam = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      experience: "12 years",
      previousCompanies: ["Google AI", "DeepMind"],
      education: "PhD Computer Science, Stanford",
      credibilityScore: 94,
      riskLevel: "Low",
      strengths: ["AI Research", "Product Vision", "Team Building"],
      achievements: [
        "Led 3 successful AI product launches at Google",
        "Published 15 papers in top-tier ML conferences",
        "Named in Forbes 30 Under 30 AI category"
      ],
      socialMedia: {
        linkedin: "sarah-chen-ai",
        twitter: "@sarahc_ai",
        followers: "24K"
      },
      recentActivity: "Keynote at AI Summit 2024",
      publicPerception: 87
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      experience: "15 years",
      previousCompanies: ["Meta", "Tesla Autopilot"],
      education: "MS Computer Science, MIT",
      credibilityScore: 91,
      riskLevel: "Low",
      strengths: ["System Architecture", "ML Engineering", "Technical Leadership"],
      achievements: [
        "Built ML infrastructure serving 2B+ users at Meta",
        "Core contributor to TensorFlow and PyTorch",
        "20+ patents in distributed computing"
      ],
      socialMedia: {
        linkedin: "marcus-rodriguez-cto",
        twitter: "@marcusr_tech",
        followers: "18K"
      },
      recentActivity: "Speaking at MLOps Conference",
      publicPerception: 83
    },
    {
      name: "Jennifer Park",
      role: "VP of Sales",
      experience: "10 years",
      previousCompanies: ["Salesforce", "Oracle"],
      education: "MBA, Wharton",
      credibilityScore: 86,
      riskLevel: "Low",
      strengths: ["Enterprise Sales", "Customer Success", "Revenue Growth"],
      achievements: [
        "Scaled revenue from $0 to $50M at previous startup",
        "Top 1% performer at Salesforce for 3 consecutive years",
        "Built enterprise sales team of 40+ people"
      ],
      socialMedia: {
        linkedin: "jennifer-park-sales",
        followers: "12K"
      },
      recentActivity: "Customer success case study",
      publicPerception: 79
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      experience: "13 years",
      previousCompanies: ["Uber", "Airbnb"],
      education: "MS Computer Science, UC Berkeley",
      credibilityScore: 88,
      riskLevel: "Medium",
      strengths: ["Scalable Systems", "Team Management", "Product Development"],
      achievements: [
        "Led engineering teams of 100+ at Uber",
        "Built real-time ML systems processing millions of requests",
        "Open source contributor with 10K+ GitHub stars"
      ],
      socialMedia: {
        linkedin: "david-kim-engineering",
        github: "davidk-eng",
        followers: "8K"
      },
      recentActivity: "Technical blog post on ML scaling",
      publicPerception: 81,
      risks: ["Previous startup failure in 2019"]
    }
  ]

  const boardAdvisors = [
    {
      name: "Dr. Amanda Foster",
      role: "Board Member",
      background: "Former VP AI at Microsoft",
      expertise: "AI Strategy, Product Development",
      credibilityScore: 96,
      influence: "High",
      connections: "Enterprise tech executives"
    },
    {
      name: "Robert Chang",
      role: "Board Member",
      background: "Managing Partner at Sequoia Capital",
      expertise: "Venture Capital, Scaling Startups",
      credibilityScore: 98,
      influence: "Very High",
      connections: "VC ecosystem, tech executives"
    },
    {
      name: "Lisa Thompson",
      role: "Strategic Advisor",
      background: "Former Chief Data Officer at Goldman Sachs",
      expertise: "Financial Services, Data Strategy",
      credibilityScore: 92,
      influence: "Medium",
      connections: "Financial services industry"
    }
  ]

  const riskFactors = [
    {
      type: "Low",
      individual: "David Kim",
      risk: "Previous Startup Failure",
      description: "VP of Engineering had a failed startup in 2019 in the blockchain space",
      impact: "Limited impact - different industry and learned from experience",
      mitigation: "Strong track record at major tech companies post-failure"
    },
    {
      type: "Medium",
      individual: "Executive Team",
      risk: "Limited Enterprise Sales Experience",
      description: "Most of team comes from product/tech background",
      impact: "Could slow enterprise customer acquisition",
      mitigation: "Recently hired experienced VP of Sales from enterprise background"
    }
  ]

  const keyMetrics = [
    { metric: "Average Experience", value: "12.5 years", trend: "up" },
    { metric: "Previous Exits", value: "3", trend: "stable" },
    { metric: "Combined Network", value: "50K+", trend: "up" },
    { metric: "Industry Recognition", value: "18 awards", trend: "up" }
  ]

  const teamAnalysis = {
    strengths: [
      "Deep technical expertise in AI/ML from top-tier companies",
      "Proven track record of scaling products to millions of users",
      "Strong academic credentials and research background",
      "Diverse experience across different tech verticals",
      "Active in AI community with thought leadership"
    ],
    concerns: [
      "Limited experience in early-stage company operations",
      "Heavy concentration in technical roles vs business development",
      "Potential over-reliance on founders for strategic decisions"
    ],
    recommendations: [
      "Consider adding more business development expertise to C-suite",
      "Establish formal mentorship program with successful startup alumni",
      "Create advisory board with industry-specific domain experts"
    ]
  }

  const publicMentions = [
    {
      person: "Sarah Chen",
      title: "AI Ethics: Building Responsible Machine Learning Systems",
      source: "Harvard Business Review",
      date: "1 week ago",
      sentiment: "Very Positive",
      summary: "Thoughtful piece on responsible AI development practices"
    },
    {
      person: "Marcus Rodriguez", 
      title: "The Future of MLOps: Infrastructure at Scale",
      source: "TechCrunch",
      date: "2 weeks ago",
      sentiment: "Positive",
      summary: "Technical insights on building scalable ML infrastructure"
    },
    {
      person: "Jennifer Park",
      title: "How TechFlow AI Achieved 300% Growth",
      source: "SaaS Metrics Podcast",
      date: "3 weeks ago",
      sentiment: "Positive",
      summary: "Sales strategy and customer success case studies"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <span>Key Individuals Analysis</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          Leadership analysis, track records, and risk assessment
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.metric}</span>
                <TrendingUp className={`h-4 w-4 ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="executives" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="executives">Executive Team</TabsTrigger>
          <TabsTrigger value="board">Board & Advisors</TabsTrigger>
          <TabsTrigger value="analysis">Team Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="mentions">Public Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="executives" className="space-y-6">
          <div className="space-y-6">
            {executiveTeam.map((executive, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {executive.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{executive.name}</h3>
                          <p className="text-muted-foreground">{executive.role}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{executive.experience} experience</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GraduationCap className="h-4 w-4" />
                              <span>{executive.education}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-lg">{executive.credibilityScore}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          <Badge 
                            variant={executive.riskLevel === 'Low' ? 'default' : 'secondary'}
                            className={executive.riskLevel === 'Low' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {executive.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span>Previous Companies</span>
                          </h4>
                          <div className="space-y-1">
                            {executive.previousCompanies.map((company, companyIndex) => (
                              <Badge key={companyIndex} variant="outline" className="mr-2">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center space-x-2">
                            <Award className="h-4 w-4" />
                            <span>Core Strengths</span>
                          </h4>
                          <div className="space-y-1">
                            {executive.strengths.map((strength, strengthIndex) => (
                              <Badge key={strengthIndex} variant="secondary" className="mr-2 text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Key Achievements</h4>
                        <div className="space-y-2">
                          {executive.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {executive.socialMedia.linkedin && (
                            <Button variant="outline" size="sm">
                              <Linkedin className="h-4 w-4 mr-1" />
                              LinkedIn
                            </Button>
                          )}
                          {executive.socialMedia.twitter && (
                            <Button variant="outline" size="sm">
                              <Twitter className="h-4 w-4 mr-1" />
                              Twitter
                            </Button>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {executive.socialMedia.followers} followers
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Public Perception: <span className="font-medium">{executive.publicPerception}/100</span>
                        </div>
                      </div>

                      {executive.risks && (
                        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
                          <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">Risk Factor:</span>
                            <span className="text-sm">{executive.risks[0]}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="board" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardAdvisors.map((advisor, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{advisor.name}</h3>
                      <p className="text-sm text-muted-foreground">{advisor.role}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Background</h4>
                      <p className="text-sm text-muted-foreground">{advisor.background}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-1">Expertise</h4>
                      <p className="text-sm text-muted-foreground">{advisor.expertise}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Credibility</div>
                        <div className="font-semibold">{advisor.credibilityScore}/100</div>
                      </div>
                      <Badge 
                        variant={advisor.influence === 'Very High' || advisor.influence === 'High' ? 'default' : 'secondary'}
                      >
                        {advisor.influence} Influence
                      </Badge>
                    </div>

                    <Progress value={advisor.credibilityScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamAnalysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{strength}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Concerns</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamAnalysis.concerns.map((concern, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{concern}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{recommendation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {riskFactors.map((risk, index) => (
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
                      <h3 className="font-semibold">{risk.risk}</h3>
                      <Badge variant={
                        risk.type === 'High' ? 'destructive' : 
                        risk.type === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {risk.type} Risk
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {risk.individual}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{risk.description}</p>
                    <p className="text-sm mb-3"><strong>Impact:</strong> {risk.impact}</p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm"><strong>Mitigation:</strong> {risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          {publicMentions.map((mention, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {mention.person.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{mention.title}</h3>
                      <Badge 
                        variant={mention.sentiment === 'Very Positive' || mention.sentiment === 'Positive' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {mention.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{mention.person}</span>
                      <span>•</span>
                      <span>{mention.source}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mention.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{mention.summary}</p>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Read Full Article
                    </Button>
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