import axios from '@/config/axios.config';

export const getAllProducts = async () => {
  const res = await axios.get('/products');
  return res.data;
};
