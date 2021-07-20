import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControlProps,
  NumberInputProps,
} from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';

interface FormNumberInputProps extends FormControlProps {
  register: UseFormRegister<any>;
  name: string;
  defaultValue?: string | number;
  setValue: UseFormSetValue<any>;
  title: string;
  formNumberInput?: NumberInputProps;
}

export const FormNumberInput: React.FC<FormNumberInputProps> = ({
  register,
  name,
  defaultValue,
  setValue,
  title,
  formNumberInput,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <FormLabel>{title}</FormLabel>
      <NumberInput
        {...register(name)}
        {...formNumberInput}
        onChange={(e) => setValue(name, +e)}
        defaultValue={defaultValue}
        name="sale"
        min={0}
        step={1}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};
