import { Member_Filter, Dao_OrderBy, Ordering } from '@daohaus/dao-data';
import { NETWORK_DATA } from '@daohaus/common-utilities';

export const FILTER_TYPE = {
  DELEGATING: 'delegating',
  DELEGATING_TO: 'delegatingTo',
};

export type HubSortOption = {
  name: string;
  ordering: Ordering<Dao_OrderBy>;
};

export const SORT_FIELDS: { [index: string]: HubSortOption } = {
  PROPOSALS: {
    name: 'Proposals',
    ordering: { orderDirection: 'desc', orderBy: 'proposalCount' },
  },
  MEMBERS: {
    name: 'Members',
    ordering: { orderDirection: 'desc', orderBy: 'activeMemberCount' },
  },
  NEWEST: {
    name: 'Newest',
    ordering: { orderDirection: 'desc', orderBy: 'createdAt' },
  },
  OLDEST: {
    name: 'Oldest',
    ordering: { orderDirection: 'asc', orderBy: 'createdAt' },
  },
};

export const sortOptions = Object.entries(SORT_FIELDS).map(([key, value]) => ({
  value: key,
  name: value.name,
}));

export const getDelegateFilter = (
  filterDelegate: string,
  address: string
): Member_Filter | undefined => {
  if (filterDelegate === '') {
    return undefined;
  }
  if (filterDelegate === FILTER_TYPE.DELEGATING) {
    return { delegateOfCount_gt: '0' };
  }
  if (filterDelegate === FILTER_TYPE.DELEGATING_TO) {
    return { delegatingTo_not: address };
  }
};

export const defaultNetworks = Object.keys(NETWORK_DATA).reduce(
  (acc, networkId) => ({ ...acc, [networkId]: networkId }),
  {}
);
export const DEFAULT_SORT_KEY = 'PROPOSALS';
