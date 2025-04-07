import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Snowflake,
  Sun,
} from 'lucide-react';

export const SKY_CODE = {
  '1': '맑음',
  '3': '구름많음',
  '4': '흐림',
};

export const PTY_CODE = {
  '0': '없음',
  '1': '비',
  '2': '비/눈',
  '3': '눈',
  '4': '소나기',
  '5': '빗방울',
  '6': '빗방울/눈날림',
  '7': '눈날림',
};

export const WEATHER_ICON = {
  Sun,
  CloudSun,
  CloudSunRain,
  Cloud,
  CloudRain,
  Snowflake,
  CloudDrizzle,
  CloudSnow,
};
