import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

import Layout from '@/elements/Layout';
import SimpleLogo from '@/elements/SimpleLogo';
import LoginForm from 'components/login/LoginForm';

const Login = () => {
  return (
    <Layout center>
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
