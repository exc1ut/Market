import React from 'react';
import { IProductWithCategory } from '../../interfaces/IProductWithCategory';
import { Table } from '../../components/Table';
import { useProductClone, useProductDelete } from '../../api/useProduct';
import { useAppDispatch } from '../../store/store';
import { addProduct, CartProduct } from '../../store/slices/cart.slice';
import { useProducts } from '../../api/useProducts';
import { IconButton } from '@chakra-ui/button';
import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface ProductTableProps {
  products: IProductWithCategory[];
  handleUpdate: (id: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleUpdate,
}) => {
  const productDelete = useProductDelete();
  const productClone = useProductClone();
  const allProducts = useProducts('', []);

  const dispatch = useAppDispatch();

  const columns = [
    {
      Header: 'Id',
      accessor: 'id' as const, // accessor is the "key" in the data
    },
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
      id: 'delete',
      accessor: 'id',
      width: 5,
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
      accessor: 'id',
      maxWidth: 5,
      Cell: ({ value }: any) => (
        <IconButton
          variant="ghost"
          aria-label="edit"
          size="xs"
          onClick={() => handleUpdate(value)}
          icon={<EditIcon />}
        />
      ),
    },
    {
      id: 'clone',
      accessor: 'id',
      width: 5,
      Cell: ({ value }: any) => (
        <IconButton
          variant="ghost"
          aria-label="clone"
          size="xs"
          onClick={() => handleClone(value)}
          icon={<CopyIcon />}
        />
      ),
    },
  ];

  const data = React.useMemo(() => products, [products]);

  const handleDelete = (id: number) => {
    productDelete.mutate(id);
  };

  const handleClone = (id: number) => {
    productClone.mutate(id);
  };

  const handleAddCart = (id: number) => {
    const product = allProducts.data?.find((val) => val.id === id);
    // if(product) dispatch(addProduct({productId:product.id,}));
  };

  return (
    <Table
      handleClone={handleClone}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      handleAddCard={handleAddCart}
      columns={columns}
      data={data}
    />
  );
};
