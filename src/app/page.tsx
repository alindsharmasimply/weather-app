'use client';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherIcon from '@/components/WeatherIcon';
import { kelvinToCelsius } from '@/utils/ConvertKelvinToCelsius';
import { convertWindSpeed } from '@/utils/ConvertWindSpeed';
import { fetchData } from '@/utils/DataFetch';
import { metersToKilometers } from '@/utils/MetersToKilometers';
import { format, fromUnixTime, parseISO } from 'date-fns';
import { useQuery } from 'react-query';

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default function Home() {
  const { data, isLoading, isError } = useQuery<WeatherData>('data', fetchData);
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
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(dataForToday?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-lg">
                ({format(parseISO(dataForToday?.dt_txt ?? ''), 'dd.MM.yyyy')})
              </p>
            </h2>
            <Container className="gap-10 px-6 items center">
              {/* Temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {kelvinToCelsius(dataForToday?.main.temp ?? 297.37)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like...</span>
                  <span>
                    {kelvinToCelsius(dataForToday?.main.feels_like ?? 297.37)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {kelvinToCelsius(dataForToday?.main.temp_min ?? 0)}°↓{' '}
                  </span>
                  <span>
                    {' '}
                    {kelvinToCelsius(dataForToday?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* Time and Weather icons */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(data.dt_txt), 'h:mm a')}
                    </p>
                    <WeatherIcon iconname={data.weather[0].icon} />
                    <p>{kelvinToCelsius(data?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/* Left Cell */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {dataForToday?.weather[0].description}
              </p>
              <WeatherIcon iconname={dataForToday?.weather[0].icon ?? ''} />
            </Container>
            {/* Right Cell */}
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visibility={metersToKilometers(
                  dataForToday?.visibility ?? 10000
                )}
                airPressure={`${dataForToday?.main.pressure} hPa`}
                humidity={`${dataForToday?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1707096005),
                  'H:mm'
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1707135626),
                  'H:mm'
                )}
                windSpeed={convertWindSpeed(dataForToday?.wind.speed ?? 1.64)}
              />
            </Container>
          </div>
        </section>
        {/* 7 Day Forecast Data */}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 Days)</p>
        </section>
      </main>
    </div>
  );
}
