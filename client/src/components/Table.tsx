import { CopyIcon, DeleteIcon, EditIcon, Icon } from '@chakra-ui/icons';
import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table as ChakraTable,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { useTable } from 'react-table';
interface TableProps {
  columns: any;
  data: any;
  handleDelete?: (id: number) => void;
  handleClone?: (id: number) => void;
  handleUpdate?: (id: number) => void;
  handleAddCard?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <ChakraTable variant="simple" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
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
