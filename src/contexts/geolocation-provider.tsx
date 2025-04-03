'use client';

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type GeolocationState = {
  geolocation: {
    lat: number;
    lng: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  refreshGeolocation: () => void;
};

const GeolocationContext = createContext<GeolocationState | undefined>(
  undefined,
);

export const GeolocationProvider = ({ children }: PropsWithChildren) => {
  const [geolocation, setGeolocation] = useState<
    GeolocationState['geolocation'] | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGeolocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setIsLoading(false);
      setError('위치 정보를 지원하지 않는 브라우저에요.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setIsLoading(false);
        setGeolocation({
          lat: Math.floor(coords.latitude * 10000) / 10000,
          lng: Math.floor(coords.longitude * 10000) / 10000,
        });
      },
      (error) => {
        setIsLoading(false);
        setError(
          `위치 정보를 가져오는데 실패했어요.\n에러코드: ${error.message}`,
        );
      },
    );
  }, []);

  useEffect(() => {
    getGeolocation();
  }, [getGeolocation]);

  return (
    <GeolocationContext.Provider
      value={{
        isLoading,
        error,
        geolocation,
        refreshGeolocation: getGeolocation,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => {
  const context = useContext(GeolocationContext);

  if (context === undefined) {
    throw new Error(
      'useGeolocation은 GeolocationProvider 내에서 사용해야 합니다',
    );
  }

  return context;
};
