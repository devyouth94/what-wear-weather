import { Card, CardContent } from '~/src/components/ui/card';
import ForecastItem from '~/src/components/weather/forecast-item';
import useGetForecast from '~/src/queries/use-get-forecast';

const Forecast = () => {
  const { data: forecast, isLoading, error } = useGetForecast();

  if (isLoading) {
    return (
      <Card>
        <div>loading...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div>{error.message}</div>
      </Card>
    );
  }

  return (
    <Card>
      {forecast && (
        <CardContent className="py-3">
          {forecast.data.map((item) => (
            <ForecastItem
              key={item.day}
              {...item}
              temp_week_min={forecast.temp_week_min}
              temp_week_max={forecast.temp_week_max}
            />
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default Forecast;
