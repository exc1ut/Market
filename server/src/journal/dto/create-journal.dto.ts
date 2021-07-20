import { paymentMethod } from 'src/enums/paymentMethod.enum';

export class CreateJournalDto {
  products: Product[];
  userId: number;
  payments: Payment[];
  total: number;
  paid: number;
  sale?: number;
  withoutSale?: number;
}

type Product = {
  productId: number;
  quantity: number;
  sale: number;
  total: number;
};

type Payment = {
  price: number;
  paymentMethod: paymentMethod;
  comment: string;
};
