import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Flex,
  Button,
  Text,
  Radio,
  RadioGroup,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { FormNumberInput } from '../../components/Form/FormNumberInput';
import { IFormProps } from '../../interfaces/IFormProps';
import { roundNumber } from '../../utils/app';
import { FormValuesContext } from './CartAdd';
import { FormInput } from '../../components/Form/FormInput';

export const RulonAddForm: React.FC<IFormProps> = ({
  register,
  setValue,
  product,
  watch,
  setTotal,
}) => {
  const getValues = useContext(FormValuesContext);
  const [type, setType] = useState('1');
  const constant = type === '1' ? 1.15 : 1.25;
  const watchLength = watch('length') || 1;
  const watchNumber = watch('number') || 1;
  const watchCost = watch('cost') || product.data?.cost;
  const watchSale = watch('sale');

  const area = useMemo(() => watchLength * watchNumber * constant, [
    type,
    watchNumber,
    watchLength,
  ]);

  useEffect(() => {
    setTotal(area * watchCost - watchSale);
  }, [area, watchCost, watchSale]);

  return (
    <>
      <RadioGroup onChange={setType} value={type}>
        <Stack direction="row">
          <Radio value="1">Волна</Radio>
          <Radio value="2">Лист</Radio>
        </Stack>
      </RadioGroup>
      <HStack spacing={3}>
        <FormNumberInput
          title="Количество"
          name="length"
          defaultValue={getValues('length')}
          register={register as any}
          setValue={setValue as any}
        />
        <FormNumberInput
          title="Штук"
          name="number"
          defaultValue={getValues('number')}
          register={register as any}
          setValue={setValue as any}
        />
      </HStack>
      <Flex w="100%" justifyContent="flex-start">
        <Text fontSize="md" fontWeight="medium">
          Кв м2:
        </Text>
        <Text ml={5}> {roundNumber(area)}</Text>
      </Flex>
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
          {roundNumber(area * watchCost - parseFloat(watchSale))}
        </Text>
      </Flex>
      <Button type="submit" colorScheme="blue">
        Добавить
      </Button>
    </>
  );
};
