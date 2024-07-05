import { Router } from "./routes/route";

chrome.runtime.onConnect.addListener((port) => {
  // eslint-disable-next-line no-new -- This is a valid use case
  new Router(port);
});
