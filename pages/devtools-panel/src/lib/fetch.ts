/* eslint-disable no-console -- valid */
export const fetchScriptContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch script content from ${url}:`, error);
    return "";
  }
};
