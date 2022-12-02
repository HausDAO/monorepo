import BAAL from '../abi/baal.json';
import BAAL_SUMMONER from '../abi/baalSummoner.json';
import GNOSIS_MULTISEND from '../abi/gnosisMultisend.json';
import GNOSIS_PROXY from '../abi/gnosisProxy.json';
import GNOSIS_SIGNLIB from '../abi/gnosisSignLib.json';
import LOOT from '../abi/loot.json';
import POSTER from '../abi/poster.json';
import SHARES from '../abi/shares.json';
import SUPERFLUID_PROXY from '../abi/superFluidProxy.json';
import TRIBUTE_MINION from '../abi/tributeMinion.json';
import ERC20 from '../abi/erc20a.json';
import VAULT_SUMMONER from '../abi/vaultSummoner.json';
import GNOSIS_MODULE from '../abi/gnosisModule.json';

export const LOCAL_ABI = {
  BAAL,
  BAAL_SUMMONER,
  GNOSIS_MULTISEND,
  GNOSIS_MODULE,
  GNOSIS_PROXY,
  GNOSIS_SIGNLIB,
  LOOT,
  POSTER,
  SHARES,
  SUPERFLUID_PROXY,
  TRIBUTE_MINION,
  ERC20,
  VAULT_SUMMONER,
};
export type ContractABIKey = keyof typeof LOCAL_ABI;
