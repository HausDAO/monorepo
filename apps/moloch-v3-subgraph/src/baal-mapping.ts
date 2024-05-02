import { Address, Bytes, log } from '@graphprotocol/graph-ts';
import {
  Dao,
  Proposal,
  RageQuit,
  Record,
  Shaman,
  Vote,
} from '../generated/schema';

import {
  CancelProposal,
  GovernanceConfigSet,
  LootPaused,
  ProcessProposal,
  Ragequit,
  SetupComplete,
  ShamanSet,
  SharesPaused,
  SponsorProposal,
  SubmitProposal,
  SubmitVote,
  LockAdmin,
  LockGovernor,
  LockManager,
} from '../generated/templates/BaalTemplate/Baal';
import { constants } from './util/constants';
import { getResultFromJson, getStringFromJson } from './util/parser';
import { addTransaction } from './util/transactions';

export function handleSetupComplete(event: SetupComplete): void {
  const daoId = event.address.toHexString();

  let dao = Dao.load(daoId);
  if (dao === null) {
    dao = new Dao(daoId);
  }

  dao.lootPaused = event.params.lootPaused;
  dao.sharesPaused = event.params.sharesPaused;
  dao.gracePeriod = event.params.gracePeriod;
  dao.votingPeriod = event.params.votingPeriod;
  dao.votingPlusGraceDuration = event.params.votingPeriod.plus(
    event.params.gracePeriod
  );
  dao.proposalOffering = event.params.proposalOffering;
  dao.quorumPercent = event.params.quorumPercent;
  dao.sponsorThreshold = event.params.sponsorThreshold;
  dao.minRetentionPercent = event.params.minRetentionPercent;
  dao.shareTokenName = event.params.name;
  dao.shareTokenSymbol = event.params.symbol;
  dao.totalShares = event.params.totalShares;
  dao.totalLoot = event.params.totalLoot;

  const daoProfile = Record.load(daoId.concat('-record-summon'));
  if (daoProfile) {
    const result = getResultFromJson(daoProfile.content);
    if (result.error != 'none') {
      log.error('no content', []);
      return;
    }
    const object = result.object;

    const name = getStringFromJson(object, 'name');

    dao.name = name.data;
  }

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

// GovernanceConfigSet (uint32 voting, uint32 grace, uint256 newOffering, uint256 quorum, uint256 sponsor, uint256 minRetention)
export function handleGovernanceConfigSet(event: GovernanceConfigSet): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.votingPeriod = event.params.voting;
  dao.gracePeriod = event.params.grace;
  dao.votingPlusGraceDuration = event.params.voting.plus(event.params.grace);
  dao.proposalOffering = event.params.newOffering;
  dao.quorumPercent = event.params.quorum;
  dao.sponsorThreshold = event.params.sponsor;
  dao.minRetentionPercent = event.params.minRetention;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

// ShamanSet (index_topic_1 address shaman, uint256 permission)
export function handleShamanSet(event: ShamanSet): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  const shamanId = event.address
    .toHexString()
    .concat('-shaman-')
    .concat(event.params.shaman.toHexString());

  let shaman = Shaman.load(shamanId);
  if (shaman === null) {
    shaman = new Shaman(shamanId);
    shaman.createdAt = event.block.timestamp;
    shaman.dao = event.address.toHexString();
    shaman.shamanAddress = event.params.shaman;
  }

  shaman.permissions = event.params.permission;

  shaman.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSharesPaused(event: SharesPaused): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.sharesPaused = event.params.paused;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleLootPaused(event: LootPaused): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.lootPaused = event.params.paused;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSubmitProposal(event: SubmitProposal): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  const proposalId = event.address
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposal.toString());

  const proposerId = dao.id
    .concat('-member-')
    .concat(event.transaction.from.toHexString());

  const proposal = new Proposal(proposalId);
  proposal.createdAt = event.block.timestamp;
  proposal.createdBy = event.transaction.from;
  proposal.proposedBy =
    event.transaction.to === null ||
    event.address.toHexString() ==
      (event.transaction.to as Address).toHexString()
      ? event.transaction.from
      : event.transaction.to;
  proposal.proposerMembership = proposerId;
  proposal.txHash = event.transaction.hash;
  proposal.dao = event.address.toHexString();
  proposal.proposalId = event.params.proposal;
  proposal.proposalDataHash = event.params.proposalDataHash;
  proposal.proposalData = event.params.proposalData;
  proposal.votingPeriod = event.params.votingPeriod;
  proposal.gracePeriod = dao.gracePeriod;
  proposal.votingPlusGraceDuration = event.params.votingPeriod.plus(
    dao.gracePeriod
  );
  proposal.expiration = event.params.expiration;
  proposal.expirationQueryField =
    event.params.expiration === constants.BIGINT_ZERO
      ? constants.FUTURE_TIMESTAMP
      : event.params.expiration;
  proposal.actionGasEstimate = event.params.baalGas;
  proposal.cancelled = false;
  proposal.processed = false;
  proposal.actionFailed = false;
  proposal.passed = false;
  proposal.currentlyPassing = false;
  proposal.proposalOffering = event.transaction.value;
  proposal.maxTotalSharesAndLootAtYesVote = constants.BIGINT_ZERO;
  proposal.maxTotalSharesAtYesVote = constants.BIGINT_ZERO;
  proposal.sponsored = event.params.selfSponsor;
  proposal.selfSponsor = event.params.selfSponsor;
  proposal.sponsorTxHash = event.params.selfSponsor
    ? event.transaction.hash
    : null;
  proposal.sponsorTxAt = event.params.selfSponsor
    ? event.block.timestamp
    : null;
  proposal.sponsor = event.params.selfSponsor ? event.transaction.from : null;
  proposal.sponsorMembership = event.params.selfSponsor ? proposerId : null;
  proposal.quorumPercentAtSponsor = event.params.selfSponsor
    ? dao.totalShares
    : null;
  proposal.prevProposalId = event.params.selfSponsor
    ? dao.latestSponsoredProposalId
    : constants.BIGINT_ZERO;
  proposal.votingStarts = event.params.selfSponsor
    ? event.block.timestamp
    : constants.BIGINT_ZERO;
  proposal.votingEnds = event.params.selfSponsor
    ? event.block.timestamp.plus(event.params.votingPeriod)
    : constants.BIGINT_ZERO;
  proposal.graceEnds = event.params.selfSponsor
    ? event.block.timestamp
        .plus(event.params.votingPeriod)
        .plus(dao.gracePeriod)
    : constants.BIGINT_ZERO;
  proposal.yesVotes = constants.BIGINT_ZERO;
  proposal.yesBalance = constants.BIGINT_ZERO;
  proposal.noVotes = constants.BIGINT_ZERO;
  proposal.noBalance = constants.BIGINT_ZERO;

  proposal.details = event.params.details;
  const result = getResultFromJson(event.params.details);
  if (result.error != 'none') {
    log.error('details parse error prop: {}', [proposalId]);
    proposal.details = event.params.details;
  } else {
    const object = result.object;

    const title = getStringFromJson(object, 'title');
    if (title.error == 'none') {
      proposal.title = title.data;
    }

    const description = getStringFromJson(object, 'description');
    if (description.error == 'none') {
      proposal.description = description.data;
    }

    const proposalType = getStringFromJson(object, 'proposalType');
    if (proposalType.error == 'none') {
      proposal.proposalType = proposalType.data;
    } else {
      proposal.proposalType = 'unknown';
    }

    const contentURI = getStringFromJson(object, 'contentURI');
    if (contentURI.error == 'none') {
      proposal.contentURI = contentURI.data;
    }

    const contentURIType = getStringFromJson(object, 'contentURIType');
    if (contentURIType.error == 'none') {
      proposal.contentURIType = contentURIType.data;
    }

    const relatedRecordId = getStringFromJson(object, 'relatedRecordId');
    if (relatedRecordId.error == 'none') {
      proposal.record = relatedRecordId.data;
    }
  }

  proposal.save();

  if (event.params.selfSponsor) {
    dao.latestSponsoredProposalId = event.params.proposal;
  }
  dao.proposalCount = dao.proposalCount.plus(constants.BIGINT_ONE);
  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSponsorProposal(event: SponsorProposal): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  const proposalId = event.address
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposal.toString());

  const proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  const sponsorId = dao.id
    .concat('-member-')
    .concat(event.params.member.toHexString());

  proposal.sponsor = event.params.member;
  proposal.sponsorMembership = sponsorId;
  proposal.sponsored = true;
  proposal.votingStarts = event.block.timestamp;
  proposal.votingEnds = event.block.timestamp.plus(dao.votingPeriod);
  proposal.graceEnds = event.block.timestamp
    .plus(dao.votingPeriod)
    .plus(dao.gracePeriod);
  proposal.prevProposalId = dao.latestSponsoredProposalId;
  proposal.sponsorTxHash = event.transaction.hash;
  proposal.sponsorTxAt = event.block.timestamp;
  proposal.quorumPercentAtSponsor = dao.totalShares;

  dao.latestSponsoredProposalId = event.params.proposal;

  proposal.save();
  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleProcessProposal(event: ProcessProposal): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  const proposalId = event.address
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposal.toString());

  const proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.processTxHash = event.transaction.hash;
  proposal.processTxAt = event.block.timestamp;
  proposal.processedBy = event.transaction.from;
  proposal.processed = true;
  proposal.passed = event.params.passed;
  proposal.actionFailed = event.params.actionFailed;
  proposal.blockNumberAtExecution = event.block.number;

  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleCancelProposal(event: CancelProposal): void {
  const proposalId = event.address
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposal.toString());

  const proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.cancelledTxHash = event.transaction.hash;
  proposal.cancelledTxAt = event.block.timestamp;
  proposal.cancelledBy = event.transaction.from;
  proposal.cancelled = true;

  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSubmitVote(event: SubmitVote): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  const proposalId = event.address
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposal.toString());

  const proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  const voteId = event.address
    .toHexString()
    .concat('-proposal-')
    .concat(event.params.proposal.toHexString())
    .concat('-vote-')
    .concat(event.params.member.toHexString());

  const vote = new Vote(voteId);

  vote.createdAt = event.block.timestamp;
  vote.daoAddress = event.address;
  vote.approved = event.params.approved;
  vote.balance = event.params.balance;
  vote.txHash = event.transaction.hash;

  const memberId = event.address
    .toHexString()
    .concat('-member-')
    .concat(event.params.member.toHexString());
  vote.member = memberId;
  vote.proposal = proposalId;

  if (event.params.approved) {
    proposal.yesVotes = proposal.yesVotes.plus(constants.BIGINT_ONE);
    proposal.yesBalance = proposal.yesBalance.plus(event.params.balance);
    proposal.maxTotalSharesAndLootAtYesVote = dao.totalShares.plus(
      dao.totalLoot
    );
    proposal.maxTotalSharesAtYesVote = dao.totalShares;
  } else {
    proposal.noVotes = proposal.noVotes.plus(constants.BIGINT_ONE);
    proposal.noBalance = proposal.noBalance.plus(event.params.balance);
  }
  const hasQuorum =
    proposal.yesBalance.times(constants.BIGINT_ONE_HUNDRED) >
    dao.quorumPercent.times(dao.totalShares);
  proposal.currentlyPassing =
    proposal.yesBalance > proposal.noBalance && hasQuorum;

  vote.save();
  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleRageQuit(event: Ragequit): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  const memberId = event.address
    .toHexString()
    .concat('-member-')
    .concat(event.params.member.toHexString());

  const rageId = memberId
    .concat('-')
    .concat('rage-')
    .concat(event.transaction.hash.toHexString());

  const rage = new RageQuit(rageId);

  rage.createdAt = event.block.timestamp;
  rage.txHash = event.transaction.hash;
  rage.dao = dao.id;
  rage.member = memberId;
  rage.to = event.params.to;
  rage.shares = event.params.sharesToBurn;
  rage.loot = event.params.lootToBurn;
  rage.tokens = event.params.tokens.map<Bytes>((a) => a as Bytes);

  rage.save();

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleLockAdmin(event: LockAdmin): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.adminLocked = event.params.adminLock;

  dao.save();
}

export function handleLockGovernor(event: LockGovernor): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.governorLocked = event.params.governorLock;

  dao.save();
}

export function handleLockManager(event: LockManager): void {
  const dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.managerLocked = event.params.managerLock;

  dao.save();
}
