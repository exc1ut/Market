import { useMutation, useQueryClient } from 'react-query';
import { api } from '../utils/axios';

interface ILogin {
  name: string;
  password: string;
}

export const useAuthLoginMutation = () => {
  return useMutation((data: ILogin) => api.post(`/auth/login`, data));
};
