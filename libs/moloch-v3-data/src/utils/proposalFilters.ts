import { nowInSeconds, PROPOSAL_STATUS } from '@daohaus/utils';
import { Proposal_Filter } from '../types';

export const statusFilter = (
  status: string,
  votingPlusGraceDuration?: string | number
): Proposal_Filter | undefined => {
  const now = `${nowInSeconds().toFixed()}`;

  switch (status) {
    case PROPOSAL_STATUS['unsponsored']: {
      if (!votingPlusGraceDuration) {
        return;
      }
      const expirationTime = (
        Number(now) + Number(votingPlusGraceDuration)
      ).toFixed();
      return {
        sponsored: false,
        cancelled: false,
        expirationQueryField_gt: expirationTime,
      };
    }
    case PROPOSAL_STATUS['cancelled']: {
      return { cancelled: true };
    }
    case PROPOSAL_STATUS['passed']: {
      return { passed: true, actionFailed: false };
    }
    case PROPOSAL_STATUS['actionFailed']: {
      return { actionFailed: true };
    }
    case PROPOSAL_STATUS['voting']: {
      return { votingStarts_lte: now, votingEnds_gt: now };
    }
    case PROPOSAL_STATUS['grace']: {
      return { votingEnds_lte: now, graceEnds_gt: now };
    }
    case PROPOSAL_STATUS['expired']: {
      if (!votingPlusGraceDuration) {
        return;
      }
      const expirationTime = (
        Number(now) + Number(votingPlusGraceDuration)
      ).toFixed();
      return {
        cancelled: false,
        expiration_gt: '0',
        expiration_lt: `${expirationTime}`,
      };
    }
    case PROPOSAL_STATUS['needsProcessing']: {
      return { processed: false, currentlyPassing: true, graceEnds_lt: now };
    }
    case PROPOSAL_STATUS['failed']: {
      if (!votingPlusGraceDuration) {
        return;
      }
      return {
        currentlyPassing: false,
        graceEnds_lt: now,
        sponsored: true,
        passed: false,
      };
    }
    default: {
      return;
    }
  }
};
