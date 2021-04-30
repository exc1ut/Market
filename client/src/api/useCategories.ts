import { useQuery } from 'react-query';
import { Category } from '../interfaces/prisma';
import { api } from '../utils/axios';

const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data as Category[];
};

export const useCategories = () => {
  return useQuery('categories', fetchCategories);
};
