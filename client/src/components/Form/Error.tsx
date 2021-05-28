import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

interface ErrorProps {
  title: string;
}

export const FormError: React.FC<ErrorProps> = ({ title }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
    </Alert>
  );
};
