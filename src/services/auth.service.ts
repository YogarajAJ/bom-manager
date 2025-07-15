import axios from '@/config/axios.config';

export interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await axios.post('/auth/login', payload);
  return response.data;
};