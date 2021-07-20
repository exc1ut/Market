import { useQuery } from 'react-query';
import { User } from '../interfaces/prisma';
import { api } from '../utils/axios';

const fetchUsers = async () => {
  const { data } = await api.get('/user');
  return data as User[];
};

export const userUsers = () => {
  return useQuery('users', fetchUsers);
};
