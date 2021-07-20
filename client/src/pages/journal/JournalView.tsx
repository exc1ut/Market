import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { useOneJournalProduct } from '../../api/useOneJournalProduct';
import { formatDate } from '../../utils/app';
import { JournalTabs } from './JournalTabs';

interface JournalViewProps {
  id: number;
}

export const JournalLeftContext = React.createContext<number | undefined>(
  undefined
);

export const JournalView: React.FC<JournalViewProps> = ({ id }) => {
  const { data: journalProduct } = useOneJournalProduct(id);
  const date = journalProduct && formatDate(journalProduct?.journal.date);

  const paid = React.useMemo(
    () =>
      journalProduct?.journal.journalPayments.reduce(
        (acc, val) => val.price + acc,
        0
      ),
    [journalProduct]
  );

  const left = journalProduct && paid && journalProduct.total - paid;

  return (
    <JournalLeftContext.Provider value={left}>
      <Box borderRadius="md" borderWidth={1} p={3} borderColor="gray.200">
        <VStack
          alignItems="flex-start"
          justifyContent="center"
          spacing={3}
          h={150}
          wrap="wrap"
        >
          <Flex justifyContent="space-between" w={450}>
            <Text>Продажа №:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.id}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Дата:</Text>
            <Text fontWeight="medium" as="span">
              {date}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Покупатель:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.client?.name}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Продавец:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.seller.name}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Сумма без скидки:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.withoutSale}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Скидка по чеку:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.sale}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Итого:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.total}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w={450}>
            <Text>Оплачено:</Text>
            <Text fontWeight="medium" as="span">
              {journalProduct?.journal.paid}
            </Text>
          </Flex>
        </VStack>
      </Box>
      <JournalTabs />
    </JournalLeftContext.Provider>
  );
};
