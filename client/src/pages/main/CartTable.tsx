import { IconButton } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import { useProductsByRange } from '../../api/useProducts';
import { Table } from '../../components/Table';
import { getIds, removeProduct } from '../../store/slices/cart.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface CartTableProps {}

export const CartTable: React.FC<CartTableProps> = ({}) => {
  const ids = useAppSelector(getIds);
  const cartProducts = useAppSelector(
    (state) => state.cartSlice.journalProducts.create
  );
  const products = useProductsByRange(ids);

  const dispatch = useAppDispatch();

  const preparedData = cartProducts.map((val, index) => {
    const fetchedProducts = products.data?.find((v) => v.id === val.productId);
    return {
      ...val,
      categoryName: fetchedProducts?.category.name,
      name: fetchedProducts?.name,
    };
  });

  const columns = [
    {
      Header: 'Категория',
      accessor: 'categoryName' as const, // accessor is the "key" in the data
    },
    {
      Header: 'Наименование',
      accessor: 'name' as const, // accessor is the "key" in the data
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
      id: 'delete',
      accessor: 'productId',
      Cell: ({ value }: any) => (
        <IconButton
          variant="ghost"
          aria-label="delete"
          size="xs"
          onClick={() => handleDelete(value)}
          icon={<DeleteIcon />}
        />
      ),
    },
  ];

  const handleDelete = (id: number) => {
    console.log(id);
    dispatch(removeProduct(id));
  };

  const data = React.useMemo(() => preparedData, [preparedData]);

  return <Table columns={columns} data={data} />;
};
