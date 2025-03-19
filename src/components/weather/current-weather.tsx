import { Card, CardContent } from '~/src/components/ui/card';
import useGetCurrentWeather from '~/src/queries/use-get-current-weather';

const CurrentWeather = () => {
  const { data: currentWeather, isLoading, error } = useGetCurrentWeather();

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
      {currentWeather && (
        <CardContent className="p-6">
          <div>{currentWeather.location}</div>
          <div>{currentWeather.weather}</div>
          <div>{currentWeather.temp}</div>
          <div>체감온도 {currentWeather.temp_feels}</div>
          <div>
            <span>최저: {currentWeather.temp_min}</span>
            <span>최고: {currentWeather.temp_max}</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CurrentWeather;
