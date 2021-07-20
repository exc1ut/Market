import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { UseQueryResult } from 'react-query';
import { Product } from './prisma';

export interface IFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  product: UseQueryResult<Product, unknown>;
  watch: UseFormWatch<any>;
  setTotal: (num: number) => void;
}
