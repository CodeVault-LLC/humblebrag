import { scanStorage } from "@humblebrag/storage";
import { getScripts } from "@src/handlers/scripts";
import { findCurrentTab } from "./tab";

export const DoScan = async () => {
  const tab = await findCurrentTab();
  if (!tab) {
    console.error("No active tab found");
    return;
  }

  const scripts = await getScripts(tab.id ?? 0);

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
