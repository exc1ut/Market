import { VStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useForm, UseFormGetValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useProduct } from '../../api/useProduct';
import { addProduct } from '../../store/slices/cart.slice';
import {
  addProduct as pushProduct,
  findOne,
} from '../../store/slices/product.slice';
import { useAppSelector } from '../../store/store';
import { roundNumber } from '../../utils/app';
import { RegularAddForm } from './RegularAddForm';
import { RulonAddForm } from './RulonAddForm';

interface CartAddProps {
  id: number;
}

type SaleType = number | undefined;

export const FormValuesContext = React.createContext<any>({});

export const CartAdd: React.FC<CartAddProps> = ({ id }) => {
  const cartProduct = useAppSelector(findOne(id));

  const product = useProduct(id);
  const [total, setTotal] = useState(0);
  const { register, setValue, handleSubmit, watch, getValues } = useForm({
    defaultValues: cartProduct || {
      quantity: 1,
      number: 1,
      length: 1,
      cost: 0 as number | undefined,
      sale: 0,
    },
  });

  useEffect(() => {
    if (!cartProduct) setValue('cost', product.data?.cost);
  }, [product.data]);

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
        sale: data.sale,
      })
    );
    dispatch(
      pushProduct({
        ...data,
        id: productId,
      })
    );
    console.log(data);
  };

  if (product.isLoading) return <p>Loading...</p>;

  return (
    <FormValuesContext.Provider value={getValues}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack p={2} spacing={5}>
          {product.data?.categoryId === 1 ? (
            <RulonAddForm
              {...{ setTotal, register, setValue, watch, product }}
            />
          ) : (
            <RegularAddForm
              {...{ setTotal, register, setValue, watch, product }}
            />
          )}
        </VStack>
      </form>
    </FormValuesContext.Provider>
  );
};
