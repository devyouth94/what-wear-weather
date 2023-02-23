import { PostData } from '@/lib/constants/types';
import instance from '@/lib/utils/instance';
import { useMutation } from '@tanstack/react-query';

const postFile = async (file: PostData) => {
  const formData = new FormData();

  formData.append('region', file.region);
  formData.append('temp_now', String(file.temp_now));
  formData.append('temp_feels', String(file.temp_feels));
  formData.append('temp_min', String(file.temp_min));
  formData.append('temp_max', String(file.temp_max));
  formData.append('description', file.description);
  formData.append('image', file.image);

  const { data } = await instance.post('/api/files', formData);

  return data;
};

const usePostFile = () => {
  return useMutation(postFile);
};

export default usePostFile;
