import React, { MouseEvent } from 'react';
import { useTable, Column } from 'react-table';
import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

import { Button } from '@daohaus/ui';
import { ColumnSortIcons } from './ColumnSortIcons';

const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 2rem;
`;

const Thead = styled.thead``;

const Th = styled.th`
  color: ${indigoDark.indigo11};
  border-bottom: 1px solid ${indigoDark.indigo5};
  padding: 2rem 0.5rem;
`;

const HeaderCellContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  /* gap: 1rem; */
`;

const Tr = styled.tr``;

const Td = styled.td`
  padding: 2rem 0.5rem;
`;

const TBody = styled.tbody``;

export type DaoTableProps<T extends object> = {
  tableData: T[];
  columns: Column<T>[];

  hasNextPaging?: boolean;
  handleLoadMore?: (event: MouseEvent<HTMLButtonElement>) => void;
  handleColumnSort?: (orderBy: string, orderDirection: 'asc' | 'desc') => void;
  sortableColumns: string[];
};

export function DaoTable<T extends object>({
  tableData,
  columns,
  hasNextPaging,
  handleLoadMore,
  handleColumnSort,
  sortableColumns,
}: DaoTableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({
      columns: columns,
      data: tableData,
    });

  return (
    <>
      <Table {...getTableProps}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <Th {...column.getHeaderProps()}>
                    <HeaderCellContainer>
                      {column.render('Header')}
                      {sortableColumns.includes(column.id) &&
                        handleColumnSort && (
                          <ColumnSortIcons
                            orderBy={column.id}
                            handleColumnSort={handleColumnSort}
                          />
                        )}
                    </HeaderCellContainer>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
      {hasNextPaging && handleLoadMore && (
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </>
  );
}
