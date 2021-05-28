import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/tag';
import React, { useMemo, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useCategories } from '../../api/useCategories';
import { useTag } from '../../utils/useTag';
import { JournalTable } from './JournalTable';
import { useJournalProducts } from '../../api/useJournalProducts';
import { IGetProductsDto } from '../../interfaces/IGetProducts';
import { userUsers } from '../../api/useUsers';
import { Modal } from '../../components/Modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { JournalView } from './JournalView';
import { subDays } from 'date-fns';

interface indexProps {}

export const JournalContext = React.createContext<undefined | number>(
  undefined
);

const today = subDays(new Date(), 1);
const yesterday = subDays(new Date(), 2);
const week = subDays(new Date(), 7);
const month = subDays(new Date(), 30);

export const Journal: React.FC<indexProps> = ({}) => {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(today);
  const [searchText, setSearchText] = useState('');
  const [seller, setSeller] = useState<undefined | number>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<number | undefined>(
    undefined
  );
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(
    undefined
  );
  const categories = useCategories();
  const users = userUsers();
  const { tags, handleAddTag, handleDeleteTag } = useTag();
  const modal = useDisclosure();

  const categoryIds = useMemo(() => tags.map((v) => v.id), [tags]);

  const inputs: IGetProductsDto = {
    dateFrom: startDate.toDateString(),
    dateTo: endDate.toDateString(),
    categories: categoryIds.length ? categoryIds : undefined,
    name: searchText,
    seller,
    paymentMethod,
  };

  const journalProducts = useJournalProducts(inputs);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const id = +e.target.value;
    const name = categories.data?.find((val) => val.id === id)?.name;
    handleAddTag(id, name!);
  };

  const handleSellerChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const userId = e.target.value !== '' ? +e.target.value : undefined;
    console.log(e.target.value);
    setSeller(userId);
  };

  const handleView = (id: number) => {
    setSelectedProduct(id);
    modal.onOpen();
  };

  return (
    <JournalContext.Provider value={selectedProduct}>
      <Box h="100vh" p={5}>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.onClose}
          title="Журнал"
          size="6xl"
        >
          {selectedProduct && <JournalView id={selectedProduct} />}
        </Modal>
        <Flex justifyContent="space-between">
          <Text fontSize="2xl" color="gray.900">
            Журнал продаж
          </Text>
          <HStack spacing={2}>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setStartDate(today)}
            >
              Сегодня
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setStartDate(yesterday)}
            >
              Вчера
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setStartDate(week)}
            >
              Неделя
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setStartDate(month)}
            >
              Месяц
            </Button>
            <Divider orientation="vertical" />
            <Flex>
              <Input
                as={ReactDatePicker}
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                w={150}
              />
              <Input
                as={ReactDatePicker}
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                w={150}
                ml={2}
              />
            </Flex>
          </HStack>
        </Flex>
        <Flex mt={4}>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Поиск"
            w={300}
            variant="filled"
          />
          <Select
            onChange={handleCategoryChange}
            placeholder="Выберите категорию"
            w={300}
            ml={5}
          >
            {categories.data?.map((val) => (
              <option value={val.id}>{val.name}</option>
            ))}
          </Select>
          <HStack wrap="wrap" mx={3} spacing={3}>
            {tags.map((val) => (
              <Tag
                size="md"
                key={val.id}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>{val.name}</TagLabel>
                <TagCloseButton onClick={() => handleDeleteTag(val.id)} />
              </Tag>
            ))}
          </HStack>
        </Flex>
        <Flex py={4}>
          <VStack alignItems="flex-start">
            <Text fontWeight="bold" fontSize="md">
              Продавец
            </Text>
            <Select
              placeholder="Все пользователи"
              size="md"
              onChange={handleSellerChange}
              variant="filled"
            >
              {users.data?.map((user) => (
                <option value={user.id}>{user.name}</option>
              ))}
            </Select>
          </VStack>
          <VStack ml={10} alignItems="flex-start">
            <Text fontWeight="bold" fontSize="md">
              Способ оплаты
            </Text>
            <Select
              placeholder="Любой"
              size="md"
              onChange={(e) => setPaymentMethod(e.target.value || undefined)}
              variant="filled"
            >
              <option value="cash">Наличные</option>
              <option value="card">Карта</option>
              <option value="cashless">Безналичные</option>
            </Select>
          </VStack>
        </Flex>

        <Box>
          {journalProducts.data && (
            <JournalTable
              handleView={handleView}
              journalProducts={journalProducts.data}
            />
          )}
        </Box>
      </Box>
    </JournalContext.Provider>
  );
};
