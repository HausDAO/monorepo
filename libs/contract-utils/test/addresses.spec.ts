import { getContractAddressesForChain } from '../src/lib/contract-meta';

describe('baal contract loads', () => {
  // eslint-disable-next-line
  let contracts: any;

  beforeAll(() => {
    /* prettier-ignore */
    contracts = {
      posterAddress: getContractAddressesForChain('POSTER', '0x64'),
      gnosisMultisendAddress: getContractAddressesForChain('GNOSIS_MULTISEND','0x64'),
      baalSummonerAddress: getContractAddressesForChain('V3_FACTORY_ADV_TOKEN', '0x64'),
      tributeMinionAddress: getContractAddressesForChain('TRIBUTE_MINION','0x64'),
    }
  });

  it('should include contracts of the chainId', () => {
    expect(contracts.posterAddress).toBeDefined();
    expect(contracts.gnosisMultisendAddress).toBeDefined();
    expect(contracts.baalSummonerAddress).toBeDefined();
    expect(contracts.tributeMinionAddress).toBeDefined();
  });
});
