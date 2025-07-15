import axios from '@/config/axios.config';

export const fetchAllItems = async (module: string) => {
  const res = await axios.get(`/${module}`);
  return res.data;
};

export const addItem = async (module: string, payload: any) => {
  const res = await axios.post(`/${module}`, payload);
  return res.data;
};

export const updateItem = async (module: string, id: string, payload: any) => {
  const res = await axios.put(`/${module}/${id}`, payload);
  return res.data;
};

export const deleteItem = async (module: string, id: string) => {
  const res = await axios.delete(`/${module}/${id}`);
  return res.data;
};
