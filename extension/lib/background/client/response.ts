export const generateMessage = (
  type: string,
  data: unknown
): {
  type: string;
  data: unknown;
  sentAt: string;
} => {
  return {
    type,
    data,
    sentAt: new Date().toISOString(),
  };
};
