interface Window {
  // eslint-disable-next-line @typescript-eslint/ban-types -- This is a valid use case
  information: (func: Function) => string;

  getCookies: () => void;
  logLocalStorage: () => void;
  logSessionStorage: () => void;
  showDOMTree: (elementSelector: Element) => void;

  logEventListeners: (elementSelector: Element) => void;
  fetchNetworkLogs: () => Promise<unknown>;

  getBrowser: () => void;
  getEventListeners: (element: Element) => unknown;
}
