import { Button } from '@chakra-ui/button';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';

interface indexProps {}

export const Navbar: React.FC<indexProps> = ({}) => {
  return (
    <Box>
      <Flex justifyContent="space-between" p={3}>
        <Text fontSize="2xl" fontWeight="bold">
          App logo
        </Text>
        <Flex>
          <NavItem path="/" title="Главное" />
          <NavItem path="/product" title="Продукты" />
          <NavItem path="/category" title="Категории" />
          <NavItem path="/journal" title="Журнал" />
          <NavItem path="/settings" title="Настройки" />
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
};
