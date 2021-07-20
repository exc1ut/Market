import { useQuery } from 'react-query';
import { api } from '../utils/axios';
import { IJournalProductFindOne } from '../interfaces/IJournalProductFindOne';

const fetchOneJournalProduct = async (id: number) => {
  const { data } = await api.get(`/journal/${id}`);
  return data as IJournalProductFindOne;
};

export const useOneJournalProduct = (id: number) => {
  return useQuery(['journalProductOne', id], () => fetchOneJournalProduct(id));
};
