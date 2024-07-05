import { generateMessage } from "../client/response";
import { findCurrentTab } from "../lib/tab";
import { type Respond } from "../../../src/types/route";

const GlobalRoute = async (respond: Respond): Promise<void> => {
  const tab = await findCurrentTab();
  if (!tab) {
    // eslint-disable-next-line no-console -- Safe
    console.error("No active tab found");
    return;
  }

  const globals = {
    a: "a",
  };

  respond(generateMessage("globals", globals));
};

export { GlobalRoute };
