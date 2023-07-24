import {
  arbitrum,
  mainnet,
  polygon,
  gnosis,
  goerli,
  optimism,
  Chain,
} from 'wagmi/chains';
import { Keychain } from './types';

export const VIEM_CHAINS: Keychain<Chain> = {
  '0x1': mainnet,
  '0x5': goerli,
  '0x64': gnosis,
  '0x89': polygon,
  '0xa': optimism,
  '0xa4b1': arbitrum,
};
