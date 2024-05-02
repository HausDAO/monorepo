import { GRAPH_API_KEYS, ValidNetwork } from '@daohaus/keychain-utils';
import { listDaos } from '@daohaus/moloch-v3-data';

export const fetchDaos = async (
  networkId: ValidNetwork,
  safeAddress: string
) => {
  const query = await listDaos({
    networkId,
    filter: { safeAddress },
    graphApiKeys: GRAPH_API_KEYS,
  });
  if (query.error) {
    console.error('An error has occurred', query.error);
  }
  return query.items;
};
