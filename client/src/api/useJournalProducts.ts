import { useQuery } from 'react-query';
import { api } from '../utils/axios';
import { IGetProductsDto } from '../interfaces/IGetProducts';
import { IJournalProductsWithRelations } from '../interfaces/IJournalProductsWithRelations';

const fetchJournalProducts = async (info: IGetProductsDto) => {
  const { data } = await api.post('/journal/getProducts', info);
  return data as IJournalProductsWithRelations[];
};

export const useJournalProducts = (data: IGetProductsDto) => {
  return useQuery(['journalProducts', data], () => fetchJournalProducts(data));
};
