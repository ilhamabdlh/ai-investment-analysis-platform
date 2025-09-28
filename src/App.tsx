import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { Dashboard } from "./components/dashboard";
import { LeadsGeneration } from "./components/leads-generation";
import { HighLevelAnalysis } from "./components/high-level-analysis";
import { PerceptionAnalysis } from "./components/perception-analysis";
import { MarketAnalysis } from "./components/market-analysis";
import { KeyIndividuals } from "./components/key-individuals";
import { CompetitiveAnalysis } from "./components/competitive-analysis";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

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
      />
      <main className="flex-1 overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}