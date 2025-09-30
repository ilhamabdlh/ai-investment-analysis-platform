import React, { useEffect, useMemo, useState } from 'react'
import { apiService } from '../services/api'
import { useCompany } from '../context/company-context'
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
    // clear old data while switching companies
    setAnalysisData(null)
    fetchData()
    return () => { isMounted = false }
  }, [company?.id])

  const individuals = useMemo(() => {
    return analysisData?.key_individuals_analyses?.[0] || null
  }, [analysisData])

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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Placeholder metrics - you can add actual metrics later */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Team Strength</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{individuals?.team_strength_score || '—'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Leadership Score</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{individuals?.overall_score || '—'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Confidence</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{Math.round((individuals?.confidence_score || 0) * 100)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Team Size</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{(individuals?.individuals || []).length}</div>
          </CardContent>
        </Card>
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
            {(individuals?.individuals || []).filter((x: any) => !x.is_board_member).map((executive: any, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {(executive.name || 'NA').split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{executive.name || executive.title || 'Individual'}</h3>
                          <p className="text-muted-foreground">{executive.role || '—'}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{executive.experience || '—'} experience</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GraduationCap className="h-4 w-4" />
                              <span>{executive.education || '—'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-lg">{executive.credibility_score ?? executive.score ?? 0}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          <Badge 
                            variant={'secondary'}
                          >
                            Profile
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
                            {(executive.previous_companies || []).map((company: any, companyIndex: number) => (
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
                            {(executive.strengths || []).map((strength: any, strengthIndex: number) => (
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
                          {(executive.achievements || []).map((achievement: any, achievementIndex: number) => (
                            <div key={achievementIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {executive.social_media?.linkedin && (
                            <Button variant="outline" size="sm">
                              <Linkedin className="h-4 w-4 mr-1" />
                              LinkedIn
                            </Button>
                          )}
                          {executive.social_media?.twitter && (
                            <Button variant="outline" size="sm">
                              <Twitter className="h-4 w-4 mr-1" />
                              Twitter
                            </Button>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {executive.social_media?.followers || '-'} followers
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Public Perception: <span className="font-medium">{executive.public_perception ?? executive.score ?? 0}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="board" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(individuals?.individuals || []).filter((x: any) => x.is_board_member).map((advisor: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                        {(advisor.name || 'NA').split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{advisor.name || advisor.title || 'Advisor'}</h3>
                      <p className="text-sm text-muted-foreground">{advisor.role || '—'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Credibility</div>
                        <div className="font-semibold">{advisor.credibility_score ?? advisor.score ?? 0}/100</div>
                      </div>
                      <Badge 
                        variant={'secondary'}
                      >
                        Influence
                      </Badge>
                    </div>

                    <Progress value={(advisor.credibility_score ?? advisor.score ?? 0)} className="h-2" />
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
                {(individuals?.team_strengths || []).map((strength: any, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof strength === 'string' ? strength : strength.title || strength.description || JSON.stringify(strength)}</p>
                  </div>
                ))}
                {(!individuals?.team_strengths || individuals.team_strengths.length === 0) && (
                  <p className="text-sm text-muted-foreground">No strengths identified</p>
                )}
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
                {(individuals?.team_risks || []).map((concern: any, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof concern === 'string' ? concern : concern.title || concern.description || concern.name || JSON.stringify(concern)}</p>
                  </div>
                ))}
                {(!individuals?.team_risks || individuals.team_risks.length === 0) && (
                  <p className="text-sm text-muted-foreground">No concerns identified</p>
                )}
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
                {(individuals?.team_recommendations || []).map((recommendation: any, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{typeof recommendation === 'string' ? recommendation : recommendation.title || recommendation.description || JSON.stringify(recommendation)}</p>
                  </div>
                ))}
                {(!individuals?.team_recommendations || individuals.team_recommendations.length === 0) && (
                  <p className="text-sm text-muted-foreground">No recommendations available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {(individuals?.individual_risks || []).map((risk: any, index: number) => (
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

        <TabsContent value="mentions" className="space-y-4">
          {(individuals?.public_mentions || []).map((mention: any, index: number) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {(mention.person || 'NA').split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{mention.title || 'Mention'}</h3>
                      <Badge 
                        variant={mention.sentiment === 'Very Positive' || mention.sentiment === 'Positive' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {mention.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{mention.person || '—'}</span>
                      <span>•</span>
                      <span>{mention.source || '—'}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mention.date || ''}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{mention.summary || ''}</p>
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