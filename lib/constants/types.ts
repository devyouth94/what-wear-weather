export type LoginData = {
  email: string;
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

export type SubmitData = {
  description: string;
  image: FileList;
};

export type PostData = {
  region: string;
  temp_now: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
  description: string;
  image: File;
};

export type GetPostData = {
  createdAt: string;
  region: string;
  temp_now: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
  description: string;
  image: string;
  id: string;
  userId: string;
};
