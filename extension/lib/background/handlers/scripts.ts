/* eslint-disable no-console -- Understood */
import { fetchScriptContent } from "../client/fetch";
import { type ScriptResponse } from "@humblebrag/shared/lib/types/message";

export const getScripts = async (tabId: number): Promise<ScriptResponse[]> => {
  try {
    const scripts = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        // Get all script elements and their details
        const subScripts = Array.from(document.scripts).map((script) => {
          return {
            name: script.src || "inline-script",
            size: script.text.length,
            content: script.src ? null : script.text, // Handle inline scripts with no src
          };
        });
        return subScripts;
      },
    });

    const scriptDetails = await Promise.all(
      scripts[0]?.result?.map(
        async (script: {
          name: string;
          size: number;
          content: string | null;
        }) => {
          if (script.name !== "inline-script" && !script.content) {
            script.content = await fetchScriptContent(script.name);
          }
          return script as ScriptResponse;
        }
      ) ?? []
    );

    return scriptDetails;
  } catch (error) {
    console.error(`Failed to get scripts for tab ${String(tabId)}:`, error);
    return [];
  }
};
