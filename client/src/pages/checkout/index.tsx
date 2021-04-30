import { Center, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { addPayment, totalCost } from '../../store/slices/cart.slice';
import { useAppSelector } from '../../store/store';
import { useRangeForm } from '../../utils/useRangeForm';
import { CheckoutInput } from '../../components/Form/CheckoutInput';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

interface indexProps {}

export const Checkout: React.FC<indexProps> = ({}) => {
  const total = useAppSelector(totalCost);
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      cash: total,
      card: 0,
      cashless: 0,
    },
  });

  const watchAll = [+watch('cash'), +watch('card'), +watch('cashless')];

  const sum = React.useMemo(() => {
    return watchAll[0] + watchAll[1] + watchAll[2] - total;
  }, [watchAll, total]);

  const onSubmit = (data: any) => {
    for (const key in data) {
      dispatch(
        addPayment({
          price: data[key],
          paymentMethod: key,
        })
      );
    }
    history.push('/');
  };

  return (
    <Center height="100vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack p={5} spacing={3} width={350}>
          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="2xl">
              Итого
            </Text>
            <Text fontWeight="medium" fontSize="xl">
              {total}
            </Text>
          </Flex>
          <Divider />
          <Flex justifyContent="space-between" w="100%">
            <Text fontSize="md">Наличные</Text>
            <Input {...register('cash')} w="50%" />
          </Flex>
          <Flex justifyContent="space-between" w="100%">
            <Text fontSize="md">Карта</Text>
            <Input {...register('card')} w="50%" />
          </Flex>
          <Flex justifyContent="space-between" w="100%">
            <Text fontSize="md">Безнал</Text>
            <Input {...register('cashless')} w="50%" />
          </Flex>
          <Flex justifyContent="space-between" w="100%">
            <Text fontWeight="bold" fontSize="lg">
              Сдача: {sum}
            </Text>
          </Flex>
          <HStack spacing={3}>
            <Button type="submit" colorScheme="blue">
              Оплатить
            </Button>
            <Button colorScheme="red">Отмена</Button>
          </HStack>
        </VStack>
      </form>
    </Center>
  );
};
