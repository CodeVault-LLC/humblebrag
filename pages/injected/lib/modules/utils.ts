/**
 * Get the information about the function.
 * @param func - The function to get the information about.
 * @returns The information about the function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types -- This is a valid use case
export const getInformation = (func: Function): string => {
  if (func.toString().includes("[native code]")) {
    return "This function is yet to be implemented - Native function.";
  } else if (func.toString().includes("Command Line API")) {
    return "This function is yet to be implemented - Command Line API.";
  }
  return "This is a custom function.";
};

export const getBrowser = (): string => {
  if (navigator.userAgent.includes("Chrome")) {
    return "Chrome";
  } else if (navigator.userAgent.includes("Opera")) {
    return "Opera";
  } else if (navigator.userAgent.includes("MSIE")) {
    return "IE";
  } else if (navigator.userAgent.includes("Firefox")) {
    return "Firefox";
  }
  return "Unknown";
};
