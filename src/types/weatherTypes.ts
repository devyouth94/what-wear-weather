export type TCityName = {
  en: string;
  ko: string;
};

export type TWeather = {
  id: number;
  main: string;
  icon: string;
  description: string;
};

export type TLiveWeather = {
  temp: number;
  feels_temp: number;
  weather: TWeather;
  time: string;
  city_id: number;
};

export type TDailyWeather = {
  time: string;
  weather: TWeather;
  temp_min: number;
  temp_max: number;
};

export type TWeatherImage = {
  src: string;
  profile: string;
  name: string;
  unsplash: string;
};
