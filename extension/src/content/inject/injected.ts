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
window.information = (func: Function) => getInformation(func);

window.getCookies = () => console.table(getCookies());
window.logLocalStorage = () => console.table(getLocalStorage());
window.logSessionStorage = () => console.table(getSessionStorage());

window.showDOMTree = (element: Element) => console.dir(displayDOMTree(element));

window.getBrowser = () => console.log(getBrowser());
