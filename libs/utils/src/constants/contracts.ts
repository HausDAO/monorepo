import { ValidNetwork } from '..';

export type ContractKey =
  | 'V3_FACTORY'
  | 'LOOT_SINGLETON'
  | 'SHARES_SINGLETON'
  | 'BAAL_SINGLETON'
  | 'GNOSIS_MULTISEND'
  | 'GNOSIS_SIGNLIB'
  | 'TRIBUTE_MINION'
  | 'POSTER';

export type AddressKeyChain = { [key in ValidNetwork]?: string };
export type ContractAddressList = Record<ContractKey, AddressKeyChain>;

export const NETWORK_TOKEN_ETH_ADDRESS =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

// https://github.com/HausDAO/Baal#addresses-beta-factories-and-templates
export const CONTRACTS: ContractAddressList = {
  V3_FACTORY: {
    '0x1': '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
    '0x5': '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
    '0x64': '0xf020a55794DB5e065692F86a0Eb82197850a09b9',
  },
  LOOT_SINGLETON: {
    '0x1': '0xacD725Cf8906dAD85Fda40a0D621DCE2C1F99563',
    '0x5': '0xacD725Cf8906dAD85Fda40a0D621DCE2C1F99563',
    '0x64': '0xacD725Cf8906dAD85Fda40a0D621DCE2C1F99563',
  },
  SHARES_SINGLETON: {
    '0x1': '0xADC05EFd6fC78028901deF7C2AC6f61AF0E4C8fb',
    '0x5': '0xADC05EFd6fC78028901deF7C2AC6f61AF0E4C8fb',
    '0x64': '0xADC05EFd6fC78028901deF7C2AC6f61AF0E4C8fb',
  },
  BAAL_SINGLETON: {
    '0x1': '0xAce0A31d08671CE10a7c8232B14Dc5Ef6CD63534',
    '0x5': '0xAce0A31d08671CE10a7c8232B14Dc5Ef6CD63534',
    '0x64': '0xAce0A31d08671CE10a7c8232B14Dc5Ef6CD63534',
  },
  GNOSIS_MULTISEND: {
    '0x1': '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
    '0x5': '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
    '0x64': '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  },
  GNOSIS_SIGNLIB: {
    '0x1': '0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2',
    '0x5': '0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2',
    '0x64': '0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2',
  },
  TRIBUTE_MINION: {
    '0x1': '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
    '0x5': '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
    '0x64': '0x5c17BFBaB751C5ddF1Ff267acF8fF919537F39Cf',
  },
  POSTER: {
    '0x1': '0x000000000000cd17345801aa8147b8d3950260ff',
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
    '0x64': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
};

export const SHAMAN_PERMISSIONS = [
  {
    id: '0',
    displayName: '0 - No permission',
  },
  {
    id: '1',
    displayName: '1 - Admin only',
  },
  {
    id: '2',
    displayName: '2 - Manager only',
  },
  {
    id: '3',
    displayName: '3 - Admin and manager',
  },
  {
    id: '4',
    displayName: '4 - Governance only',
  },
  {
    id: '5',
    displayName: '5 - Admin and governance',
  },
  {
    id: '6',
    displayName: '6 - Manager and governance',
  },
  {
    id: '7',
    displayName: '7 - Admin, manager and governance',
  },
];
