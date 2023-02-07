export const daoScopedQueryId = ({
  daoId,
  daoChain,
  domain,
}: {
  daoId?: string;
  daoChain?: string;
  domain: string;
}) => {
  return `${daoChain}-${daoId}-${domain}`;
};
export const checkContextDefault = <T>(
  key: string,
  defaultValue: T,
  contextGetter?: (key: string) => T
) => {
  if (!contextGetter) return defaultValue;
  const contextValue = contextGetter(key) as T | undefined;

  return contextValue || defaultValue;
};
