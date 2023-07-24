import { LOCAL_ABI } from '@daohaus/abis';
import { CONTRACT_KEYCHAINS } from '@daohaus/keychain-utils';
import { ContractLego, TXLego } from '@daohaus/utils';
import { MaxUint256 } from '@daohaus/utils';

const ERC_20_CONTRCT: ContractLego = {
  type: 'static',
  contractName: 'ERC20',
  abi: LOCAL_ABI.ERC20,
  targetAddress: '.tokenAddress',
};

export const APPROVE_TX: TXLego = {
  id: 'APPROVE_TOKEN',
  contract: ERC_20_CONTRCT,
  method: 'approve',
  args: [
    { type: 'singleton', keychain: CONTRACT_KEYCHAINS.TRIBUTE_MINION },
    { type: 'static', value: MaxUint256 },
  ],
};
