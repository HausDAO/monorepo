import { LOCAL_ABI } from '@daohaus/abis';
import { ContractLego, CONTRACT_KEYCHAINS } from '@daohaus/utils';

const BaalSummonerContract: ContractLego = {
  contractName: 'BaalSummoner',
  type: 'static',
  abi: LOCAL_ABI.BAAL_SUMMONER,
  targetAddress: CONTRACT_KEYCHAINS.V3_FACTORY,
};

export const SummonTX = {
  id: 'SummonTX',
  contract: BaalSummonerContract,
  method: 'summonBaalAndSafe',
};
