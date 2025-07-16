import axios from '@/config/axios.config';

export const getBomsByProduct = async (productId: string) => {
  const res = await axios.get(`/boms/by-product/${productId}`);
  return res.data; // or res.data.data if API wraps it
};

export const getBomItemsByBomId = async (bomId: string) => {
  const res = await axios.get(`/bom-items/by-bom/${bomId}`);
  return res.data;
};
