import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/tag';
import React, { useState } from 'react';
import { useCategories } from '../../api/useCategories';
import { useProduct } from '../../api/useProduct';
import { useProducts } from '../../api/useProducts';
import { AddProduct } from './AddProduct';
import { ProductTable } from './ProductTable';
import { UpdateProduct } from './UpdateProduct';

interface indexProps {}

export const Product: React.FC<indexProps> = ({}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const productUpdate = useDisclosure();
  const categories = useCategories();
  const [tag, setTag] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const categoryIds = tag.map((val) => val.id);
  const products = useProducts(name, categoryIds);
  const product = useProduct(id);

  const handleAddTag = (id: number) => {
    const exist = tag.find((val) => val.id === id);
    const name = categories.data?.find((val) => val.id === id)?.name;
    if (!exist && name) {
      setTag([...tag, { id, name }]);
    }
  };

  const handleDeleteTag = (id: number) => {
    const filtered = tag.filter((val) => val.id !== id);
    setTag(filtered);
  };

  const handleUpdate = (id: number) => {
    setId(id);
    productUpdate.onOpen();
  };

  return (
    <Box p={5}>
      <AddProduct isOpen={isOpen} onClose={onClose} />
      <UpdateProduct
        id={id}
        isOpen={productUpdate.isOpen}
        onClose={productUpdate.onClose}
        productInfo={product.data}
        isLoading={product.isLoading}
      />
      <Flex justifyContent="space-between">
        <Text fontWeight={500} fontSize="2xl">
          Каталог товаров
        </Text>
        <IconButton
          isRound
          colorScheme="blue"
          aria-label="product add"
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </Flex>
      <HStack spacing={3}>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          variant="filled"
          w={300}
          placeholder="Поиск товаров"
        />
        <Select
          onChange={(e) => handleAddTag(+e.target.value)}
          placeholder="Выберите категорию"
          w={300}
        >
          {categories.data?.map((val, key) => (
            <option key={key} value={val.id}>
              {val.name}
            </option>
          ))}
        </Select>
        <HStack wrap="wrap" spacing={2}>
          {tag.map((val, key) => (
            <Tag
              my={2}
              size="md"
              key={key}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>{val.name}</TagLabel>
              <TagCloseButton onClick={() => handleDeleteTag(val.id)} />
            </Tag>
          ))}
        </HStack>
      </HStack>
      <Box py={5}>
        {products.isLoading ? null : (
          <ProductTable handleUpdate={handleUpdate} products={products.data!} />
        )}
      </Box>
    </Box>
  );
};
