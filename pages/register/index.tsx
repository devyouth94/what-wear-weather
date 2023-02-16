import { useRouter } from 'next/router';

import RegisterForm from '@/components/register/RegisterForm';
import type { RegisterData } from '@/lib/constants/types';
import instance from '@/lib/utils/instance';

const Register = () => {
  const { push } = useRouter();

  const handleSubmit = async (userData: RegisterData) => {
    const { data } = await instance.post('/api/auth/register', userData);
    if (data.ok) push('/login');
  };

  const handleConfirmData = async (type: string, userData: string) => {
    const { data } = await instance.post<{ ok: boolean }>('/api/auth/confirm', { type, userData });
    return data.ok;
  };

  return <RegisterForm handleSubmit={handleSubmit} handleConfirmData={handleConfirmData} />;
};

export default Register;
