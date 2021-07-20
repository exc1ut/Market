import { Box } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { JournalContext } from '.';
import { useOneJournalProduct } from '../../api/useOneJournalProduct';
import { Table } from '../../components/Table';

interface JournalProuctsProps {}

export const JournalProucts: React.FC<JournalProuctsProps> = ({}) => {
  const journalId = useContext(JournalContext);

  const journal = useOneJournalProduct(journalId || 0);

  const journalProducts = journal.data?.journal.journalProducts;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Категория',
        accessor: 'product.category.name',
      },
      {
        Header: 'Наименование',
        accessor: 'product.name',
      },
      {
        Header: 'Цена',
        accessor: 'product.cost',
      },
      {
        Header: 'Количество',
        accessor: 'quantity',
      },
      {
        Header: 'Скидка',
        accessor: 'sale',
      },
      {
        Header: 'Сумма',
        accessor: 'total',
      },
    ],
    []
  );

  const data = React.useMemo(() => journalProducts, [journalProducts]);

  if (!journal.data) return null;

  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius="md">
      <Table columns={columns} data={data} />
    </Box>
  );
};
