import {useState} from 'react';
import {Error} from './Error'
import {InputSearch} from '../components/InputSearch';
import { CurrentWeather } from '../components/CurrentWeather';
import {DailyForecast} from '../components/DailyForecast';
import {HourlyForecast } from '../components/HourlyForecast';
import IconSunny from '../assets/images/icon-sunny.webp';
import IconPartlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import IconOvercast from '../assets/images/icon-overcast.webp';
import IconFog from '../assets/images/icon-fog.webp';
import IconDrizzle from '../assets/images/icon-drizzle.webp';
import IconRain from '../assets/images/icon-rain.webp';
import IconSnow from '../assets/images/icon-snow.webp';
import IconStorm from '../assets/images/icon-storm.webp';

export function Home() {
  
  const [data, setData] = useState({
    weatherCode: '',
    currentTemperature: '',
    feelsLike: '',
    humidity: '',
    wind: '',
    percipitation: '',
  });

  async function getData(e) {
    e.preventDefault();
    
    console.log("FETCHING...");

    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=56.946&longitude=24.1059&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature');

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      setData({
        ...data,
        weatherCode: result.current.weather_code,
        currentTemperature: result.current.temperature_2m,
        feelsLike: result.current.apparent_temperature,
        humidity: result.current.relative_humidity_2m,
        wind: result.current.wind_speed_10m,
        percipitation: result.current.precipitation,
        
      });

      console.log(result)

    } catch (error) {
      console.log(error.message)
    }
  }

  function getWeatherIcon(weather) {
    if ([0, 1].includes(weather)) return IconSunny;
    if (weather === 2) return IconPartlyCloudy;
    if (weather === 3) return IconOvercast;
    if ([45, 48].includes(weather)) return IconFog;
    if ([51, 53, 55, 56, 57].includes(weather)) return IconDrizzle;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weather)) return IconRain;
    if ([71, 73, 75, 77, 85, 86].includes(weather)) return IconSnow;
    if ([95, 96, 99].includes(weather)) return IconStorm;
  }

  return (
    <>
      <section>
        <h1 className='text-5xl font-display text-center leading-14 tracking-tight py-10'>How's the sky looking today?</h1>
        <InputSearch
          getData={getData}
        />
        <CurrentWeather
          data={data}
          getWeatherIcon={getWeatherIcon}
        />
        <DailyForecast />
        <HourlyForecast />
      </section>
      {/* <Error /> */}
    </>
  )
}