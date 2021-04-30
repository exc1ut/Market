import { VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useProduct } from '../../api/useProduct';
import { addProduct } from '../../store/slices/cart.slice';
import { roundNumber } from '../../utils/app';
import { RegularAddForm } from './RegularAddForm';
import { RulonAddForm } from './RulonAddForm';

interface CartAddProps {
  id: number;
}

export const CartAdd: React.FC<CartAddProps> = ({ id }) => {
  const product = useProduct(id);
  const [total, setTotal] = useState(0);
  const { register, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      quantity: 1,
      number: 1,
      length: 1,
      cost: 0,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    const productId = product.data?.id!;

    if (!data.cost && product.isFetched) {
      data.cost = product.data?.cost;
    }
    if (product.data?.categoryId === 1) {
      data.quantity = data.length * data.number;
    }
    dispatch(
      addProduct({
        productId,
        quantity: data.quantity,
        total: roundNumber(total),
        sale: 0,
      })
    );
    console.log(data);
  };

  if (product.isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack p={2} spacing={5}>
        {product.data?.categoryId === 1 ? (
          <RulonAddForm {...{ setTotal, register, setValue, watch, product }} />
        ) : (
          <RegularAddForm
            {...{ setTotal, register, setValue, watch, product }}
          />
        )}
      </VStack>
    </form>
  );
};
