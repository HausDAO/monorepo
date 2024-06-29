import {
  arbitrum,
  mainnet,
  polygon,
  gnosis,
  optimism,
  base,
  sepolia,
  Chain,
} from 'wagmi/chains';
import { Keychain } from './types';

export const VIEM_CHAINS: Keychain<Chain> = {
  '0x1': mainnet,
  '0x64': gnosis,
  '0x89': polygon,
  '0xa': optimism,
  '0xa4b1': arbitrum,
  '0xaa36a7': sepolia,
  '0x2105': base,
};
