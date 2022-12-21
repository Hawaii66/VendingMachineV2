export const VerifyQuery = (query: string | string[] | undefined) => {
  if (query?.toString() !== query || query === undefined) {
    return "";
  }

  return query;
};
