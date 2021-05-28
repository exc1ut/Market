import { useToast } from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { IAddPayment } from '../interfaces/IAddPayment';
import { ReturnProductDto } from '../interfaces/IReturnProduct';
import { Prisma } from '../interfaces/prisma';
import { ICart, resetCart } from '../store/slices/cart.slice';
import { useAppDispatch } from '../store/store';
import { api } from '../utils/axios';

const query = (data: ICart) => {
  const formattedData = {
    products: data.journalProducts.create,
    userId: data.seller.connect.id,
    payments: data.journalPayments.create,
    total: data.total,
    paid: data.paid,
    sale: data.sale,
    client: data.client?.connect.id,
  };

  return api.post(`/journal`, formattedData);
};

export const useJournalAddMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const toast = useToast();
  return useMutation(query, {
    onSuccess: () => {
      queryClient.refetchQueries();
      dispatch(resetCart());
      history.push('/');
      toast({
        title: 'Удачно',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast({
        title: 'Ошибка',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useJournalPaymentDeleteMutation = () => {
  const queryClient = useQueryClient();

  const toast = useToast();
  return useMutation(
    (id: number) => api.delete(`/journal/removePayment/${id}`),
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
      onError: (error, variables, context) => {
        console.log(error);
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

export const useJournalPaymentAddMutation = () => {
  const queryClient = useQueryClient();

  const toast = useToast();
  return useMutation(
    (paymentInfo: IAddPayment) => api.post(`/journal/addPayment`, paymentInfo),
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
      onError: (error, variables, context) => {
        console.log(error);
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

export const useJournalReturnMutation = () => {
  const queryClient = useQueryClient();

  const toast = useToast();
  return useMutation(
    (paymentInfo: ReturnProductDto) => api.post(`/journal/return`, paymentInfo),
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
      onError: (error, variables, context) => {
        console.log(error);
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
