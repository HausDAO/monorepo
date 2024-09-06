import { useQuery } from 'react-query';

import {
  ValidNetwork,
  Keychain,
  GRAPH_API_KEYS,
} from '@daohaus/keychain-utils';
import { listRecords } from '@daohaus/moloch-v3-data';
import { handleErrorMessage } from '@daohaus/utils';

const fetchRecords = async ({
  daoId,
  chainId,
  recordType,
  pageSize,
  offset,
  graphApiKeys,
  credentialType,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
  credentialType?: string;
}) => {
  try {
    const data = await listRecords({
      networkId: chainId,
      graphApiKeys: graphApiKeys,
      filter: { dao: daoId, table: recordType },
      paging: { pageSize, offset },
    });
    if (credentialType) {
      return data.items.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          item?.parsedContent?.credentialIdentifier === credentialType
      );
    }
    return data.items;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: 'Error fetching records' })
    );
  }
};

export const useRecords = ({
  daoId,
  chainId,
  recordType,
  pageSize = 20,
  offset = 0,
  graphApiKeys = GRAPH_API_KEYS,
  credentialType,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
  credentialType?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [credentialType || recordType, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId: daoId.toLowerCase(),
        chainId: chainId as ValidNetwork,
        recordType,
        pageSize,
        offset,
        graphApiKeys,
        credentialType,
      }),
    { enabled: !!daoId && !!chainId }
  );

  return { records: data, error: error as Error | null, ...rest };
};
