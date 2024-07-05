export const regexHandler = (message: string, regex: RegExp) => {
  const matches = message.match(regex);
  return matches ? matches : [];
};
