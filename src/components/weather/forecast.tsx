import { RotateCwIcon } from 'lucide-react';

import { Button } from '~/src/components/ui/button';
import ForecastItem from '~/src/components/weather/forecast-item';
import useGetForecast from '~/src/queries/use-get-forecast';
import { cn } from '~/src/utils/class-name';

const Forecast = () => {
  const { data: forecast, isLoading, error, refetch } = useGetForecast();

  return (
    <div
      className={cn(
        'grow',
        !isLoading && error && 'flex items-center justify-center',
      )}
    >
      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center gap-2">
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

      {!isLoading && !error && forecast && (
        <div className="px-3">
          {forecast.data.map((item) => (
            <ForecastItem
              key={item.day}
              {...item}
              temp_week_min={forecast.temp_week_min}
              temp_week_max={forecast.temp_week_max}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
