import {
  Baal,
  BaalFactory,
  Loot,
  LootFactory,
  Shares,
  SharesFactory,
} from '@daohaus/baal-contracts';
import { ethers } from 'ethers';
import { getContractAbi } from './contract-meta';
import { encodeFunctionWrapper } from './encoding-utils';
import { estimateGasSafeApi, gasEstimateFromActions } from './estimate-util';
import {
  ContractConfig,
  ProcessProposalArgs,
  SubmitProposalArgs,
} from './types';

export class MolochV3Contract {
  public molochV3: Baal;
  public shares: Shares;
  public loot: Loot;

  private constructor(
    molochV3Contract: Baal,
    sharesContract: Shares,
    lootContract: Loot
  ) {
    this.molochV3 = molochV3Contract;
    this.shares = sharesContract;
    this.loot = lootContract;
  }

  static async create({
    address,
    provider,
  }: ContractConfig): Promise<MolochV3Contract> {
    const molochV3Contract = BaalFactory.connect(address, provider);
    const sharesAddress = await molochV3Contract.sharesToken();
    const lootAddress = await molochV3Contract.lootToken();
    const sharesContract = SharesFactory.connect(sharesAddress, provider);
    const lootContract = LootFactory.connect(lootAddress, provider);

    return new MolochV3Contract(molochV3Contract, sharesContract, lootContract);
  }

  /**
   * Submit proposal
   * @param proposalActions array of action parameters - to address, value, operation, abi, function name, function args
   * @param expiration epoch time in seconds for when the proposal will expire, 0 for no expiration
   * @param baalGas esitmated gas limit for executing the above actions
   * @param details Context for proposal.
   */
  public async submitProposal(args: SubmitProposalArgs) {
    const multisendAbi = getContractAbi('GNOSIS_MULTISEND');

    if (!multisendAbi) throw 'missing multisend abi';

    const proposalData = args.proposalActions.map((action) => {
      return {
        to: action.to,
        value: action.value,
        operation: action.operation,
        data: encodeFunctionWrapper(
          action.abi,
          action.fnName,
          action.functionArgs
        ),
      };
    });
    

    const encodedActions = encodeFunctionWrapper(
      multisendAbi,
      'multiSend',
      proposalData
    );

    let estimate = args.baalGas;
    if (!estimate) {
      estimate = await gasEstimateFromActions({
        actions: proposalData,
        chainId: args.networkId,
        safeId: await this.molochV3.avatar(),
      });
    }

    return await this.molochV3.submitProposal(
      encodedActions,
      args.expiration,
      estimate || '0',
      args.details,
      args.overrides
    );
  }

  /**
   * Process/execute proposal
   * @param id uint256 id of the proposal
   * @param proposalData Multisend encoded transactions or proposal data
   */
  public async processProposal(args: ProcessProposalArgs) {
    const proposal = await this.molochV3.proposals(args.id);
    const overrides = args.overrides || {};
    if (proposal[6] !== ethers.BigNumber.from('0')) {
      overrides.gasLimit = proposal[6];
    }
    return await this.molochV3.processProposal(
      args.id,
      args.proposalData,
      overrides
    );
  }
}
