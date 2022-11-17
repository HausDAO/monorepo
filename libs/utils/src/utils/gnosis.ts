import { ENDPOINTS, ValidNetwork } from '@daohaus/keychain-utils';

export const generateGnosisUiLink = ({
  chainId,
  address,
}: {
  chainId: ValidNetwork;
  address?: string;
}) => `${ENDPOINTS['GNOSIS_SAFE_UI'][chainId]}:${address}/balances`;
