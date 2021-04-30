import React, { useEffect, useMemo, useState } from 'react';
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
import { FormInput } from '../../components/Form/FormInput';
import { values } from 'lodash';
import { roundNumber } from '../../utils/app';

export const RulonAddForm: React.FC<IFormProps> = ({
  register,
  setValue,
  product,
  watch,
  setTotal,
}) => {
  const [type, setType] = useState('1');
  const constant = type === '1' ? 1.15 : 1.25;
  const watchLength = watch('length') || 1;
  const watchNumber = watch('number') || 1;
  const watchCost = watch('cost') || product.data?.cost;

  const area = useMemo(() => watchLength * watchNumber * constant, [
    type,
    watchNumber,
    watchLength,
  ]);

  useEffect(() => {
    setTotal(area * watchCost);
  }, [area, watchCost]);

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
          defaultValue={1}
          register={register as any}
          setValue={setValue as any}
        />
        <FormNumberInput
          title="Штук"
          name="number"
          defaultValue={1}
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
        <Text ml={5}> {roundNumber(area * watchCost)}</Text>
      </Flex>
      <Button type="submit" colorScheme="blue">
        Добавить
      </Button>
    </>
  );
};
