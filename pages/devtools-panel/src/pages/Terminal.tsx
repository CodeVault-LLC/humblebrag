import { CusResponse } from "@humblebrag/shared/lib/injection/inject";
import { OptionsSidebar } from "@src/components/OptionsSidebar";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { cn } from "@src/lib/utils";
import { PlusIcon, SplitIcon, TerminalIcon } from "lucide-react";
import { useState } from "react";

interface Command {
  id: string;
  command: string;

  response?: CusResponse;
}

export const Terminal: React.FC = () => {
  const [commandInput, setCommandInput] = useState<string>("");
  const [commands, setCommands] = useState<Map<string, Command[]>>(new Map());
  const [tabs, setTabs] = useState<string[]>(["tab1"]);
  const [currentTab, setCurrentTab] = useState<string>("tab1");

  const doCommand = (command: string): void => {
    switch (command) {
      case "clear()":
        setCommands(new Map([...commands, [currentTab, []]]));
        return;
      case "clearAll()":
        setCommands(new Map());
        return;
      default:
        chrome.devtools.inspectedWindow.eval(command, (result, exception) => {
          if (exception) {
            setCommands(
              new Map([
                ...commands,
                [
                  currentTab,
                  [
                    ...(commands.get(currentTab) ?? []),
                    {
                      id: currentTab,
                      command,
                      response: {
                        type: "error",
                        data: exception.value ?? "Something went wrong..",
                      },
                    },
                  ],
                ],
              ])
            );
          } else {
            console.log(result);
            setCommands(
              new Map([
                ...commands,
                [
                  currentTab,
                  [
                    ...(commands.get(currentTab) ?? []),
                    {
                      id: currentTab,
                      command,
                      response: {
                        type:
                          (result as unknown as CusResponse)?.type ??
                          typeof result === "object"
                            ? "json"
                            : "text",
                        data:
                          (result as unknown as CusResponse)?.data ??
                          (typeof result === "object"
                            ? result
                            : String(result)),
                      },
                    },
                  ],
                ],
              ])
            );
          }
        });
        return;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center h-10 px-4 border-b border-[#d8d8d8] dark:border-[#2c2c2e]">
        <Tabs defaultValue="tab1" className="w-full bg-transparent">
          <TabsList className="flex bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                value="tab1"
                className={cn(
                  "px-4 py-2 rounded-t-lg hover:bg-[#e5e5e5] dark:hover:bg-[#2c2c2e]",
                  currentTab === tab && "bg-[#e5e5e5] dark:bg-[#2c2c2e]"
                )}
                key={tab}
                onClick={() => setCurrentTab(tab)}
              >
                <TerminalIcon className="w-4 h-4 mr-2" />
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon
              className={"w-4 h-4 text-[#333] dark:text-[#f2f2f2]"}
              onClick={() => {
                setTabs([...tabs, `tab${tabs.length + 1}`]);
                setCurrentTab(`tab${tabs.length + 1}`);
              }}
            />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <SplitIcon className="w-4 h-4 text-[#333] dark:text-[#f2f2f2]" />
          </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 p-4 bg-[#f2f2f2] dark:bg-[#1c1c1e] text-[#333] dark:text-[#f2f2f2] font-mono gap-6 h-[91vh] overflow-y-auto">
          {commands.get(currentTab)?.map((command, key) => {
            return (
              <div
                key={key}
                className="mb-2 bg-secondary px-2 rounded-md w-[64vw]"
              >
                <div className="overflow-x-auto">
                  <span className="text-[#4d4d4d] dark:text-[#8e8e93]">
                    user@terminal
                  </span>
                  <span className="text-[#007aff] dark:text-[#5ac8fa]">~</span>
                  <span>$</span>
                  <span className="ml-2 text-[#333] dark:text-[#f2f2f2]">
                    {command.command}
                  </span>
                </div>

                <div className="text-[#333] dark:text-[#f2f2f2]">
                  {command.response?.type === "text" && (
                    <span className="overflow-x-auto">
                      {String(command.response.data)}
                    </span>
                  )}

                  {command.response?.type === "error" && (
                    <span className="text-red-500 overflow-x-auto">
                      {String(command.response.data)}
                    </span>
                  )}

                  {command.response?.type === "json" && (
                    <pre className="overflow-x-auto">
                      {JSON.stringify(command.response.data, null, 2)}
                    </pre>
                  )}

                  {command.response?.type === "dir" && (
                    <pre className="overflow-x-auto">
                      {JSON.stringify(command.response.data, null, 2)}
                    </pre>
                  )}

                  {command.response?.type === "table" && (
                    <Table className="!w-[50vw]">
                      <TableHeader className="!w-[50vw]">
                        <TableRow className="!w-[50vw]">
                          {Object.keys(
                            (
                              command.response.data as unknown as Array<Object>
                            )[0]
                          ).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>

                      <TableBody className="!w-[50vw]">
                        {(
                          command.response.data as unknown as Array<Object>
                        ).map((row, key) => (
                          <TableRow key={key} className="!w-[50vw]">
                            {Object.values(row).map((value, key) => (
                              <TableCell key={key} className="!w-[50vw]">
                                {value}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex w-full items-center space-x-2">
            <Input
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (!commandInput) return;

                  doCommand(commandInput);
                  setCommandInput("");
                }
              }}
              placeholder="Enter command..."
              className="w-full"
            />

            <Select
              onValueChange={(value) => setCommandInput(value)}
              value={commandInput}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Commands" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="getCookies()">Get Cookies</SelectItem>
                <SelectItem value="getBrowser()">Get Browser</SelectItem>
                <SelectItem value="information(getBrowser)">
                  Get Information
                </SelectItem>
                <SelectItem value="logLocalStorage()">
                  Log Local Storage
                </SelectItem>
                <SelectItem value="logSessionStorage()">
                  Log Session Storage
                </SelectItem>
                <SelectItem value="showDOMTree(document.body)">
                  Show DOM Tree
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <OptionsSidebar />
      </div>
    </div>
  );
};
