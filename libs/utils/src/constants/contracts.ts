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

export const NETWORK_TOKEN_ETH_ADDRESS =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

// https://github.com/HausDAO/Baal#addresses-beta-factories-and-templates

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
