'use client';

import { createClient } from '~/src/utils/supabase/client';

const KakaoLoginButton = () => {
  const handleClickLogin = async () => {
    const supabase = await createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/weather`,
      },
    });
  };

  return <button onClick={handleClickLogin}>카카오로 로그인하기</button>;
};

export default KakaoLoginButton;
