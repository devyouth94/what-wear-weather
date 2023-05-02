import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Layout from '@/elements/Layout';
import SimpleLogo from '@/elements/SimpleLogo';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <Layout center>
      <SimpleLogo />

      <LoginForm />
    </Layout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
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
