import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Flex, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../store/slices/user.slice';
import { useAppDispatch } from '../../store/store';
import { api } from '../../utils/axios';

type Params = {
  id?: string;
  name?: string;
};

interface PasswordProps {}

export const Password: React.FC<PasswordProps> = ({}) => {
  const [password, setPassword] = useState('');
  const { id, name } = useParams<Params>();
  const history = useHistory();
  const dispath = useAppDispatch();

  const login = async () => {
    const { data: token } = await api.post('/auth/login', { name, password });
    token.access_token;
    localStorage.setItem('token', token.access_token);
    if (id) dispath(fetchUser(id));
    history.push('/');
  };

  return (
    <Stack p={2} spacing={2} width={250}>
      <Text fontWeight="bold" py={3} fontSize="md" align="center">
        Вводите пароль для {name}
      </Text>
      <Input
        onChange={(e) => setPassword(e.target.value)}
        variant="filled"
        type="password"
        placeholder="Пароль"
      />
      <Flex justifyContent="space-between">
        <Button colorScheme="blue" onClick={() => login()}>
          Подтвердить
        </Button>
        <Button colorScheme="red" as={Link} to="/">
          Назад
        </Button>
      </Flex>
    </Stack>
  );
};
