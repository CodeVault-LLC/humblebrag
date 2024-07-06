import type { Message } from "@humblebrag/shared/lib/types/message";
import { connection } from "@humblebrag/shared/lib/connection/frontend";

const logMessage = (message: string, args: unknown[] = []): void => {
  // eslint-disable-next-line no-console -- This is a valid console statement
  console.log(message, ...args);
};

connection.postMessage({ type: "scripts", method: "GET" });
connection.postMessage({ type: "networks", method: "GET" });
connection.postMessage({ type: "globals", method: "GET" });

connection.onMessage.addListener((msg: Message) => {
  logMessage("Received message from background script:", [msg]);
});

const getData = async (): Promise<unknown> => {
  const indexDB = await indexedDB.databases();
  const indexDatabaseInformation = await Promise.all(
    indexDB.map(async (db) => {
      return new Promise((resolve) => {
        const openRequest = indexedDB.open(String(db.name));

        openRequest.onsuccess = () => {
          const dbInstance = openRequest.result;
          const objectStoreNames = Array.from(dbInstance.objectStoreNames);
          const objectStores = objectStoreNames.map((storeName) => {
            const transaction = dbInstance.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            return new Promise((storeResolve) => {
              const getAllRequest = store.getAll();
              getAllRequest.onsuccess = () => {
                storeResolve({
                  name: storeName,
                  data: getAllRequest.result,
                });
              };
              getAllRequest.onerror = () => {
                storeResolve({
                  name: storeName,
                  data: null,
                });
              };
            });
          });

          // Resolve the promise with the object stores data
          void Promise.all(objectStores).then((storesData) => {
            resolve({
              name: db.name,
              version: db.version,
              stores: storesData,
            });
          });
        };

        openRequest.onerror = () => {
          resolve({
            name: db.name,
            version: db.version,
            stores: [],
          });
        };
      });
    })
  );

  const globals = {
    navigator: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency,
    },

    location: {
      href: location.href,
      origin: location.origin,
      protocol: location.protocol,
      host: location.host,
      hostname: location.hostname,
      port: location.port,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },

    document: {
      title: document.title,
      referrer: document.referrer,
      lastModified: document.lastModified,
      readyState: document.readyState,
    },

    window: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      devicePixelRatio: window.devicePixelRatio,
    },

    localStorage: {
      length: localStorage.length,
      data: Object.keys(localStorage).map((key) => ({
        key,
        value: localStorage.getItem(key),
      })),
    },

    sessionStorage: {
      length: sessionStorage.length,
      data: Object.keys(sessionStorage).map((key) => ({
        key,
        value: sessionStorage.getItem(key),
      })),
    },

    indexedDB: indexDatabaseInformation,

    cookies: {
      cookies: document.cookie,
    },

    mimeTypes: {
      mimeTypes: Array.from(navigator.mimeTypes).map((mimeType) => ({
        type: mimeType.type,
        description: mimeType.description,
        suffixes: mimeType.suffixes,
      })),
    },

    webRTC: {
      RTCPeerConnection: typeof RTCPeerConnection,
      RTCDataChannel: typeof RTCDataChannel,
      RTCIceCandidate: typeof RTCIceCandidate,
      RTCSessionDescription: typeof RTCSessionDescription,
    },

    webGL: {
      webGLRenderingContext: typeof WebGLRenderingContext,
      webGL2RenderingContext: typeof WebGL2RenderingContext,
    },

    webAudio: {
      audioContext: typeof AudioContext,
      audioNode: typeof AudioNode,
      audioParam: typeof AudioParam,
    },
  };
  return globals;
};

void getData().then((data) => {
  logMessage("Data collection complete:", [data]);
});

const injectScript = (): void => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("injected/index.iife.js");
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is a valid check
  (document.head || document.documentElement).appendChild(script);

  script.onload = () => {
    // eslint-disable-next-line no-console -- This is a valid console statement
    console.log(`
      __ __              __
     / // / ___ _ ____  / /__
    / _  / / _ \`// __/ /  '_/
   /_//_/  \\_,_/ \\__/ /_/\\_\\
    `);
  };
};

injectScript();
