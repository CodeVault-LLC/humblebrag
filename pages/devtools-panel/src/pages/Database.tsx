import { useStorageSuspense } from "@humblebrag/shared";
import { scanStorage } from "@humblebrag/storage";
import { Button } from "@src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { cn } from "@src/lib/utils";
import { useState } from "react";

export const Database: React.FC = () => {
  const scan = useStorageSuspense(scanStorage)[0];
  const [currentTab, setCurrentTab] = useState<string>(
    scan.databaseLogins[0]?.name ?? ""
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Array.from(new Set(scan.databaseLogins.map((tab) => tab.name))).map(
            (name) => (
              <Button
                key={name}
                variant="ghost"
                className={cn(
                  "px-4 py-2 rounded-lg hover:bg-[#e5e5e5] dark:hover:bg-[#2c2c2e] cursor-pointer",
                  currentTab === name && "bg-[#e5e5e5] dark:bg-[#2c2c2e]"
                )}
                onClick={() => setCurrentTab(name)}
              >
                {name}
              </Button>
            )
          )}
        </div>

        {scan.databaseLogins.length !== 0 ? (
          <Table className="!w-[50vw] overflow-auto">
            <TableHeader className="!w-[50vw]">
              <TableRow className="!w-[50vw]">
                <TableHead>Match</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Script</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="!w-[50vw]">
              {scan.databaseLogins
                .filter((secret) => secret.name === currentTab)
                .map((secret) =>
                  secret?.results.map((finding: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{finding.match}</TableCell>
                      <TableCell>{finding.line}</TableCell>
                      <TableCell>
                        <a
                          href={finding.script}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          {finding.script}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>
          </Table>
        ) : (
          <h5 className="text-[#333] dark:text-[#f2f2f2]">No findings</h5>
        )}
      </div>
    </div>
  );
};
