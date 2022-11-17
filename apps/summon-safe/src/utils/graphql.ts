import { ValidNetwork } from '@daohaus/keychain-utils';
import { Haus } from '@daohaus/moloch-v3-data';

export const fetchDaos = async (
  networkId: ValidNetwork,
  safeAddress: string
) => {
  const haus = Haus.create({
    graphApiKeys: {
      '0x1': process.env.NX_GRAPH_API_KEY_MAINNET,
    },
  });
  const query = await haus.query.listDaos({
    networkId,
    filter: { safeAddress },
  });
  if (query.error) {
    console.error('An error has occurred', query.error);
  }
  return query.items;
};
