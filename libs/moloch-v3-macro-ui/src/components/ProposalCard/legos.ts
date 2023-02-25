import { LOCAL_ABI } from '@daohaus/abis';
import { ContractLego, TXLegoBase } from '@daohaus/utils';

export const CONTRACT: Record<string, ContractLego> = {
  CURRENT_DAO: {
    type: 'static',
    contractName: 'Current DAO (Baal)',
    abi: LOCAL_ABI.BAAL,
    targetAddress: '.daoId',
  },
};

export const ACTION_TX: Record<string, TXLegoBase> = {
  SPONSOR: {
    id: 'SPONSOR',
    contract: CONTRACT.CURRENT_DAO,
    method: 'sponsorProposal',
  },
  VOTE: {
    id: 'VOTE',
    contract: CONTRACT.CURRENT_DAO,
    method: 'submitVote',
  },
  PROCESS: {
    id: 'PROCESS',
    contract: CONTRACT.CURRENT_DAO,
    method: 'processProposal',
  },
  CANCEL: {
    id: 'CANCEL',
    contract: CONTRACT.CURRENT_DAO,
    method: 'cancelProposal',
  },
};
