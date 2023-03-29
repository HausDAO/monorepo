import { log } from '@graphprotocol/graph-ts';
import { Proposal } from '../generated/schema';
import { TributeProposal } from '../generated/TributeMinion/TributeMinion';
import { getErc20Decimals, getErc20Symbol } from './util/general';

export function handleTributeProposal(event: TributeProposal): void {
  const proposalId = event.params.baal
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposalId.toString());

  const proposal = Proposal.load(proposalId);
  if (proposal === null) {
    log.info('handleTributeProposal proposal not found, {}', [proposalId]);
    return;
  }

  proposal.tributeOffered = event.params.amount;
  proposal.tributeToken = event.params.token;
  proposal.tributeTokenSymbol = getErc20Symbol(event.params.token);
  proposal.tributeTokenDecimals = getErc20Decimals(event.params.token);
  proposal.tributeEscrowRecipient = event.params.recipient;

  proposal.save();
}
