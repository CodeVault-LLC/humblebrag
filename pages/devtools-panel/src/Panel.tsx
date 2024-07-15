import { withErrorBoundary, withSuspense } from "@humblebrag/shared";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Terminal } from "./pages/Terminal";
import { Files } from "./pages/Files";
import { Options } from "./pages/Options";
import { findCurrentTab } from "./lib/tab";
import { getScripts } from "./handlers/scripts";
import { scanStorage } from "@humblebrag/storage";
import { Findings } from "./pages/Findings";
import { Database } from "./pages/Database";

const Panel = () => {
  const [activeTab, setActiveTab] = useState<string>("Terminal");

  useEffect(() => {
    const getData = async () => {
      const tab = await findCurrentTab();
      if (!tab) {
        console.error("No active tab found");
        return;
      }

      const scripts = await getScripts(tab.id ?? 0);

      console.log("Scripts:", scripts);
      console.log("Tab:", tab);

      const response = await fetch("http://localhost:3000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: tab.url,
          depth: 2,
          doScripts: true,
          doStyles: false,
          doImages: false,
          doLinks: true,

          scripts: scripts.map((script) => ({
            src: script.name,
            content: script.content,
          })),
        }),
      });
      if (!response.ok) {
        console.error("Failed to fetch scan data");
        return;
      }

      const data = await response.json();
      scanStorage.addScan(data);
    };

    getData();
  });

  return (
    <ThemeProvider defaultTheme="system" storageKey="devtools-theme">
      <TooltipProvider delayDuration={50}>
        <div className="flex flex-col h-screen font-inter overflow-hidden">
          <Navbar />
          <div className="flex-1 flex">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab)}
            />
            {activeTab === "Terminal" && <Terminal />}
            {activeTab === "Files" && <Files />}
            {activeTab === "Findings" && <Findings />}
            {activeTab === "Database" && <Database />}
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
