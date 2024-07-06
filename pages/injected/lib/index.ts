/* eslint-disable @typescript-eslint/no-confusing-void-expression -- We understand it*/
/* eslint-disable no-console -- Its ok */
import {
  displayDOMTree,
  getBrowser,
  getCookies,
  getInformation,
  getLocalStorage,
  getSessionStorage,
} from "./modules";

// eslint-disable-next-line @typescript-eslint/ban-types -- This is a valid use case
window.information = (func: Function) => {
  return {
    data: getInformation(func),
    type: "text",
  };
};

window.getCookies = () => {
  return {
    data: getCookies(),
    type: "table",
  };
};

window.logLocalStorage = () => {
  return {
    data: getLocalStorage(),
    type: "table",
  };
};
window.logSessionStorage = () => {
  return {
    data: getSessionStorage(),
    type: "table",
  };
};

window.showDOMTree = (element: Element) => {
  displayDOMTree(element);
  return {
    data: "DOM tree displayed in console",
    type: "dir",
  };
};

window.getBrowser = () => {
  return {
    data: getBrowser(),
    type: "text",
  };
};
