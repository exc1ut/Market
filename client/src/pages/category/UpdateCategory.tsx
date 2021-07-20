import { Modal } from '@chakra-ui/modal';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Checkbox,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategoryUpdate } from '../../api/useCategory';
import { FormInput } from '../../components/Form/FormInput';
import { FormNumberInput } from '../../components/Form/FormNumberInput';
import { FormSelect } from '../../components/Form/FormSelect';
import { Category } from '../../interfaces/prisma';
import { checkEmptyObject } from '../../utils/app';
import { CategorySchema } from './form.schema';

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  categoryInfo: Category | null;
}

export const UpdateCategory: React.FC<AddCategoryProps> = ({
  isOpen,
  onClose,
  categoryInfo,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: classValidatorResolver(CategorySchema),
  });
  const [isChecked, setIsChecked] = useState(false);
  const category = useCategoryUpdate();

  const onSubmit = (data: any) => {
    category.mutate({ id: categoryInfo?.id || 0, category: data });
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
          <ModalHeader>Добавить категорию</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {!checkEmptyObject(errors) && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Ошибка</AlertTitle>
                </Alert>
              )}
              <FormInput
                name="name"
                register={register}
                title="Добавить категорию"
                defaultValue={categoryInfo?.name}
              />
              <FormSelect
                name="type"
                register={register}
                title="Тип категории"
                options={[{ title: 'Весовые товары', value: '1' }]}
                defaultValue={categoryInfo?.type}
              />
              <FormInput
                name="unit"
                register={register}
                title="Единица измерения"
                defaultValue={categoryInfo?.unit}
              />
              <FormNumberInput
                name="sale"
                register={register}
                title="Максимальная скидка"
                formNumberInput={{
                  max: 100,
                  min: 0,
                }}
                setValue={setValue}
                defaultValue={categoryInfo?.sale!}
              />
              <FormControl>
                <FormLabel>
                  <Checkbox
                    onChange={() => setIsChecked(!isChecked)}
                    isChecked={isChecked}
                    defaultIsChecked
                  >
                    НДС
                  </Checkbox>
                </FormLabel>
                {isChecked && (
                  <NumberInput
                    {...register('tax')}
                    onChange={(e) => setValue('tax', +e)}
                    defaultValue={categoryInfo?.tax!}
                    name="tax"
                    min={0}
                    max={100}
                    step={0.1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              </FormControl>
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
