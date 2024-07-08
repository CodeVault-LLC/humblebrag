import { withErrorBoundary, withSuspense } from "@humblebrag/shared";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Terminal } from "./pages/Terminal";
import { Files } from "./pages/Files";
import { Options } from "./pages/Options";

const Panel = () => {
  const [activeTab, setActiveTab] = useState<string>("Terminal");

  return (
    <ThemeProvider defaultTheme="system" storageKey="devtools-theme">
      <TooltipProvider delayDuration={50}>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-1 flex">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab)}
            />
            {activeTab === "Terminal" && <Terminal />}
            {activeTab === "Files" && <Files />}
            {activeTab === "Settings" && <Options />}
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default withErrorBoundary(
  withSuspense(Panel, <div> Loading ... </div>),
  <div> Error Occur </div>
);
