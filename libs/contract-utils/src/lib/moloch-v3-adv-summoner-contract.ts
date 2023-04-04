import { ethers } from 'ethers';
import {
  BaalAdvTokenSummoner,
  BaalAdvTokenSummonerFactory,
} from '@daohaus/baal-contracts';
import { ContractNetworkConfig, SummonMolochV3Args } from './types';
import { encodeValues, getNonce, ZERO_ADDRESS } from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { getContractAddressesForChain } from './contract-meta';
import { encodeInitializationParamsAdvToken } from './encoding-utils';

export class MolochV3AdvTokenSummonerContract {
  summoner: BaalAdvTokenSummoner;
  networkId: ValidNetwork;
  private constructor(contractConfig: ContractNetworkConfig) {
    const summonerAddress = getContractAddressesForChain(
      'V3_FACTORY_ADV_TOKEN',
      contractConfig.networkId
    );

    if (!summonerAddress) throw 'Missing Contract Address';
    this.networkId = contractConfig.networkId;
    this.summoner = BaalAdvTokenSummonerFactory.connect(
      summonerAddress,
      contractConfig.provider
    );
  }

  static create({
    networkId,
    provider,
  }: ContractNetworkConfig): MolochV3AdvTokenSummonerContract {
    return new MolochV3AdvTokenSummonerContract({ networkId, provider });
  }

  /**
   * Deploy dao and safe contracts
   * @param _safeAdd The address of the Gnosis Safe to be used as the treausry, 0x0 if new Safe
   * @param _forwarderAddr The address of the forwarder to be used, 0x0 if not set
   * @param _saltNonce any uint256
   * @param initializationMintParams encoded params for minting shares (address[], uint256[], address[], uint256[])
   * @param initializationTokenParams encoded share token name and symbol, loot token name and symbol, share and loot token transferability (string, string, string, string, bool, bool)
   * @param postInitializationActions encoded functions with args called in summoning
   * * setGovernanceConfig (
            uint32 voting,
            uint32 grace,
            uint256 newOffering,
            uint256 quorum,
            uint256 sponsor,
            uint256 minRetention
        )
   * * setShamans(
        address[] calldata _shamans,
        uint256[] calldata _permissions
    )
   * * metadata: post(string content, string tag)
   * 
   */

  public async summonMolochV3(
    args: SummonMolochV3Args
  ): Promise<ethers.ContractTransaction> {
    return await this.summoner.summonBaalFromReferrer(
      args.safeAddress || ZERO_ADDRESS,
      args.forwarder || ZERO_ADDRESS,
      getNonce(),
      encodeValues(
        ['address[]', 'uint256[]', 'address[]', 'uint256[]'],
        [
          args.sharesConfig.to,
          args.sharesConfig.amount,
          args.lootConfig.to,
          args.lootConfig.amount,
        ]
      ),
      encodeValues(
        ['string', 'string', 'string', 'string', 'address', 'address'],
        [
          args.sharesTokenName,
          args.sharesTokenSymbol,
          args.lootTokenName || `${args.sharesTokenName}-LOOT`,
          args.lootTokenSymbol || `${args.sharesTokenSymbol}-LOOT`,
          args.tokenConfig.pauseShares,
          args.tokenConfig.pauseLoot,
        ]
      ),
      encodeInitializationParamsAdvToken(args, this.networkId)
    );
  }
}
