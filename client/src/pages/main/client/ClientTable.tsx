import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';
import React from 'react';
import { useClients } from '../../../api/useClients';
import { addClient } from '../../../store/slices/cart.slice';
import { useAppDispatch } from '../../../store/store';

interface ClientTableProps {
  onClose: () => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({ onClose }) => {
  const clients = useClients();
  const dispatch = useAppDispatch();

  const handleClick = (id: number) => {
    dispatch(addClient(id));
    onClose();
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ФИО</Th>
          <Th>Телефон</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clients.data?.map((client) => (
          <Tr
            key={client.id}
            cursor="pointer"
            onClick={() => handleClick(client.id)}
          >
            <Td>{client.name}</Td>
            <Td>{client.number}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
