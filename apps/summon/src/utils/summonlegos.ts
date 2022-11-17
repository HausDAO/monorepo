import { LOCAL_ABI } from '@daohaus/abis';
import { ContractLego, CONTRACTS } from '@daohaus/utils';

const BaalSummonerContract: ContractLego = {
  contractName: 'BaalSummoner',
  type: 'static',
  abi: LOCAL_ABI.BAAL_SUMMONER,
  targetAddress: CONTRACTS.V3_FACTORY,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalSummonerContract,
  method: 'summonBaalFromReferrer',
};
