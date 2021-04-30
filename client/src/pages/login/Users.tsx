import { Button } from '@chakra-ui/button';
import { Box, Center, Divider, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { userUsers } from '../../api/useUsers';
import { List } from '../../components/List';

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
  const { data: users, isLoading } = userUsers();

  if (isLoading) return null;
  return (
    <Box>
      <Center py={4}>
        <Text fontSize="xl">Выберите сотрудника</Text>
      </Center>
      {users?.map((user) => (
        <List id={user.id} name={user.name} role={user.role} />
      ))}
    </Box>
  );
};
