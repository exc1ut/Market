import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Tr } from '@chakra-ui/table';
import React, { useState } from 'react';
import { useCategories } from '../../api/useCategories';
import { useCategoryDelete } from '../../api/useCategory';
import { Category as ICategory } from '../../interfaces/prisma';
import { AddCategory } from './AddCategory';
import { UpdateCategory } from './UpdateCategory';

interface indexProps {}

export const Category: React.FC<indexProps> = ({}) => {
  const categories = useCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const update = useDisclosure();
  const categoryDelete = useCategoryDelete();
  const [
    updateCategorySelect,
    setUpdateCategorySelect,
  ] = useState<ICategory | null>(null);

  const handleUpdate = (category: ICategory) => {
    setUpdateCategorySelect(category);
    update.onOpen();
  };
  return (
    <Center pt={10} flexDirection="column">
      <AddCategory isOpen={isOpen} onClose={onClose} />
      <UpdateCategory
        categoryInfo={updateCategorySelect}
        isOpen={update.isOpen}
        onClose={update.onClose}
      />
      <Box w={600}>
        <Flex mb={5} py={2} justifyContent="space-between">
          <Text fontWeight="bold" fontSize="xl">
            Категории товаров
          </Text>
          <IconButton
            onClick={onOpen}
            aria-label="add"
            isRound
            colorScheme="blue"
            icon={<AddIcon />}
          />
        </Flex>
        <Table colorScheme="twitter" variant="striped">
          <Tbody>
            {categories.data?.map((category) => (
              <Tr>
                <Td>
                  <Flex justifyContent="space-between">
                    <Text>{category.name}</Text>
                    <Flex>
                      <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label="edit"
                        onClick={() => handleUpdate(category)}
                        icon={<EditIcon />}
                      />
                      <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label="delete"
                        onClick={() => categoryDelete.mutate(category.id)}
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};
