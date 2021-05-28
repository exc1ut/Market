import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { JournalContext } from '.';
import { useOneJournalProduct } from '../../api/useOneJournalProduct';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';
import { formatDate } from '../../utils/app';
import { JournalReturnAddForm } from './JournalReturnAddForm';

interface JournalReturnsProps {}

export const JournalReturns: React.FC<JournalReturnsProps> = ({}) => {
  const journalId = useContext(JournalContext);

  const modal = useDisclosure();

  const journal = useOneJournalProduct(journalId || 0);

  const seller = journal.data?.journal.seller;

  const journalReturn = journal.data?.journal.journalReturn.map((v) => ({
    ...v,
    date: formatDate(v.date),
    seller,
  }));

  console.log(journalReturn);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Дата',
        accessor: 'date',
      },
      {
        Header: 'Наименование',
        accessor: 'product.name',
      },
      {
        Header: 'Продано',
        accessor: 'sold',
      },
      {
        Header: 'Возращено',
        accessor: 'returned',
      },
      {
        Header: 'Подпись',
        accessor: 'seller.name',
      },
    ],
    []
  );

  const data = React.useMemo(() => journalReturn, [journalReturn]);

  if (!journal.data) return null;

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        title="Возрат"
        size="xs"
      >
        <JournalReturnAddForm onClose={modal.onClose} />
      </Modal>
      <Flex mb={3} justifyContent="flex-end">
        <Button onClick={modal.onOpen} colorScheme="blue">
          Return
        </Button>
      </Flex>
      <Box borderWidth={1} borderColor="gray.200" borderRadius="md">
        <Table columns={columns} data={data} />
      </Box>
    </>
  );
};
