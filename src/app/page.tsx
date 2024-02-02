'use client';
import Navbar from '@/components/Navbar';
import { fetchData } from '@/utils/DataFetch';
import { format, parseISO } from 'date-fns';
import { useQuery } from 'react-query';

type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export default function Home() {
  const { data, isLoading, isError } = useQuery('data', fetchData);
  const dataForToday = data?.list[0];
  console.log('My Data = ', data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today's Data */}
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(dataForToday?.dt_txt ?? ''), 'EEEE')}</p>
            </h2>
            <div></div>
          </div>
        </section>
        {/* 7 Day Forecast Data */}
        <section></section>
      </main>
    </div>
  );
}
