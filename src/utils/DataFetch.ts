import axios from 'axios';

export async function fetchData() {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=Lucknow&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
  );
  return data;
}
