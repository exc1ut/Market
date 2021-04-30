import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Option = {
  value: string | number;
  title: string;
};

interface FormInputProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  defaultValue?: string;
  options: Option[];
  title: string;
}

export const FormSelect: React.FC<FormInputProps> = ({
  register,
  name,
  defaultValue,
  options,
  title,
}) => {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Select
        {...register(name)}
        defaultValue={defaultValue}
        placeholder="Select option"
      >
        {options.map((value, index) => (
          <option key={index} value={value.value}>
            {value.title}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
