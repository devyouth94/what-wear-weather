import { useEffect, useState } from 'react';

import { getForecast, type GetForecastResponse } from '~/src/apis/weather';
import { Card, CardContent } from '~/src/components/ui/card';
import ForecastItem from '~/src/components/weather/forecast-item';

type Props = {
  latitude: number;
  longitude: number;
  baseDate: string;
};

const Forecast = ({ latitude, longitude, baseDate }: Props) => {
  const [forecast, setForecast] = useState<GetForecastResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getForecast(latitude, longitude, baseDate);
        setForecast(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [latitude, longitude, baseDate]);

  if (forecast === null) {
    return (
      <Card>
        <div>loading...</div>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-3">
        {forecast.data.map((item) => (
          <ForecastItem
            key={item.day}
            {...item}
            temp_week_min={forecast.temp_week_min}
            temp_week_max={forecast.temp_week_max}
            baseDate={baseDate}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default Forecast;
