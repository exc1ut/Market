import React from 'react';
import { IProductWithCategory } from '../../interfaces/IProductWithCategory';
import { Table } from '../../components/Table';
import { useProductClone, useProductDelete } from '../../api/useProduct';
import { useAppDispatch } from '../../store/store';
import { addProduct, CartProduct } from '../../store/slices/cart.slice';
import { useProducts } from '../../api/useProducts';
import { IconButton } from '@chakra-ui/button';
import { CopyIcon } from '@chakra-ui/icons';

interface ProductTableProps {
  products: IProductWithCategory[];
  handleAdd: (id: number) => void;
}

export const CartProductTable: React.FC<ProductTableProps> = ({
  products,
  handleAdd,
}) => {
  const allProducts = useProducts('', []);

  const dispatch = useAppDispatch();

  const columns = [
    {
      Header: 'Категория',
      accessor: 'category.name' as const, // accessor is the "key" in the data
    },
    {
      Header: 'Наименование',
      accessor: 'name' as const,
    },
    {
      Header: 'Остаток',
      accessor: 'available' as const,
    },
    {
      Header: 'Стоимость',
      accessor: 'cost' as const,
    },
    {
      id: 'add',
      accessor: 'id' as const,
      Cell: ({ value }: any) => (
        <IconButton
          variant="ghost"
          aria-label="clone"
          size="xs"
          onClick={() => handleAdd(value)}
          icon={<CopyIcon />}
        />
      ),
    },
  ];

  const data = React.useMemo(() => products, [products]);

  return <Table columns={columns} data={data} />;
};
