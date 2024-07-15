import { useStorageSuspense } from "@humblebrag/shared";
import { scanStorage } from "@humblebrag/storage";
import { Button } from "@src/components/ui/button";
import { Card, CardContent, CardHeader } from "@src/components/ui/card";
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

  if (!scan?.databaseLogins) {
    return (
      <div>
        <h5 className="text-[#333] dark:text-[#f2f2f2]">No findings</h5>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from(new Set(scan.databaseLogins.map((tab) => tab.name))).map(
            (name) => (
              <Card key={name}>
                <CardHeader>
                  <h2 className="text-[#333] dark:text-[#f2f2f2] text-xl">
                    {name}
                  </h2>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Match</TableHead>
                        <TableHead>Line</TableHead>
                        <TableHead>Script</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {scan.databaseLogins
                        .filter((secret) => secret.name === name)
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
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};
