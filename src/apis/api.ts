import axios from 'axios';
import type { TGetArticle, TPostArticle } from '@/types/articleTypes';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getTodayArticle = async () => {
  const { data } = await api.get<{ result?: TGetArticle; ok: boolean }>('/api/files/today');

  return data;
};

export const postArticle = async (file: TPostArticle) => {
  const formData = new FormData();

  formData.append('region', file.region);
  formData.append('temp_now', String(file.temp_now));
  formData.append('temp_feels', String(file.temp_feels));
  formData.append('temp_min', String(file.temp_min));
  formData.append('temp_max', String(file.temp_max));
  formData.append('description', file.description);
  formData.append('image', file.image);

  const { data } = await api.post('/api/files', formData);

  return data;
};