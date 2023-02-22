import {
  formatDateTimeFromSeconds,
  formatDistanceToNowFromSeconds,
  formatPeriods,
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
  PROPOSAL_STATUS,
} from '@daohaus/utils';
import { NetworkType } from '@daohaus/keychain-utils';

import { MolochV3Proposal } from '@daohaus/moloch-v3-data';

export type ProposalHistoryElementData = {
  dataType: 'member' | 'dataIndicator';
  label: string;
  data: string;
};

export type ProposalHistoryElement = {
  title: string;
  active: boolean;
  text?: string;
  canExpand: boolean;
  dataElements?: ProposalHistoryElementData[];
  txHash?: string;
  showVotesButton?: boolean;
};

type ElementBuildArgs = {
  proposal: MolochV3Proposal;
  networkData?: NetworkType | null;
};

export const buildProposalHistory = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] | null => {
  if (proposal.status === PROPOSAL_STATUS.unsponsored) {
    return buildUnsponsoredElements({ proposal, networkData });
  }
  if (proposal.status === PROPOSAL_STATUS.cancelled) {
    return buildCancelledElements({ proposal, networkData });
  }
  if (proposal.status === PROPOSAL_STATUS.voting) {
    return buildVotingElements({ proposal, networkData });
  }
  if (proposal.status === PROPOSAL_STATUS.grace) {
    return buildGraceElements({ proposal, networkData });
  }
  if (proposal.status === PROPOSAL_STATUS.needsProcessing) {
    return buildNeedsProcessingElements({ proposal, networkData });
  }
  if (
    proposal.status === PROPOSAL_STATUS.actionFailed ||
    proposal.status === PROPOSAL_STATUS.passed
  ) {
    return buildCompletedElements({ proposal, networkData });
  }

  if (proposal.status === PROPOSAL_STATUS.failed) {
    return buildFailedElements({ proposal, networkData });
  }

  if (proposal.status === PROPOSAL_STATUS.expired) {
    return buildExpiredElements({ proposal, networkData });
  }

  return [
    {
      title: 'Pending',
      active: false,
      canExpand: false,
    },
  ];
};

const buildExpiredElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    buildVotingPast({ proposal }),
    buildGracePast({ proposal }),
    {
      title: 'Proposal Expired',
      text: formatShortDateTimeFromSeconds(proposal.expiration),
      active: false,
      canExpand: false,
    },
  ];
};

const buildFailedElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    buildVotingPast({ proposal }),
    buildGracePast({ proposal }),
    {
      title: 'Proposal Failed',
      active: false,
      canExpand: false,
    },
  ];
};

const buildCompletedElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    buildVotingPast({ proposal }),
    buildGracePast({ proposal }),
    {
      title: `Proposal Complete`,
      active: false,
      canExpand: true,
      dataElements: [
        {
          dataType: 'member',
          label: 'Executed By',
          data: proposal.processedBy || '--',
        },
      ],
      txHash: proposal.processTxHash,
    },
  ];
};

const buildNeedsProcessingElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    buildVotingPast({ proposal }),
    buildGracePast({ proposal }),
    {
      title: 'Proposal Complete',
      active: proposal.status === PROPOSAL_STATUS.needsProcessing,
      text: `Waiting to be executed...`,
      canExpand: false,
    },
  ];
};

const buildGraceElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    buildVotingPast({ proposal }),
    {
      title: 'Grace Period',
      active: proposal.status === PROPOSAL_STATUS.grace,
      text: `Grace period ends ${formatDistanceToNowFromSeconds(
        proposal.graceEnds
      )}`,
      canExpand: false,
    },
    buildCompletedFuture({ proposal }),
  ];
};

const buildVotingElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    {
      title: 'Voting in Progress',
      active: proposal.status === PROPOSAL_STATUS.voting,
      text: `${formatValueTo({
        value: fromWei(proposal.yesBalance),
        decimals: 2,
        format: 'numberShort',
      })} Yes / ${formatValueTo({
        value: fromWei(proposal.noBalance),
        decimals: 2,
        format: 'numberShort',
      })} No -- Voting ends ${formatDistanceToNowFromSeconds(
        proposal.votingEnds
      )}`,
      canExpand: false,
      showVotesButton: true,
    },
    buildCompletedFuture({ proposal }),
  ];
};

const buildCancelledElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    buildSponsored({ proposal }),
    buildVotingPast({ proposal }),
    {
      title: 'Proposal Cancelled',
      active: false,
      canExpand: false,
    },
  ];
};

const buildUnsponsoredElements = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement[] => {
  return [
    buildSubmitted({ proposal, networkData }),
    {
      title: 'Waiting on Sponsor',
      active: false,
      canExpand: false,
    },
    {
      title: 'Voting Period',
      text: `Voting will last ${formatPeriods(proposal.votingPeriod)}`,
      active: false,
      canExpand: false,
    },
    buildGraceFuture({ proposal }),
    buildCompletedFuture({ proposal }),
  ];
};

const buildGraceFuture = ({
  proposal,
}: ElementBuildArgs): ProposalHistoryElement => {
  return {
    title: 'Grace Period',
    text: `Grace will last ${formatPeriods(proposal.gracePeriod)}`,
    active: false,
    canExpand: false,
  };
};

const buildGracePast = ({
  proposal,
}: ElementBuildArgs): ProposalHistoryElement => {
  return {
    title: 'Grace Period',
    active: false,
    text: formatDateTimeFromSeconds(proposal.graceEnds),
    canExpand: false,
  };
};

const buildVotingPast = ({
  proposal,
}: ElementBuildArgs): ProposalHistoryElement => {
  return {
    title: 'Voting Complete',
    active: false,
    text: `${formatValueTo({
      value: fromWei(proposal.yesBalance),
      decimals: 2,
      format: 'numberShort',
    })} Yes / ${formatValueTo({
      value: fromWei(proposal.noBalance),
      decimals: 2,
      format: 'numberShort',
    })} No`,
    canExpand: false,
    showVotesButton: true,
  };
};

const buildCompletedFuture = ({
  proposal,
}: ElementBuildArgs): ProposalHistoryElement => {
  return {
    title: 'Proposal Completion',
    text:
      proposal.expiration !== '0'
        ? `Proposal will expire on ${formatShortDateTimeFromSeconds(
            proposal.expiration
          )}`
        : undefined,
    active: false,
    canExpand: false,
  };
};

const buildSponsored = ({
  proposal,
}: ElementBuildArgs): ProposalHistoryElement => {
  return {
    title: 'Sponsored',
    active: false,
    text: formatDateTimeFromSeconds(proposal.sponsorTxAt),
    canExpand: true,
    dataElements: [
      {
        dataType: 'member',
        label: 'Sponsored By',
        data: proposal.sponsor || '--',
      },
    ],
    txHash: proposal.sponsorTxHash,
  };
};

const buildSubmitted = ({
  proposal,
  networkData,
}: ElementBuildArgs): ProposalHistoryElement => {
  return {
    title: 'Submitted',
    active: proposal.status === PROPOSAL_STATUS.unsponsored,
    text: formatDateTimeFromSeconds(proposal.createdAt),
    canExpand: true,
    dataElements: [
      {
        dataType: 'member',
        label: 'Submitted By',
        data: proposal.createdBy,
      },
      {
        dataType: 'dataIndicator',
        label: 'Proposal Offering',
        data: `${fromWei(proposal.proposalOffering)} ${networkData?.symbol}`,
      },
    ],
    txHash: proposal.txHash,
  };
};
