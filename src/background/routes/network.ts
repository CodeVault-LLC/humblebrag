import { generateMessage } from "../client/response";
import { getNetworkRequests } from "../handlers/network";
import { findCurrentTab } from "../lib/tab";
import { type Respond } from "../../types/route";

const NetworkRoute = async (respond: Respond): Promise<void> => {
  const tab = await findCurrentTab();
  if (!tab) {
    // eslint-disable-next-line no-console -- Safe
    console.error("No active tab found");
    return;
  }

  const networkRequests = await getNetworkRequests(tab.id ?? 0);

  respond(generateMessage("networks", networkRequests));
};

export { NetworkRoute };
