import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { JournalContext } from '.';
import { useJournalPaymentDeleteMutation } from '../../api/useJournalMutations';
import { useOneJournalProduct } from '../../api/useOneJournalProduct';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';
import { formatDate } from '../../utils/app';
import { JournalAddPaymentForm } from './JournalAddPaymentForm';

interface JournalPaymentsProps {}
export const JournalPayments: React.FC<JournalPaymentsProps> = ({}) => {
  const journalId = useContext(JournalContext);
  const modal = useDisclosure();

  const journal = useOneJournalProduct(journalId || 0);
  const paymentMutation = useJournalPaymentDeleteMutation();

  const seller = journal.data?.journal.seller.name;

  const journalPayments = journal.data?.journal.journalPayments.map((v) => ({
    ...v,
    date: formatDate(v.date),
    seller,
  }));

  const handleDelete = (id: number) => {
    paymentMutation.mutate(id);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Дата',
        accessor: 'date',
      },
      {
        Header: 'Сумма',
        accessor: 'price',
      },
      {
        Header: 'Способ оплаты',
        accessor: 'paymentMethod',
      },
      {
        Header: 'Комментарий',
        accessor: 'comment',
      },
      {
        Header: 'Подпись',
        accessor: 'seller',
      },
      {
        id: 'delete',
        accessor: 'id',
        Cell: ({ value }: any) => (
          <IconButton
            variant="ghost"
            aria-label="delete"
            size="xs"
            onClick={() => handleDelete(value)}
            icon={<DeleteIcon />}
          />
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => journalPayments, [journalPayments]);

  if (!journal.data) return null;

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        title="Добавить оплату"
        size="xs"
      >
        <JournalAddPaymentForm onClose={modal.onClose} />
      </Modal>
      <Flex pb={3} justifyContent="flex-end" w="auto">
        <Button onClick={modal.onOpen} colorScheme="blue">
          Добавить оплату
        </Button>
      </Flex>
      <Box borderWidth={1} borderColor="gray.200" borderRadius="md">
        <Table columns={columns} data={data} />
      </Box>
    </>
  );
};
