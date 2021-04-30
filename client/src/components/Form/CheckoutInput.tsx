import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
import React from 'react';

interface CheckoutInputProps extends InputProps {
  title: string;
}

export const CheckoutInput: React.FC<CheckoutInputProps> = ({
  title,
  ...props
}) => {
  return (
    <Flex justifyContent="space-between" w="100%">
      <Text fontSize="md">{title}</Text>
      <Input {...props} w="50%" />
    </Flex>
  );
};
