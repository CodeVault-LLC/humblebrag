/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Safe */
/* eslint-disable no-console -- Safe */
import { generateMessage } from "../client/response";
import { getScripts } from "../handlers/scripts";
import { regexHandler } from "../lib/regex";
import { findCurrentTab } from "../lib/tab";
import { SECRET_PATTERNS } from "../secrets/patterns";
import { type Respond } from "../../../src/types/route";
import { type Secret } from "../../../src/types/secret";

const ScriptRoute = async (respond: Respond): Promise<void> => {
  const tab = await findCurrentTab();
  if (!tab) {
    console.error("No active tab found");
    return;
  }

  const scripts = await getScripts(tab.id ?? 0);
  const foundSecrets: Secret[] = [];

  scripts.forEach((script) => {
    if (script.content) {
      SECRET_PATTERNS.forEach((pattern) => {
        const results = regexHandler(script.content ?? "", pattern.pattern);
        if (results.length > 0) {
          foundSecrets.push({
            pattern: {
              category: pattern.category ?? "Unknown",
              description: pattern.description,
              name: pattern.name,
              subCategory: pattern.subCategory ?? "Unknown",
            },
            results,
          });
        }
      });
    }
  });
  respond(generateMessage("secrets", foundSecrets));
};

export { ScriptRoute };
