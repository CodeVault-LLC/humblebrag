import { useStorageSuspense } from "@humblebrag/shared";
import { scanStorage } from "@humblebrag/storage";
import type { Results, Scan } from "@humblebrag/storage/lib/scanStorage";
import { Button } from "@src/components/ui/button";
import { DataTable } from "@src/components/ui/data-table";
import { cn } from "@src/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export const Findings: React.FC = () => {
  const scan = useStorageSuspense(scanStorage)[0];
  const [currentTab, setCurrentTab] = useState<string>(
    scan.secrets[0]?.name ?? ""
  );

  const columns: ColumnDef<Results>[] = [
    {
      id: "match",
      header: "Match",
      accessorKey: "match",
    },
    {
      id: "line",
      header: "Line",
      accessorKey: "line",
    },
    {
      id: "script",
      header: "Script",
      cell: ({ row }) => {
        const script = row.original.script;

        if (script.toString() === "inline-script") {
          return "Inline Script";
        }

        return (
          <a
            href={script}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 dark:text-blue-400"
          >
            {script}
          </a>
        );
      },
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 w-[96vw] overflow-auto">
        <div className="grid grid-cols-2 gap-4 mb-8 overflow-x-auto">
          {Array.from(new Set(scan.secrets.map((tab) => tab.name))).map(
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

        {scan.secrets.length !== 0 ? (
          <DataTable
            columns={columns}
            data={scan.secrets
              .filter((secret) => secret.name === currentTab)
              .flatMap((secret) => secret?.results)}
          />
        ) : (
          <h5 className="text-[#333] dark:text-[#f2f2f2]">No findings</h5>
        )}
      </div>
    </div>
  );
};
