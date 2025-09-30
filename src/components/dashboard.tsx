import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Clock,
  Target,
  Briefcase
} from 'lucide-react'
import { apiService } from '../services/api'

interface DashboardStats {
  active_prospects: number
  investment_pipeline: number
  analysis_completed: number
  success_rate: number
  new_companies_this_week: number
  avg_match_score: number
  hot_leads: number
}

interface RecentAnalysis {
  id: string
  company_name: string
  analysis_type: string
  title: string
  overall_score: number
  confidence_score: number
  analyst_name: string
  created_at: string
  is_completed: boolean
}

interface UpcomingTask {
  id: string
  task: string
  priority: string
  due_date: string
  type: string
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, analysesResponse, tasksResponse] = await Promise.all([
        apiService.dashboard.stats(),
        apiService.dashboard.recentAnalyses(),
        apiService.dashboard.upcomingTasks()
      ])

      setStats(statsResponse.data)
      setRecentAnalyses(analysesResponse.data)
      setUpcomingTasks(tasksResponse.data)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  const statsCards = stats ? [
    {
      title: "Active Prospects",
      value: stats.active_prospects.toString(),
      change: "+12%",
      trend: "up",
      icon: Building2,
      description: "Companies being analyzed"
    },
    {
      title: "Investment Pipeline",
      value: `$${(stats.investment_pipeline / 1000000).toFixed(1)}M`,
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      description: "Total opportunity value"
    },
    {
      title: "Analysis Completed",
      value: stats.analysis_completed.toString(),
      change: "-3%",
      trend: "down",
      icon: Target,
      description: "This month"
    },
    {
      title: "Success Rate",
      value: `${stats.success_rate}%`,
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      description: "Investment accuracy"
    }
  ] : []

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Investment Dashboard</h1>
        <p className="text-muted-foreground">AI-powered insights for smarter investment decisions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-muted rounded-lg">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`flex items-center space-x-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span>Recent AI Analyses</span>
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{analysis.company_name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {analysis.analysis_type.replace('-', ' ')}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {analysis.is_completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Score:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={analysis.overall_score || 0} className="w-16 h-2" />
                        <span className="text-sm font-medium">{analysis.overall_score || 0}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={analysis.overall_score && analysis.overall_score >= 80 ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {analysis.overall_score && analysis.overall_score >= 80 ? 'High Score' : 'Moderate Score'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-3 w-3" />
                    <span>{analysis.title}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(analysis.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    by {analysis.analyst_name}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Upcoming Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{task.task}</h4>
                  <Badge 
                    variant={task.priority === 'High' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{task.type}</span>
                  <span>{task.due_date}</span>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline" size="sm">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                AI Market Intelligence Update
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                Our AI has identified 3 emerging opportunities in the FinTech sector and detected potential risks in 2 portfolio companies. 
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}