import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Star
} from 'lucide-react'

export function LeadsGeneration() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedStage, setSelectedStage] = useState('all')

  const companies = [
    {
      id: 1,
      name: "NeuralGrid",
      industry: "AI/ML",
      stage: "Series A",
      location: "San Francisco, CA",
      founded: "2022",
      funding: "$12M",
      employees: "25-50",
      description: "Advanced neural network optimization for enterprise applications",
      aiScore: 94,
      aiInsights: [
        "Strong technical team with PhDs from Stanford and MIT",
        "Revenue growing 400% YoY with major enterprise clients",
        "Unique IP in neural architecture search"
      ],
      tags: ["Machine Learning", "Enterprise", "B2B SaaS"],
      logo: "🧠"
    },
    {
      id: 2,
      name: "EcoLogistics",
      industry: "CleanTech",
      stage: "Seed",
      location: "Austin, TX",
      founded: "2023",
      funding: "$3.5M",
      employees: "10-25",
      description: "Carbon-neutral supply chain optimization platform",
      aiScore: 87,
      aiInsights: [
        "Addressing $500B market with strong ESG tailwinds",
        "Partnerships with major logistics companies",
        "Proven reduction of 30% in carbon emissions"
      ],
      tags: ["ESG", "Logistics", "Sustainability"],
      logo: "🌱"
    },
    {
      id: 3,
      name: "QuantumSecure",
      industry: "Cybersecurity",
      stage: "Series B",
      location: "Boston, MA",
      founded: "2021",
      funding: "$25M",
      employees: "50-100",
      description: "Quantum-resistant encryption for financial institutions",
      aiScore: 91,
      aiInsights: [
        "First-mover advantage in quantum-safe cryptography",
        "Major banks as early adopters and strategic partners",
        "Patent portfolio worth estimated $50M+"
      ],
      tags: ["Cybersecurity", "Quantum", "FinTech"],
      logo: "🔐"
    },
    {
      id: 4,
      name: "BioSynth Labs",
      industry: "BioTech",
      stage: "Pre-Seed",
      location: "Cambridge, MA",
      founded: "2024",
      funding: "$1.2M",
      employees: "5-10",
      description: "Synthetic biology platform for personalized medicine",
      aiScore: 78,
      aiInsights: [
        "Breakthrough technology in protein synthesis",
        "Strong IP position with 5 patents pending",
        "Early validation from pharma partnerships"
      ],
      tags: ["Biotech", "Synthetic Biology", "Healthcare"],
      logo: "🧬"
    }
  ]

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = !selectedIndustry || selectedIndustry === 'all' || company.industry === selectedIndustry
    const matchesStage = !selectedStage || selectedStage === 'all' || company.stage === selectedStage
    
    return matchesSearch && matchesIndustry && matchesStage
  })

  const industries = ["AI/ML", "CleanTech", "Cybersecurity", "BioTech", "FinTech", "HealthTech"]
  const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+"]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Search className="h-6 w-6" />
          <span>Leads Generation</span>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </h1>
        <p className="text-muted-foreground">
          Discover and analyze potential investment opportunities powered by AI
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search companies, descriptions, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-700/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                AI Market Intelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">247</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">New Companies</div>
                  <div className="text-xs text-blue-500">This week</div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">87%</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Match Score</div>
                  <div className="text-xs text-blue-500">Avg relevance</div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">12</div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">Hot Leads</div>
                  <div className="text-xs text-blue-500">High potential</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Companies ({filteredCompanies.length} results)
          </h2>
          <Button variant="outline" size="sm">
            Export List
          </Button>
        </div>

        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{company.logo}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{company.name}</h3>
                        <Badge variant="outline">{company.industry}</Badge>
                        <Badge variant="secondary">{company.stage}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {company.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Founded {company.founded}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{company.funding} raised</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{company.employees} employees</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-lg">{company.aiScore}</span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                      <Badge 
                        variant={company.aiScore >= 90 ? "default" : company.aiScore >= 80 ? "secondary" : "outline"}
                        className="mb-3"
                      >
                        {company.aiScore >= 90 ? "High Potential" : company.aiScore >= 80 ? "Good Fit" : "Moderate Fit"}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {company.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-sm">AI Insights</span>
                    </div>
                    <div className="space-y-1">
                      {company.aiInsights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        View Analysis
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Quick Report
                      </Button>
                    </div>
                    <Button size="sm">
                      Deep Dive
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}