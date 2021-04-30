import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Modal } from '../../../components/Modal';
import { AddClient } from './AddClient';
import { ClientTable } from './ClientTable';

interface indexProps {
  onClose: () => void;
}

export const Client: React.FC<indexProps> = ({ onClose }) => {
  const modal = useDisclosure();
  return (
    <Box p={3}>
      <Flex justifyContent="space-between">
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.onClose}
          title="Добавить клиента"
          size="2xl"
        >
          <AddClient />
        </Modal>
        <Input placeholder="Поиск клиентов" w={200} variant="filled" />
        <IconButton
          onClick={() => modal.onOpen()}
          aria-label="add"
          colorScheme="blue"
          icon={<AddIcon />}
        />
      </Flex>
      <ClientTable onClose={onClose} />
    </Box>
  );
};
