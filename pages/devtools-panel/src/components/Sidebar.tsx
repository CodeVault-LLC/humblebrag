import { Button } from "./ui/button";
import { TerminalIcon, FilesIcon, SettingsIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@src/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      name: "Terminal",
      icon: TerminalIcon,
    },
    {
      name: "Files",
      icon: FilesIcon,
    },
    {
      name: "Settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="w-16 border-r border-[#d8d8d8] dark:border-[#2c2c2e]  flex flex-col items-center justify-start pt-4 gap-4">
      {tabs.map((tab) => (
        <Tooltip key={tab.name}>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                activeTab === tab.name ? "dark:bg-[#2c2c2e] bg-[#d8d8d8]" : ""
              )}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon && (
                <tab.icon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
              )}
            </Button>
          </TooltipTrigger>

          <TooltipContent>{tab.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
