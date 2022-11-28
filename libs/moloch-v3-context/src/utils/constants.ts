import { Ordering } from '@daohaus/data-fetch-utils';
import { Proposal_OrderBy } from '@daohaus/moloch-v3-data';

export const DEFAULT_PROPOSAL_PAGE_SIZE = 10;
export const DEFAULT_MEMBERS_PAGE_SIZE = 25;
export const DEFAULT_PROPOSAL_SORT: Ordering<Proposal_OrderBy> = {
  orderBy: 'createdAt',
  orderDirection: 'desc',
};
