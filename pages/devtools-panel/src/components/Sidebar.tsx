import { Button } from "./ui/button";
import {
  FileIcon,
  FilePenIcon,
  ViewIcon,
  HandHelpingIcon,
  TerminalIcon,
} from "lucide-react";
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
  const tabs = ["Terminal", "Files"];

  return (
    <div className="w-16 border-r border-[#d8d8d8] dark:border-[#2c2c2e] bg-[#f2f2f2] dark:bg-[#1c1c1e] flex flex-col items-center justify-start pt-4 gap-4">
      {tabs.map((tab) => (
        <Tooltip key={tab}>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                activeTab === tab ? "dark:bg-[#2c2c2e] bg-[#d8d8d8]" : ""
              )}
              onClick={() => setActiveTab(tab)}
            >
              <TerminalIcon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>{tab}</TooltipContent>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon">
            <TerminalIcon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Terminal</TooltipContent>
      </Tooltip>

      <Button variant="ghost" size="icon">
        <FileIcon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
      </Button>
      <Button variant="ghost" size="icon">
        <FilePenIcon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
      </Button>
      <Button variant="ghost" size="icon">
        <ViewIcon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
      </Button>
      <Button variant="ghost" size="icon">
        <HandHelpingIcon className="w-6 h-6 text-[#333] dark:text-[#f2f2f2]" />
      </Button>
    </div>
  );
};
