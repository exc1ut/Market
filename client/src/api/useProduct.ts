import { useToast } from '@chakra-ui/react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { Product } from '../interfaces/prisma';
import { api } from '../utils/axios';

export const useProductAdd = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation((data) => api.post('/products', data), {
    onSuccess: () => {
      queryClient.refetchQueries();
      toast({
        title: 'Удачно',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Ошибка',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useProductDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation((data: number) => api.delete(`/products/${data}`), {
    onSuccess: () => {
      queryClient.refetchQueries();
      toast({
        title: 'Удачно',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Ошибка',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useProductClone = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (data: number) => api.post(`/products/clone`, { id: data }),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
        toast({
          title: 'Удачно',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Ошибка',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
};

export const useProductUpdate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (data: Product) => api.patch(`/products/${data.id}`, data),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
        toast({
          title: 'Удачно',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Ошибка',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
};

const fetchProduct = async (id: number) => {
  const { data } = await api.get(`/products/${id}`);
  return data as Product;
};

export const useProduct = (id: number) => {
  return useQuery(['product', id], () => fetchProduct(id));
};
