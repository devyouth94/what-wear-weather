import { type NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { type GetCurrentWeatherResponse } from '~/src/queries/use-get-current-weather';
import { s3 } from '~/src/utils/aws';
import { createClient } from '~/src/utils/supabase/server';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const weatherJSON = formData.get('weather') as string;
    const image = formData.get('image') as File;
    const description = formData.get('description') as string | null;

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

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: `outfit/${user.id}/${image.name}`,
        Body: Buffer.from(await image.arrayBuffer()),
        ContentType: image.type,
      }),
    );

    const weather = JSON.parse(weatherJSON) as GetCurrentWeatherResponse;

    const { error: outfitError } = await supabase.from('outfits').insert({
      user_id: user.id,
      temp: weather.temp,
      temp_feels: weather.temp_feels,
      temp_min: weather.temp_min,
      temp_max: weather.temp_max,
      weather: weather.weather,
      location: weather.location,
      image_url: `https://www-image-bucket.s3.ap-northeast-2.amazonaws.com/outfit/${user.id}/${image.name}`,
      description: description || null,
    });

    if (outfitError) {
      throw outfitError;
    }

    return NextResponse.json(
      { message: '오늘의 옷을 등록했습니다.' },
      { status: 201 },
    );
  } catch (error) {
    console.error('오늘의 옷 등록 중 오류:', error);

    return NextResponse.json(
      { message: '오늘의 옷 등록을 실패했습니다.' },
      { status: 500 },
    );
  }
};
