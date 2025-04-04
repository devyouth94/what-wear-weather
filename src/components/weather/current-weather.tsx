import { MapPinIcon, RotateCwIcon } from 'lucide-react';

import { Badge } from '~/src/components/ui/badge';
import { Button } from '~/src/components/ui/button';
import useGetCurrentWeather, {
  type GetCurrentWeatherResponse,
} from '~/src/queries/use-get-current-weather';

const tempItems: Array<{
  label: string;
  value: keyof GetCurrentWeatherResponse;
  unit: string;
}> = [
  { label: '체감', value: 'temp_feels', unit: '°' },
  { label: '습도', value: 'humidity', unit: '%' },
  { label: '풍속', value: 'wind_speed', unit: 'm/s' },
];

const CurrentWeather = () => {
  const {
    data: currentWeather,
    isLoading,
    error,
    refetch,
  } = useGetCurrentWeather();

  return (
    <div className="mt-2 h-[125px]">
      {!isLoading && error && (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <p className="text-sm">{error.message}</p>
          <Button
            onClick={() => refetch()}
            size="icon"
            className="rounded-full"
          >
            <RotateCwIcon />
          </Button>
        </div>
      )}

      {!isLoading && currentWeather && (
        <div className="flex h-full w-full flex-col justify-between">
          <p className="flex items-center gap-0.5">
            <MapPinIcon size={14} />
            <span className="text-xs font-medium">
              {currentWeather.location}
            </span>
          </p>

          <div className="flex items-end justify-between px-3">
            <p className="flex flex-col">
              <span className="ml-0.5 font-medium">
                {currentWeather.weather}
              </span>
              <span className="text-5xl font-black">{`${currentWeather.temp}°`}</span>
              <span className="ml-0.5 text-sm font-medium">{`최고 ${currentWeather.temp_max}° / 최저 ${currentWeather.temp_min}°`}</span>
            </p>

            <div className="flex flex-col gap-0.5">
              {tempItems.map(({ label, value, unit }) => (
                <Badge
                  key={value}
                  className="grid w-[90px] grid-cols-[25px_auto]"
                >
                  <span className="font-light">{label}</span>
                  <span className="block text-end">
                    {currentWeather[value]}
                    {unit}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
