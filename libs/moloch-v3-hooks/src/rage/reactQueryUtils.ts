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
