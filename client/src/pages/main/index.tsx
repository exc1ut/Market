import { Button, IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Icon, SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { removeClient, totalCost } from '../../store/slices/cart.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { CartTable } from './CartTable';
import { ProductList } from './ProductList';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { Client } from './client';
import { useClientOne } from '../../api/useClients';
import { useHistory } from 'react-router';

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const [search, setSearch] = useState('');
  const modal = useDisclosure();
  const clientModal = useDisclosure();
  const total = useAppSelector(totalCost);
  const clientState = useAppSelector((state) => state.cartSlice.client);
  const dispatch = useAppDispatch();
  const clientData = useClientOne(clientState?.connect.id || 0);
  const history = useHistory();

  useEffect(() => {
    clientData.refetch();
  }, [clientState]);

  const handleClientChange = () => {
    if (!!clientState) {
      dispatch(removeClient());
    } else {
      clientModal.onOpen();
    }
  };

  const handleCheckout = () => {
    if (!(total <= 0)) history.push('/checkout');
  };

  return (
    <Box p={5}>
      <Modal title="" size="6xl" onClose={modal.onClose} isOpen={modal.isOpen}>
        <ProductList search={search} />
      </Modal>
      <Modal
        title="Клиент"
        size="6xl"
        onClose={clientModal.onClose}
        isOpen={clientModal.isOpen}
      >
        <Client onClose={clientModal.onClose} />
      </Modal>
      <Flex>
        <Input
          placeholder="Поиск товаров"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          w={250}
          variant="filled"
        />
        <IconButton
          aria-label="search"
          ml={3}
          colorScheme="blue"
          variant="outline"
          onClick={() => modal.onOpen()}
          icon={<SearchIcon />}
        />
      </Flex>
      <Box
        borderWidth={1}
        borderColor="gray.200"
        borderRadius={20}
        my={5}
        p={2}
        height="50vh"
        overflow="auto"
      >
        <CartTable />
      </Box>
      <Flex justifyContent="space-between">
        <HStack alignItems="flex-start" spacing={10}>
          <Text fontWeight="medium" fontSize="2xl">
            Сумма: {total}
          </Text>
          <Divider orientation="vertical" />
          <Box>
            <Box>
              <Checkbox py={2}>Печатать</Checkbox>
              <Checkbox
                isChecked={!!clientState}
                onChange={() => handleClientChange()}
                pl={5}
                py={2}
              >
                Покупатель
              </Checkbox>
            </Box>
            {clientState && (
              <Box>
                <Text>Имя клиента: {clientData.data?.name}</Text>
                <Text>Долг: {clientData.data?.dept}</Text>
              </Box>
            )}
          </Box>

          <Flex flexDirection="column" alignItems="flex-end">
            <Button
              onClick={() => handleCheckout()}
              colorScheme="blue"
              mb={5}
              w={150}
              h={55}
            >
              Итог
              <Icon ml={2} w={6} h={6} as={TiTick} />
            </Button>
            <Button w={100} colorScheme="red">
              Отмена
              <Icon ml={2} w={3} h={3} as={ImCross} />
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};
