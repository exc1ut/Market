import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps extends FormControlProps {
  register: UseFormRegister<any>;
  name: string;
  defaultValue?: string;
  title: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  register,
  name,
  defaultValue,
  title,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <FormLabel>{title}</FormLabel>
      <Input {...register(name)} defaultValue={defaultValue} variant="filled" />
    </FormControl>
  );
};
