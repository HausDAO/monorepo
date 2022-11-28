import { ethers } from 'ethers';
import { BaalSummoner, BaalSummonerFactory } from '@daohaus/baal-contracts';
import { ContractNetworkConfig, SummonMolochV3Args } from './types';
import {
  DAOHAUS_CONTRACT_UTILS_REFERRER,
  encodeValues,
  getNonce,
  ZERO_ADDRESS,
} from '@daohaus/utils';
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
   * @param initializationParams encoded share token name and symbol and forwarder, safeAddress, shareToken address (string, string, address, address, address)
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

  public async summonMolochV3(
    args: SummonMolochV3Args
  ): Promise<ethers.ContractTransaction> {
    return await this.summoner.summonBaalFromReferrer(
      encodeValues(
        ['string', 'string', 'address', 'address', 'address', 'address'],
        [
          args.sharesTokenName,
          args.sharesTokenSymbol,
          args.safeAddress || ZERO_ADDRESS,
          args.forwarder || ZERO_ADDRESS,
          args.lootToken || ZERO_ADDRESS,
          args.sharesToken || ZERO_ADDRESS,
        ]
      ),
      encodeInitializationParams(args, this.networkId),
      getNonce(),
      DAOHAUS_CONTRACT_UTILS_REFERRER
    );
  }
}
