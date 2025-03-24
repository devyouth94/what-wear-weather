import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '~/src/utils/supabase/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const tempMin = searchParams.get('temp_min');
    const tempMax = searchParams.get('temp_max');
    const month = searchParams.get('month');

    const sort = searchParams.get('sort') || 'desc';

    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

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

    let query = supabase
      .from('outfits')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

    if (tempMin) {
      query = query.gte('temp', tempMin);
    }

    if (tempMax) {
      query = query.lte('temp', tempMax);
    }

    if (month) {
      const targetMonth = Number(month) - 1;
      query = query.filter(
        'created_at',
        'ilike',
        `%-${String(targetMonth + 1).padStart(2, '0')}-%`,
      );
    }

    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit) - 1;

    query = query
      .order('created_at', { ascending: sort === 'asc' })
      .range(start, end);

    const { data: outfits, error: outfitsError, count } = await query;

    if (outfitsError) {
      throw outfitsError;
    }

    return NextResponse.json({
      outfits,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count || 0,
        hasNext: count ? start + Number(limit) < count : false,
      },
    });
  } catch (error) {
    console.error('옷 목록 조회 중 오류:', error);

    return NextResponse.json(
      { message: '옷 목록 조회에 실패했습니다.' },
      { status: 500 },
    );
  }
};
