import { IconButton } from '@chakra-ui/button';
import React from 'react';
import { Table } from '../../components/Table';
import { IJournalProductsWithRelations } from '../../interfaces/IJournalProductsWithRelations';
import { Journal, JournalProduct, Product } from '../../interfaces/prisma';
import { AiOutlineEye } from 'react-icons/ai';
import { Icon } from '@chakra-ui/icons';

interface JournalTableProps {
  journalProducts: IJournalProductsWithRelations[];
  handleView: (id: number) => void;
}

export const JournalTable: React.FC<JournalTableProps> = ({
  journalProducts,
  handleView,
}) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id' as const, // accessor is the "key" in the data
    },
    {
      Header: 'Дата',
      accessor: 'journal.date' as const, // accessor is the "key" in the data
    },
    {
      Header: 'Категория',
      accessor: 'product.category.name' as const,
    },
    {
      Header: 'Наименование',
      accessor: 'product.name' as const,
    },
    {
      Header: 'Стоимость',
      accessor: 'product.cost' as const,
    },
    {
      Header: 'Скидка',
      accessor: 'sale' as const,
    },
    {
      Header: 'Количество',
      accessor: 'quantity' as const,
    },
    {
      Header: 'Сумма',
      accessor: 'total' as const,
    },
    {
      id: 'view',
      accessor: 'id',
      Cell: ({ value }: any) => (
        <IconButton
          variant="ghost"
          aria-label="view"
          isRound
          size="sm"
          onClick={() => handleView(value)}
          icon={<Icon w={5} h={5} as={AiOutlineEye} />}
        />
      ),
    },
  ];

  const data = React.useMemo(() => journalProducts, [journalProducts]);

  const calculatedValues = React.useMemo(() => {
    const journalSet = new Set();
    journalProducts.forEach((val) => journalSet.add(val.journalId));
    const journalProductQuantity = journalProducts.reduce(
      (acc, val) => val.quantity + acc,
      0
    );
    const totalCost = journalProducts.reduce((acc, val) => val.total + acc, 0);
    return {
      journals: journalSet.size,
      totalCost,
      journalProductQuantity,
    };
  }, [journalProducts]);

  const caption = `Продажи: ${calculatedValues.journals} | Товары: ${calculatedValues.journalProductQuantity} | Сумма: ${calculatedValues.totalCost}`;

  return <Table columns={columns} data={data} caption={caption} />;
};
