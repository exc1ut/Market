import { Button } from '@chakra-ui/button';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ItemProps {
  path: string;
  title: string;
}

export const NavItem: React.FC<ItemProps> = ({ path, title }) => {
  const location = useLocation();
  console.log(location.pathname);
  const isCurrent = location.pathname === path;
  return (
    <Button
      colorScheme={isCurrent ? 'green' : ''}
      as={Link}
      variant="ghost"
      to={path}
    >
      {title}
    </Button>
  );
};
