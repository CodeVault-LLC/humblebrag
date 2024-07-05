export const findCurrentTab: () => Promise<
  chrome.tabs.Tab | undefined
> = async () => {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        resolve(tabs[0]);
      }
    );
  });
};
