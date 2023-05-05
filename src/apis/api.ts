import axios from 'axios';
import type { TGetArticle } from '@/types/articleTypes';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getTodayArticle = async () => {
  const { data } = await api.get<{ result?: TGetArticle; ok: boolean }>('/api/files/today');

  return data;
};
