import { Button } from '@chakra-ui/button';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useClientCreate } from '../../../api/useClient';
import { FormInput } from '../../../components/Form/FormInput';
import { FormNumberInput } from '../../../components/Form/FormNumberInput';
import { ClientSchema } from './client.schema';

interface AddClientProps {}

type ClientType = {
  name: string;
  email: string;
  number: number;
  birthDate: Date;
  dept: number;
};

export const AddClient: React.FC<AddClientProps> = ({}) => {
  const { register, setValue, handleSubmit } = useForm<ClientSchema>({
    defaultValues: {
      name: '',
      email: '',
      number: '',
      birthDate: new Date(),
      dept: 0,
    },
    resolver: classValidatorResolver(ClientSchema),
  });

  const client = useClientCreate();
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setValue('birthDate', date);
  };

  const onSubmit = (data: ClientType) => {
    client.mutate(data);
  };

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <FormInput register={register} name="name" title="ФИО" />
          <FormNumberInput
            setValue={setValue}
            register={register}
            name="number"
            title="Номер телефона"
          />
          <FormInput
            register={register}
            name="email"
            title="Электронная почта"
          />
          <Box w="100%">
            <Text fontWeight="medium" fontSize="md">
              Дата
            </Text>
            <Box fontSize="xl">
              <ReactDatePicker
                selected={startDate}
                onChange={handleDateChange}
              />
            </Box>
          </Box>
          <FormInput register={register} name="address" title="Адрес" />
          <FormInput register={register} name="comment" title="Коммент" />
          <Button colorScheme="blue" type="submit">
            Добавить
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
