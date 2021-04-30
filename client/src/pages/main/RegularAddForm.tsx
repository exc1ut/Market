import React, { useEffect } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { FormNumberInput } from '../../components/Form/FormNumberInput';
import { IFormProps } from '../../interfaces/IFormProps';
import { roundNumber } from '../../utils/app';

export const RegularAddForm: React.FC<IFormProps> = ({
  register,
  setValue,
  product,
  watch,
  setTotal,
}) => {
  const watchCost = watch('cost') || product.data?.cost;
  const watchQuantity = watch('quantity') || 1;

  useEffect(() => {
    setTotal(watchCost * watchQuantity);
  }, [watchCost, watchQuantity]);

  return (
    <>
      <FormNumberInput
        title="Количество"
        name="quantity"
        defaultValue={1}
        register={register as any}
        setValue={setValue as any}
      />
      <FormNumberInput
        title="Цена"
        name="cost"
        defaultValue={product.data?.cost}
        register={register as any}
        setValue={setValue as any}
      />
      <Flex w="100%" justifyContent="flex-start">
        <Text fontSize="md" fontWeight="medium">
          Сумма:
        </Text>
        <Text ml={5}> {roundNumber(watchQuantity * watchCost)}</Text>
      </Flex>
      <Button colorScheme="blue">Добавить</Button>
    </>
  );
};
