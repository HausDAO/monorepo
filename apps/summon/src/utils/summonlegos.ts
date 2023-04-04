import { LOCAL_ABI } from '@daohaus/abis';
import { ContractLego } from '@daohaus/utils';
import { CONTRACT_KEYCHAINS } from '@daohaus/keychain-utils';

const BaalSummonerContract: ContractLego = {
  contractName: 'BaalSummoner',
  type: 'static',
  abi: LOCAL_ABI.BAAL_ADV_TOKEN_SUMMONER,
  targetAddress: CONTRACT_KEYCHAINS.V3_FACTORY_ADV_TOKEN,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalSummonerContract,
  method: 'summonBaalFromReferrer',
};
