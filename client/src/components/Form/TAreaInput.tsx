import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  register: UseFormRegister<any>;
  name: string;
  defaultValue?: string;
  title: string;
}

export const TArea: React.FC<FormInputProps> = ({
  register,
  name,
  defaultValue,
  title,
}) => {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Textarea
        {...register(name)}
        defaultValue={defaultValue}
        variant="filled"
      />
    </FormControl>
  );
};
