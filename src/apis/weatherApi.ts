import axios from 'axios';

const UNITS = 'metric';
const LANG = 'kr';
const EXCLUDE = 'current,minutely,hourly,alerts';

export const getCityName = async (lat = 0, lon = 0) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}`,
  );

  return data;
};

export const getLiveWeather = async (lat = 0, lon = 0) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=${UNITS}&lang=${LANG}`,
  );

  return data;
};

export const getDailyWeather = async (lat = 0, lon = 0) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=${UNITS}&lang=${LANG}&exclude=${EXCLUDE}`,
  );

  return data;
};
