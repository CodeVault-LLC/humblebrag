import { CusResponse } from "@humblebrag/shared/lib/injection/inject";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types -- This is a valid use case
    information: (func: Function) => CusResponse;

    getCookies: () => CusResponse;
    logLocalStorage: () => CusResponse;
    logSessionStorage: () => CusResponse;
    showDOMTree: (elementSelector: Element) => CusResponse;

    logEventListeners: (elementSelector: Element) => CusResponse;
    fetchNetworkLogs: () => Promise<unknown>;

    getBrowser: () => CusResponse;
    getEventListeners: (element: Element) => unknown;
  }
}
