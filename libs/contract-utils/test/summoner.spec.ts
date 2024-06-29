import { ethers } from 'ethers';
import MolochV3SummonerContract from '../src/lib/moloch-v3-summoner-contract';

describe('baal contract loads', () => {
  let summoner: MolochV3SummonerContract;

  beforeAll(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://12345.goerli.rpc.rivet.cloud`
    );
    summoner = await MolochV3SummonerContract.create({
      networkId: '0x1',
      provider,
    });
  });

  it('should exist', () => {
    expect(summoner).toBeDefined();
  });
});
