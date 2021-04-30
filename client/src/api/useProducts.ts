import { useQuery } from 'react-query';
import { IProductWithCategory } from '../interfaces/IProductWithCategory';
import { api } from '../utils/axios';

const fetchProducts = async (name: string, categories: number[]) => {
  const categoryId = categories.length > 0 ? categories : undefined;
  const { data } = await api.post('/products/getByNameAndCategory', {
    name,
    categoryId,
  });
  return data as IProductWithCategory[];
};

export const useProducts = (name: string, categories: number[]) => {
  return useQuery(['products', name, categories], () =>
    fetchProducts(name, categories)
  );
};

const fetchbyRange = async (ids: number[]) => {
  const { data } = await api.post('/products/getByRange', {
    ids,
  });
  return data as IProductWithCategory[];
};

export const useProductsByRange = (ids: number[]) => {
  return useQuery(['productsByRange', ids], () => fetchbyRange(ids));
};
