import { Center, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import {
  addPayment,
  resetPayments,
  totalCost,
} from '../../store/slices/cart.slice';
import { useAppSelector } from '../../store/store';
import { useRangeForm } from '../../utils/useRangeForm';
import { CheckoutInput } from '../../components/Form/CheckoutInput';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal } from '../../components/Modal';
import { Client } from '../main/client';
import { Auth } from './Auth';
import { useJournalAddMutation } from '../../api/useJournalMutations';

interface indexProps {}

export const Checkout: React.FC<indexProps> = ({}) => {
  const total = useAppSelector(totalCost);
  const client = useAppSelector((state) => state.cartSlice.client);
  const journal = useAppSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const journalCreateMutation = useJournalAddMutation();
  const history = useHistory();
  const modal = useDisclosure();
  const auth = useDisclosure();

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
      if (+data[key] > 0) {
        dispatch(
          addPayment({
            price: +data[key],
            paymentMethod: key,
          })
        );
      }
    }
    if (sum < 0 && !client) {
      modal.onOpen();
    } else {
      auth.onOpen();
    }
  };

  const handleClientClose = () => {
    modal.onClose();
    auth.onOpen();
  };

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    history.goBack();
    dispatch(resetPayments());
  };

  return (
    <Center height="100vh">
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        title="Клиент"
        size="6xl"
      >
        <Client onClose={handleClientClose} />
      </Modal>
      <Modal
        isOpen={auth.isOpen}
        onClose={auth.onClose}
        title="Аутентификация"
        size="xs"
      >
        <Auth onClose={auth.onClose} />
      </Modal>
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
            <Button onClick={handleCancel} colorScheme="red">
              Отмена
            </Button>
          </HStack>
        </VStack>
      </form>
    </Center>
  );
};
