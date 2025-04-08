import { RotateCwIcon } from 'lucide-react';

import { Button } from '~/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/src/components/ui/card';
import ForecastItem from '~/src/components/weather/forecast-item';
import useGetForecast from '~/src/queries/use-get-forecast';
import { cn } from '~/src/utils/class-name';

const Forecast = () => {
  const { data: forecast, isLoading, error, refetch } = useGetForecast();

  return (
    <Card
      className={cn(
        'h-[428px]',
        !isLoading && error && 'flex items-center justify-center',
      )}
    >
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-normal text-neutral-400">
          8일간의 일기예보
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-1">
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
          <>
            {forecast.data.map((item) => (
              <ForecastItem
                key={item.day}
                {...item}
                temp_week_min={forecast.temp_week_min}
                temp_week_max={forecast.temp_week_max}
              />
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Forecast;
