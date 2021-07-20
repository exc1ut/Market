import { useQuery } from 'react-query';
import { Client } from '../interfaces/prisma';
import { api } from '../utils/axios';

const fetchCategories = async () => {
  const { data } = await api.get('/client');
  return data as Client[];
};

export const useClients = () => {
  return useQuery('clients', fetchCategories);
};

const fetchOneClient = async (id: number) => {
  const { data } = await api.get(`/client/${id}`);
  return data as Client;
};

export const useClientOne = (id: number) => {
  return useQuery(['singleClient', id], () => fetchOneClient(id));
};
