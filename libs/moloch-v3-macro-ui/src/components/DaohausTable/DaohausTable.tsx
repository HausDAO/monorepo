import { MouseEvent } from 'react';
import { useTable, Column } from 'react-table';

import { Button } from '@daohaus/ui';

import {
  HeaderCellContainer,
  Table,
  TBody,
  Td,
  Th,
  Thead,
  Tr,
} from './DaohausTable.styles';
import { ColumnSortIcons } from './ColumnSortIcons';

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
