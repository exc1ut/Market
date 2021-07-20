import { useToast } from '@chakra-ui/toast';
import { useMutation, useQueryClient } from 'react-query';
import { Category } from '../interfaces/prisma';
import { api } from '../utils/axios';

export const useCategoryAdd = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation((data) => api.post('/categories', data), {
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

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation((data: number) => api.delete(`/categories/${data}`), {
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

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (data: { id: number; category: Category }) =>
      api.patch(`/categories/${data.id}`, data.category),
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
