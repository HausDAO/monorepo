import { ENDPOINTS } from './endpoints';
import { ValidNetwork } from '../keychains';

export const generateExplorerLink = ({
  chainId,
  address,
  type = 'address',
}: {
  chainId: ValidNetwork;
  address?: string;
  type?: string;
}) => `${ENDPOINTS.EXPLORER[chainId]}/${type}/${address || ''}`;
