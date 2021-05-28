import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useAuthLoginMutation } from '../../api/useAuth';
import { useJournalAddMutation } from '../../api/useJournalMutations';
import { setSeller } from '../../store/slices/cart.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { api } from '../../utils/axios';

interface AuthProps {
  onClose: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
  });
  const history = useHistory();
  const id = useAppSelector((state) => state.cartSlice.seller.connect.id);
  const loginMutation = useAuthLoginMutation();
  const journalAdd = useJournalAddMutation();
  const dispatch = useAppDispatch();
  const journal = useAppSelector((state) => state.cartSlice);
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<number | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const login = await api.post('/auth/login', data);
      const { data: user, status: statusNumber } = await api.post(
        '/auth/getByName',
        data
      );
      if (statusNumber < 300) {
        dispatch(setSeller(user.id));
        setStatus(statusNumber);
        console.log(journal);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (status && status < 300) journalAdd.mutate(journal);
  }, [status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack py={3} width="100%">
        <Text fontSize="md">{error}</Text>
        <Input variant="filled" placeholder="Имя" {...register('name')} />
        <Input
          variant="filled"
          placeholder="Пароль"
          type="password"
          {...register('password')}
        />
        <HStack pt={3}>
          <Button colorScheme="blue" type="submit">
            Добавить в журнал
          </Button>
          <Button colorScheme="red" onClick={() => onClose()}>
            Отмена
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
