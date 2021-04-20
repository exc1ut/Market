import { paymentMethod } from 'src/enums/paymentMethod.enum';

export class CreateJournalDto {
  products: Product[];
  payments: Payment[];
  total: number;
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
