export interface IGetProductsDto {
  dateFrom: string;
  dateTo: string;
  name?: string;
  categories?: number[];
  paymentMethod?: string;
  seller?: number;
}
