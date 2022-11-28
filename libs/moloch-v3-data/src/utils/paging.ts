import { Paging } from '@daohaus/data-fetch-utils';

export const DEFAULT_RECORDS_PER_PAGE = 25;

export interface ILightEntity {
  readonly id: string;
}

export const paginateResponse = <T>(items: T[], paging: Paging) => {
  const hasNextPage = paging.pageSize < items.length;
  return hasNextPage ? items.slice(0, paging.pageSize) : items;
};

export const createPaging = <T extends ILightEntity>(
  items: T[],
  paging: Paging
) => {
  const hasNextPage = paging.pageSize < items.length;
  const pageItems = hasNextPage ? items.slice(0, paging.pageSize) : items;

  return {
    pageItems,
    nextPaging: hasNextPage
      ? {
          pageSize: paging.pageSize,
          offset: getNextOffset(paging),
          lastId: getNextLastId(paging, pageItems),
        }
      : undefined,
    previousPaging: hasPreviousOffsetPage(paging)
      ? {
          pageSize: paging.pageSize,
          offset: getPreviousOffset(paging),
        }
      : undefined,
  };
};

const hasPreviousOffsetPage = (paging: Paging): boolean =>
  paging.offset !== undefined && paging.offset > 0;

const getNextOffset = (paging: Paging): number | undefined => {
  return paging.offset !== undefined
    ? paging.offset + paging.pageSize
    : paging.offset;
};

const getPreviousOffset = (paging: Paging): number | undefined => {
  if (paging.offset !== undefined) {
    return paging.offset - paging.pageSize;
  }
  return paging.offset;
};

const getNextLastId = (
  paging: Paging,
  pageItems: ILightEntity[]
): string | undefined => {
  return paging.lastId !== undefined ? pageItems.slice(-1)[0]?.id : undefined;
};
