import { useState, useEffect } from "react";
import { Sidebar } from "./components/sidebar";
import { Dashboard } from "./components/dashboard";
import { LeadsGeneration } from "./components/leads-generation";
import { HighLevelAnalysis } from "./components/high-level-analysis";
import { PerceptionAnalysis } from "./components/perception-analysis";
import { MarketAnalysis } from "./components/market-analysis";
import { KeyIndividuals } from "./components/key-individuals";
import { CompetitiveAnalysis } from "./components/competitive-analysis";
import { Login } from "./components/login";
import { apiService } from "./services/api";
import { CompanyProvider, useCompany } from "./context/company-context";
import { CompanySelector } from "./components/company-selector";
import { Button } from "./components/ui/button";
import { Building2, ChevronDown } from "lucide-react";

function AppShell() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const { company } = useCompany();

  useEffect(() => {
    const handler = () => setSelectorOpen(true);
    window.addEventListener('open-company-selector', handler as any);
    return () => window.removeEventListener('open-company-selector', handler as any);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = apiService.auth.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiService.auth.logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "leads":
        return <LeadsGeneration />;
      case "high-level":
        return <HighLevelAnalysis />;
      case "perception":
        return <PerceptionAnalysis />;
      case "market":
        return <MarketAnalysis />;
      case "individuals":
        return <KeyIndividuals />;
      case "competitive":
        return <CompetitiveAnalysis />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
          <div className="px-4 py-2 flex items-center justify-between">
            <div />
            <div>
              <Button variant="outline" size="sm" onClick={() => setSelectorOpen(true)} className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold">
                  {(company?.name || 'C').charAt(0)}
                </div>
                <span className="text-sm">{company?.name || 'Select company'}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {renderActiveView()}
      </main>
      <CompanySelector open={selectorOpen} onOpenChange={setSelectorOpen} />
    </div>
  );
}

export default function App() {
  return (
    <CompanyProvider>
      <AppShell />
    </CompanyProvider>
  );
}