import { Modal } from '@chakra-ui/modal';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCategories } from '../../api/useCategories';
import { useProductUpdate } from '../../api/useProduct';
import { FormInput } from '../../components/Form/FormInput';
import { FormNumberInput } from '../../components/Form/FormNumberInput';
import { FormSelect } from '../../components/Form/FormSelect';
import { FormTextarea } from '../../components/Form/FormTextArea';
import { Category, Product } from '../../interfaces/prisma';

interface UpdateProductProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  productInfo: Product | undefined;
  isLoading: boolean;
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({
  isOpen,
  onClose,
  productInfo,
  isLoading,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const product = useProductUpdate();
  const categories = useCategories();

  const options = categories.data?.map((category: Category) => ({
    value: category.id,
    title: category.name,
  }))!;

  const onSubmit = (data: any) => {
    data.categoryId = +data.categoryId;
    data.id = productInfo?.id;
    console.log(data);
    product.mutate(data);
  };

  useEffect(() => reset(), []);

  const handleClose = () => {
    reset();
    onClose();
  };

  if (isLoading) return null;
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Добавить товара</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <FormInput
                defaultValue={productInfo?.name}
                name="name"
                register={register}
                title="Наименование"
              />
              <FormSelect
                name="categoryId"
                register={register}
                defaultValue={'' + productInfo?.categoryId}
                title="Категория"
                options={options}
              />
              <FormNumberInput
                name="cost"
                register={register}
                defaultValue={productInfo?.cost}
                title="Розничная цена"
                setValue={setValue}
              />
              <FormNumberInput
                name="available"
                register={register}
                defaultValue={productInfo?.available}
                title="Остатки в наличии"
                setValue={setValue}
              />
              <FormTextarea
                name="description"
                defaultValue={productInfo?.description || ''}
                register={register}
                title="Описание"
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              Добавить
            </Button>
            <Button onClick={handleClose} variant="ghost">
              Закрыть
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
