import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { getRoles } from '@testing-library/dom';
import React from 'react';
import { Link } from 'react-router-dom';
import { generateRandomColor } from '../../utils/app';
import { getRole } from '../../utils/role';

interface indexProps {
  name: string;
  role: number;
  id: number;
}

export const List: React.FC<indexProps> = ({ name, role, id }) => {
  const color = generateRandomColor();
  return (
    <Box>
      <Button
        as={Link}
        to={`/${id}/${name}`}
        colorScheme={color}
        variant="ghost"
        height="auto"
      >
        <Flex w={250} padding={2}>
          <Center>
            <Box
              px={3}
              py={2}
              color="white"
              borderRadius="50%"
              textTransform="uppercase"
              bgColor={color + '.600'}
            >
              <Text fontSize="xl">{name[0]}</Text>
            </Box>
          </Center>
          <Flex
            color="gray.700"
            flexDirection="column"
            justifyContent="space-around"
            pl={3}
          >
            <Text
              fontWeight="bold"
              fontSize="sm"
              textAlign="left"
              textTransform="capitalize"
            >
              {name}
            </Text>
            <Text fontSize="xs">{getRole(role)}</Text>
          </Flex>
        </Flex>
      </Button>
    </Box>
  );
};
