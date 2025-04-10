import { NextResponse } from 'next/server';

import { createClient } from '~/src/utils/supabase/server';

export const GET = async () => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { message: '인증되지 않은 사용자입니다.' },
        { status: 401 },
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      nickname: user.user_metadata.name || user.user_metadata.user_name,
      avatar_url: user.user_metadata.avatar_url || '',
    });
  } catch (error) {
    console.error('프로필 조회 에러:', error);

    return NextResponse.json(
      { message: '사용자 프로필 정보를 불러오는데 실패했습니다.' },
      { status: 500 },
    );
  }
};
