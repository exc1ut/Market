import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  defaultValue?: string;
  title: string;
}

export const FormTextarea: React.FC<FormInputProps> = ({
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
