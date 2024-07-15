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
