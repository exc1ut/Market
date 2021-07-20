import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { Alert, AlertIcon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { JournalContext } from '.';
import { useJournalReturnMutation } from '../../api/useJournalMutations';
import { useOneJournalProduct } from '../../api/useOneJournalProduct';

interface JournalReturnAddFormProps {
  onClose: () => void;
}

interface IForm {
  quantity: string;
}

export const JournalReturnAddForm: React.FC<JournalReturnAddFormProps> = ({
  onClose,
}) => {
  const journalProductId = useContext(JournalContext);
  const journalProduct = useOneJournalProduct(journalProductId || 0);
  const journalReturnMutation = useJournalReturnMutation();
  const quantity = journalProduct.data?.quantity;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>({
    defaultValues: {
      quantity: '' + quantity,
    },
  });

  const onSubmit = (data: IForm) => {
    journalReturnMutation.mutate({
      quantity: +data.quantity,
      journalProductId: journalProductId || 0,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3}>
        {errors.quantity && (
          <Alert status="error">
            <AlertIcon />
            Макс {quantity}
          </Alert>
        )}
        <Input {...register('quantity', { max: quantity })} />
        <Button type="submit" colorScheme="blue">
          Return
        </Button>
      </VStack>
    </form>
  );
};
