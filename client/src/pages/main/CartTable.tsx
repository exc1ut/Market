import { IconButton } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductsByRange } from '../../api/useProducts';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';
import { getIds, removeProduct } from '../../store/slices/cart.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { CartAdd } from './CartAdd';

interface CartTableProps {}

export const CartTable: React.FC<CartTableProps> = ({}) => {
  const ids = useAppSelector(getIds);
  const [selectedId, setSelectedId] = useState(0);
  const modal = useDisclosure();
  const cartProducts = useAppSelector(
    (state) => state.cartSlice.journalProducts.create
  );
  const products = useProductsByRange(ids);

  const dispatch = useAppDispatch();

  const handleEdit = (id: number) => {
    setSelectedId(id);
    modal.onOpen();
  };

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
    {
      id: 'edit',
      accessor: 'productId',
      Cell: ({ value }: any) => (
        <IconButton
          variant="ghost"
          aria-label="edit"
          size="xs"
          onClick={() => handleEdit(value)}
          icon={<EditIcon />}
        />
      ),
    },
  ];

  const handleDelete = (id: number) => {
    console.log(id);
    dispatch(removeProduct(id));
  };

  const data = React.useMemo(() => preparedData, [preparedData]);

  return (
    <>
      <Modal
        title="add"
        size="sm"
        onClose={modal.onClose}
        isOpen={modal.isOpen}
      >
        <CartAdd id={selectedId} />
      </Modal>
      <Table columns={columns} data={data} />
    </>
  );
};
