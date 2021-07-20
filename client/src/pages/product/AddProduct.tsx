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
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCategories } from '../../api/useCategories';
import { useProductAdd } from '../../api/useProduct';
import { FormError } from '../../components/Form/Error';
import { FormInput } from '../../components/Form/FormInput';
import { FormNumberInput } from '../../components/Form/FormNumberInput';
import { FormSelect } from '../../components/Form/FormSelect';
import { TArea } from '../../components/Form/TAreaInput';
import { Category } from '../../interfaces/prisma';
import { checkEmptyObject } from '../../utils/app';
import { ProductSchema } from './product.schema';

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProduct: React.FC<AddCategoryProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: classValidatorResolver(ProductSchema),
  });
  const product = useProductAdd();
  const categories = useCategories();
  console.log(errors);

  const options = categories.data?.map((category: Category) => ({
    value: category.id,
    title: category.name,
  }))!;

  const onSubmit = (data: any) => {
    data.categoryId = +data.categoryId;
    product.mutate(data);
  };

  useEffect(() => reset(), []);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Добавить товара</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {!checkEmptyObject(errors) && <FormError title="Ошибка" />}
              <FormInput name="name" register={register} title="Наименование" />
              <FormSelect
                name="categoryId"
                register={register}
                title="Категория"
                options={options}
              />
              <FormNumberInput
                name="cost"
                register={register}
                title="Розничная цена"
                setValue={setValue}
              />
              <FormNumberInput
                name="available"
                register={register}
                title="Остатки в наличии"
                setValue={setValue}
              />
              <TArea name="description" register={register} title="Описание" />
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
