import { ENDPOINTS } from '../constants';
import { ValidNetwork } from '../types';

export const generateExplorerLink = ({
  chainId,
  address,
  type = 'address',
}: {
  chainId: ValidNetwork;
  address?: string;
  type?: string;
}) => `${ENDPOINTS['EXPLORER'][chainId]}/${type}/${address || ''}`;
