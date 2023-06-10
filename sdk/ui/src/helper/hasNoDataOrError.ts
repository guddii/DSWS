export const hasNoDataOrError = <T>(
  data: T | undefined,
  error: Error | undefined
): data is undefined => {
  return !data || !!error;
};
