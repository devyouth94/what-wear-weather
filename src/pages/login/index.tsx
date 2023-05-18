import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import LoginContainer from '@/_login/components/LoginContainer';

import SimpleLogo from '@/@shared/elements/SimpleLogo';
import Layout from '@/@shared/elements/Layout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const Login = () => {
  return (
    <Layout center>
      <SimpleLogo />
      <LoginContainer />
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
