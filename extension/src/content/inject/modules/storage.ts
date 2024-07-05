export const getCookies = (): { name: string; value: string }[] => {
  return document.cookie.split("; ").map((cookie) => {
    const [name, value] = cookie.split("=");
    return {
      name,
      value,
    };
  });
};

export const getLocalStorage = (): { key: string; value: string }[] => {
  return Object.keys(localStorage).map((key) => ({
    key,
    value: localStorage.getItem(key) ?? "",
  }));
};

export const getSessionStorage = (): { key: string; value: string }[] => {
  return Object.keys(sessionStorage).map((key) => ({
    key,
    value: sessionStorage.getItem(key) ?? "",
  }));
};
