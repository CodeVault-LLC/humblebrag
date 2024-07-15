import { useStorageSuspense } from "@humblebrag/shared";
import { scanStorage } from "@humblebrag/storage";
import type { Results, Scan } from "@humblebrag/storage/lib/scanStorage";
import { Button } from "@src/components/ui/button";
import { DataTable } from "@src/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { cn } from "@src/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Findings: React.FC = () => {
  const scan = useStorageSuspense(scanStorage)[0];
  const [results, setResults] = useState<Results[]>([]);

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

  useEffect(() => {
    setResults(
      scan && scan?.secrets && scan.secrets.flatMap((secret) => secret.results)
    );
  }, []);

  if (!scan?.secrets) {
    return (
      <div>
        <h5 className="text-[#333] dark:text-[#f2f2f2]">No findings</h5>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4">
        {scan?.secrets?.length !== 0 ? (
          <>
            <div className="flex items-center justify-between mb-4 space-x-4">
              <Select
                onValueChange={(e) => {
                  if (e === "all") {
                    setResults(
                      scan.secrets.flatMap((secret) => secret.results)
                    );
                  } else {
                    setResults(
                      scan.secrets.find((secret) => secret.name === e)
                        ?.results ?? []
                    );
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a secret" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>

                  {Array.from(new Set(scan.secrets.map((tab) => tab.name))).map(
                    (name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="flex flex-row items-center space-x-2"
                onClick={() => {
                  // put it into a csv file
                  const csv = results
                    .map((result) => {
                      return `${result.match},${result.line},${result.script}`;
                    })
                    .join("\n");

                  const blob = new Blob(
                    [
                      `
                    Match,Line,Script
                    ${csv}
                    `,
                    ],
                    { type: "text/csv" }
                  );

                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "findings.csv";
                  a.click();
                  URL.revokeObjectURL(url);

                  a.remove();
                }}
              >
                <DownloadIcon size={16} />
                <span>Export</span>
              </Button>
            </div>

            <DataTable columns={columns} data={results} />
          </>
        ) : (
          <h5 className="text-[#333] dark:text-[#f2f2f2]">No findings</h5>
        )}
      </div>
    </div>
  );
};
