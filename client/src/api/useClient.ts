import { useToast } from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { Prisma } from '../interfaces/prisma';
import { api } from '../utils/axios';

export const useClientCreate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (data: Prisma.ClientCreateInput) => api.post('/client', data),
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
