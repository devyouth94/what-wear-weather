export type RegisterData = {
  userId: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export type Location = {
  loaded: boolean;
  coordinates?: { lat: number; lon: number };
  error?: { code: number; message: string };
};

export type Weather = {
  id: number;
  main: string;
  icon: string;
  description: string;
};

export type LiveWeather = {
  temp: number;
  feels_temp: number;
  weather: Weather;
  time: string;
  city_id: number;
};

export type DailyWeather = {
  time: string;
  weather: Weather;
  temp_min: number;
  temp_max: number;
};

export type CityName = {
  en: string;
  ko: string;
};
