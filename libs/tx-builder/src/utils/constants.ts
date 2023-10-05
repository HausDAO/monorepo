import { JSONDetailsSearch } from '@daohaus/utils';
import { LOCAL_ABI } from '@daohaus/abis';

export const EXPIRY = '.proposalExpiry';
export const FORM = '.formValues';
export const CURRENT_DAO = '.daoId';
export const gasBufferMultiplier = 5;
export const BaalContractBase = {
  type: 'local',
  contractName: 'Baal',
  abi: LOCAL_ABI.BAAL,
};

export const basicDetails: JSONDetailsSearch = {
  type: 'JSONDetails',
  jsonSchema: {
    title: '.formValues.title',
    description: '.formValues.description',
    proposalType: { type: 'static', value: 'Multicall Proposal' },
  },
};
