import { ENDPOINTS } from '../constants';
import { ValidNetwork } from '../types';

export const generateGnosisUiLink = ({
  chainId,
  address,
}: {
  chainId: ValidNetwork;
  address?: string;
}) => `${ENDPOINTS['GNOSIS_SAFE_UI'][chainId]}:${address}/balances`;
