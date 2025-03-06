'use client';

import { createClient } from '~/src/utils/supabase/client';

const KakaoLoginButton = () => {
  const handleClickLogin = async () => {
    const supabase = await createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
      },
    });
  };

  return <button onClick={handleClickLogin}>카카오로 로그인하기</button>;
};

export default KakaoLoginButton;
