import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table as ChakraTable,
  Box,
  TableCaption,
} from '@chakra-ui/react';
import React from 'react';
import { useSortBy, useTable } from 'react-table';
interface TableProps {
  columns: any;
  data: any;
  caption?: string;
  handleDelete?: (id: number) => void;
  handleClone?: (id: number) => void;
  handleUpdate?: (id: number) => void;
  handleAddCard?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({ columns, data, caption }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Render the UI for your table
  return (
    <ChakraTable variant="simple" {...getTableProps()}>
      {caption && (
        <TableCaption
          backgroundColor="white"
          position="sticky"
          bottom={0}
          zIndex={1}
        >
          {caption}
        </TableCaption>
      )}
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                position="sticky"
                top={0}
                backgroundColor="white"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <Box as="span">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowDownIcon />
                    ) : (
                      <ArrowUpIcon />
                    )
                  ) : (
                    ''
                  )}
                </Box>
              </Th>
            ))}
            <Th></Th>
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};
