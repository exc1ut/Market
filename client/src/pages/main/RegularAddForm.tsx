import React, { useContext, useEffect } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { FormNumberInput } from '../../components/Form/FormNumberInput';
import { IFormProps } from '../../interfaces/IFormProps';
import { roundNumber } from '../../utils/app';
import { FormValuesContext } from './CartAdd';
import { FormInput } from '../../components/Form/FormInput';

export const RegularAddForm: React.FC<IFormProps> = ({
  register,
  setValue,
  product,
  watch,
  setTotal,
}) => {
  const getValues = useContext(FormValuesContext);

  const watchCost = watch('cost') || product.data?.cost;
  const watchQuantity = watch('quantity') || 1;
  const watchSale = watch('sale');

  useEffect(() => {
    setTotal(watchCost * watchQuantity - watchSale);
  }, [watchCost, watchQuantity, watchSale]);

  return (
    <>
      <FormNumberInput
        title="Количество"
        name="quantity"
        defaultValue={getValues('quantity')}
        register={register as any}
        setValue={setValue as any}
      />
      <FormInput
        title="Цена"
        name="cost"
        defaultValue={getValues('cost')}
        register={register as any}
      />
      <FormNumberInput
        title="Скидка"
        name="sale"
        defaultValue={getValues('sale')}
        register={register as any}
        setValue={setValue as any}
      />
      <Flex w="100%" justifyContent="flex-start">
        <Text fontSize="md" fontWeight="medium">
          Сумма:
        </Text>
        <Text ml={5}>
          {' '}
          {roundNumber(watchQuantity * watchCost - parseFloat(watchSale))}
        </Text>
      </Flex>
      <Button colorScheme="blue">Добавить</Button>
    </>
  );
};
