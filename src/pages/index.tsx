import FullLogo from '@/_index/elements/FullLogo';
import useLoading from '@/_index/hooks/useLoading';

import Layout from '@/@shared/elements/Layout';
import Overlay from '@/@shared/elements/Overlay';
import Spinner from '@/@shared/elements/Spinner';

export default function Home() {
  const isLoading = useLoading();

  return (
    <>
      <Layout center>
        {isLoading && (
          <>
            <Spinner color="point_01" />
            <Overlay />
          </>
        )}
        <FullLogo />
      </Layout>
    </>
  );
}
