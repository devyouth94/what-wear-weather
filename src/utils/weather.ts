import { PTY_CODE, SKY_CODE } from '~/src/constants/weather';

/**
 * 습구온도를 계산하는 함수 (Stull의 추정식 사용)
 * @param temp 기온(°C)
 * @param humidity 상대습도(%)
 * @returns 습구온도(°C)
 */
const calculateWetBulbTemp = (temp: number, humidity: number): number => {
  return (
    temp * Math.atan(0.151977 * Math.sqrt(humidity + 8.313659)) +
    Math.atan(temp + humidity) -
    Math.atan(humidity - 1.67633) +
    0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.023101 * humidity) -
    4.686035
  );
};

/**
 * 여름철 체감온도 계산 함수 (5~9월)
 * @param temp 기온(°C)
 * @param humidity 상대습도(%)
 * @returns 체감온도(°C)
 */
const calculateSummerFeelsLikeTemp = (
  temp: number,
  humidity: number,
): number => {
  const wetBulbTemp = calculateWetBulbTemp(temp, humidity);

  return (
    -0.2442 +
    0.55399 * wetBulbTemp +
    0.45535 * temp -
    0.0022 * Math.pow(wetBulbTemp, 2) +
    0.00278 * wetBulbTemp * temp +
    3.0
  );
};

/**
 * 겨울철 체감온도 계산 함수 (10~익년 4월)
 * @param temp 기온(°C)
 * @param windSpeed 풍속(km/h)
 * @returns 체감온도(°C) 또는 기온(°C)
 */
const calculateWinterFeelsLikeTemp = (
  temp: number,
  windSpeed: number,
): number => {
  // 기온 10°C 이하, 풍속 1.3 m/s(= 4.68 km/h) 이상일 때만 계산
  if (temp <= 10 && windSpeed >= 4.68) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windSpeed, 0.16) +
      0.3965 * Math.pow(windSpeed, 0.16) * temp
    );
  }

  // 조건을 만족하지 않으면 원래 기온 반환
  return temp;
};

/**
 * 계절에 따른 체감온도 계산 함수
 * @param temp 기온(°C)
 * @param windSpeed 풍속(km/h)
 * @param humidity 상대습도(%)
 * @param date 날짜 (기본값: 현재 날짜)
 * @returns 체감온도(°C)를 숫자로 반환
 */
export const calculateFeelsLikeTemp = (
  temp: number,
  windSpeed: number,
  humidity: number,
  date: Date = new Date(),
): number => {
  const month = date.getMonth() + 1; // 0부터 시작하므로 1을 더함

  // 여름철: 5~9월
  if (month >= 5 && month <= 9) {
    const feelsLikeTemp = calculateSummerFeelsLikeTemp(temp, humidity);
    return Math.round(feelsLikeTemp);
  }
  // 겨울철: 10~4월
  else {
    const feelsLikeTemp = calculateWinterFeelsLikeTemp(temp, windSpeed);
    return Math.round(feelsLikeTemp);
  }
};

export const convertCodeToWeather = (skyCode: string, ptyCode: string) => {
  if (ptyCode === '0') {
    return SKY_CODE[skyCode as keyof typeof SKY_CODE];
  }

  return PTY_CODE[ptyCode as keyof typeof PTY_CODE];
};

export const convertCodeToIcon = (skyCode: string, ptyCode: string) => {
  if (ptyCode === '0') {
    switch (skyCode) {
      case '1':
        return 'Sun';
      case '3':
        return 'CloudSun';
      case '4':
        return 'Cloud';
    }
  }

  switch (ptyCode) {
    case '1':
      return 'CloudRain';
    case '2':
    case '3':
      return 'Snowflake';
    case '4':
    case '5':
      return 'CloudDrizzle';
    case '6':
    case '7':
      return 'CloudSnow';
  }
};

export const convertWeatherToCode = (weather: string) => {
  switch (weather) {
    case '맑음':
      return 'Sun';
    case '구름많음':
      return 'CloudSun';
    case '구름많고 비':
    case '구름많고 눈':
    case '구름많고 비/눈':
    case '구름많고 소나기':
      return 'CloudSunRain';
    case '흐림':
      return 'Cloud';
    case '흐리고 비':
    case '흐리고 비/눈':
      return 'CloudRain';
    case '흐리고 눈':
      return 'CloudSnow';
    case '흐리고 소나기':
      return 'CloudDrizzle';
  }
};
