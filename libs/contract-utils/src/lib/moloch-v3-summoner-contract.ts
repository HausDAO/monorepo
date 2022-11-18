import { ethers } from 'ethers';
import { BaalSummoner, BaalSummonerFactory } from '@daohaus/baal-contracts';
import { ContractNetworkConfig, SummonMolochV3Args } from './types';
import { encodeValues, getNonce } from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { getContractAddressesForChain } from './contract-meta';
import { encodeInitializationParams } from './encoding-utils';

export class MolochV3SummonerContract {
  summoner: BaalSummoner;
  networkId: ValidNetwork;
  private constructor(contractConfig: ContractNetworkConfig) {
    const summonerAddress = getContractAddressesForChain(
      'V3_FACTORY',
      contractConfig.networkId
    );

    if (!summonerAddress) throw 'Missing Contract Address';
    this.networkId = contractConfig.networkId;
    this.summoner = BaalSummonerFactory.connect(
      summonerAddress,
      contractConfig.provider
    );
  }

  static create({
    networkId,
    provider,
  }: ContractNetworkConfig): MolochV3SummonerContract {
    return new MolochV3SummonerContract({ networkId, provider });
  }

  /**
   * Deploy dao and safe contracts
   * @param initializationParams encoded share token name and symbol and forwarder (string, string, address)
   * @param initializationActions encoded functions with args called in summoning
   * * setAdminConfig(bool pauseShares, bool pauseLoot)
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
   * * mintShares(address[] calldata to, uint256[] calldata amount)
   * * minLoot(address[] calldata to, uint256[] calldata amount)
   * * metadata: post(string content, string tag)
   * @param _saltNonce any uint256
   */

  public async summonMolochV3AndSafe(
    args: SummonMolochV3Args
  ): Promise<ethers.ContractTransaction> {
    return await this.summoner.summonBaalAndSafe(
      encodeValues(
        ['string', 'string', 'address'],
        [args.sharesTokenName, args.sharesTokenSymbol, args.forwarder]
      ),
      encodeInitializationParams(args, this.networkId),
      getNonce()
    );
  }

  /**
   * Deploy dao with existing safe contracts
   * params the same as above with one extra in initializationParams
   * @param initializationParams encoded share token name and symbol and safe address and forwarder (string, string, address, address)
   * @param _saltNonce any uint256
   */
  public async summonMolochV3(
    args: SummonMolochV3Args
  ): Promise<ethers.ContractTransaction> {
    if (!args.safeAddress) throw 'Missing safe address';

    return await this.summoner.summonBaal(
      encodeValues(
        ['string', 'string', 'address', 'address'],
        [
          args.sharesTokenName,
          args.sharesTokenSymbol,
          args.safeAddress,
          args.forwarder,
        ]
      ),
      encodeInitializationParams(args, this.networkId),
      getNonce()
    );
  }
}
