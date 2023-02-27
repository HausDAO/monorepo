import { ValidNetwork } from '@daohaus/keychain-utils';
import { listDaos } from '@daohaus/moloch-v3-data';

export const fetchDaos = async (
  networkId: ValidNetwork,
  safeAddress: string
) => {
  const query = await listDaos({
    networkId,
    filter: { safeAddress },
    graphApiKeys: {
      '0x1': process.env.NX_GRAPH_API_KEY_MAINNET,
      '0x64': process.env.NX_GRAPH_API_KEY_MAINNET,
    },
  });
  if (query.error) {
    console.error('An error has occurred', query.error);
  }
  return query.items;
};
