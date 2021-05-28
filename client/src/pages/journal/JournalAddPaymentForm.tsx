import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { JournalContext } from '.';
import {
  useJournalAddMutation,
  useJournalPaymentAddMutation,
} from '../../api/useJournalMutations';
import { useJournalProducts } from '../../api/useJournalProducts';
import { useOneJournalProduct } from '../../api/useOneJournalProduct';
import { JournalLeftContext } from './JournalView';

interface JournalAddPaymentFormProps {
  onClose: () => void;
}

export const JournalAddPaymentForm: React.FC<JournalAddPaymentFormProps> = ({
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 0,
      paymentMethod: 'cash',
    },
  });

  const left = useContext(JournalLeftContext);
  const journalProductId = useContext(JournalContext);
  const journalProduct = useOneJournalProduct(journalProductId || 0);
  const journalAddMutation = useJournalPaymentAddMutation();

  const journalId = journalProduct.data?.journalId;

  const onSubmit = (data: any) => {
    console.log(data);
    journalAddMutation.mutate({ ...data, price: +data.price, journalId });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w="auto" spacing={3}>
        {errors.price && (
          <Alert status="error">
            <AlertIcon />
            Макс {left}
          </Alert>
        )}

        <Input
          isInvalid={!!errors.price}
          type="number"
          {...register('price', { max: left })}
          placeholder="Сумма"
        />
        <Select {...register('paymentMethod')}>
          <option value="cash">Наличные</option>
          <option value="card">Карта</option>
          <option value="cashless">Безналичные</option>
        </Select>
        <Button type="submit" colorScheme="blue">
          Оплатить
        </Button>
      </VStack>
    </form>
  );
};
