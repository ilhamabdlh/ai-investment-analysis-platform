import { Button } from './ui/button'
import { 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Eye, 
  TrendingUp, 
  Users, 
  GitCompare,
  Sparkles,
  ChevronRight,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  onLogout: () => void
}

export function Sidebar({ activeView, onViewChange, onLogout }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & insights'
    },
    {
      id: 'leads',
      label: 'Leads Generation',
      icon: Search,
      description: 'AI-powered company discovery',
      aiPowered: true
    },
    {
      id: 'analysis',
      label: 'Analysis Suite',
      icon: BarChart3,
      isSection: true
    },
    {
      id: 'high-level',
      label: 'High-Level Analysis',
      icon: BarChart3,
      description: 'Company overview & fundamentals',
      isSubItem: true,
      aiPowered: true
    },
    {
      id: 'perception',
      label: 'Perception Analysis',
      icon: Eye,
      description: 'Public sentiment & brand perception',
      isSubItem: true,
      aiPowered: true
    },
    {
      id: 'market',
      label: 'Market Analysis',
      icon: TrendingUp,
      description: 'Market share & revenue estimates',
      isSubItem: true,
      aiPowered: true
    },
    {
      id: 'individuals',
      label: 'Key Individuals',
      icon: Users,
      description: 'Leadership & stakeholder analysis',
      isSubItem: true,
      aiPowered: true
    },
    {
      id: 'competitive',
      label: 'Competitive Analysis',
      icon: GitCompare,
      description: 'Competitor benchmarking',
      isSubItem: true,
      aiPowered: true
    }
  ]

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col min-h-0 overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src="/favicon_alphaint.png" 
              alt="AlphaInt Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-semibold">AlphaInt</h2>
            <p className="text-sm text-muted-foreground">Investment Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
        {menuItems.map((item) => {
          if (item.isSection) {
            return (
              <div key={item.id} className="pt-4 pb-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
                  {item.label}
                </h3>
              </div>
            )
          }

          const isActive = activeView === item.id
          const Icon = item.icon

          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                item.isSubItem ? 'ml-4' : ''
              } ${isActive ? 'bg-secondary/80' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`p-1.5 rounded-lg ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.aiPowered && (
                      <Sparkles className="h-3 w-3 text-blue-500" />
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${
                  isActive ? 'rotate-90' : ''
                } text-muted-foreground`} />
              </div>
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border shrink-0">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">AI Assistant</span>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
            Get instant insights and analysis powered by advanced AI models
          </p>
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Ask AI
          </Button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border shrink-0">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}