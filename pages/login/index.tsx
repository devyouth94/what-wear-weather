import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

import Layout from '@/components/common/Layout';
import SimpleLogo from '@/components/common/SimpleLogo';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
  return (
    <Layout className="flex flex-col justify-center items-center">
      <SimpleLogo />
      <LoginForm />
    </Layout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req });

  if (token) {
    return {
      redirect: {
        destination: '/main',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
