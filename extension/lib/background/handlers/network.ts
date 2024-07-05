import { type ScriptResponse } from "@humblebrag/shared/lib/types/message";

export const getNetworkRequests = async (
  tabId: number
): Promise<ScriptResponse[]> => {
  try {
    const networkRequests = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        // Get all network requests
        const requests = Array.from(
          window.performance.getEntriesByType("resource")
        ).map((request: PerformanceEntry) => {
          // Update the type of the parameter here
          return {
            name: request.name,
            size: request.duration,
          };
        });
        return requests;
      },
    });

    return networkRequests[0].result as ScriptResponse[];
  } catch (error) {
    // eslint-disable-next-line no-console -- Understood
    console.error(
      `Failed to get network requests for tab ${String(tabId)}:`,
      error
    );
    return [];
  }
};
