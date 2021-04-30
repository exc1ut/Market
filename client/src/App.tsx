import { AppRoute } from './AppRoute';
import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Navbar } from './components/Navbar';
import './index.css';

export default function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <AppRoute />
    </ChakraProvider>
  );
}
