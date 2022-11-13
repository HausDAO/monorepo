import { ENDPOINTS } from '../keychains';
import { ValidNetwork } from '../keychains';

export const generateGnosisUiLink = ({
  chainId,
  address,
}: {
  chainId: ValidNetwork;
  address?: string;
}) => `${ENDPOINTS['GNOSIS_SAFE_UI'][chainId]}:${address}/balances`;
