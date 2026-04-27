import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
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


export function Home({unit, showUnits, setShowUnits}) {
  
  const [data, setData] = useState({
    current: {
      weatherCode: '',
      cityName: '',
      time: '',
      currentTemperature: '',
      feelsLike: '',
      humidity: '',
      wind: '',
      percipitation: '',
    },
    daily: [],
    hourly: []
  });
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(false);

  async function getCoordinates(form) {
    const responseGeo = await fetch(`https://nominatim.openstreetmap.org/search?city=${form}&format=jsonv2`);
      
    if (!responseGeo.ok) {
      throw new Error(`Response status: ${responseGeo.status}`);
    }

    return await responseGeo.json();
  }

  async function getWeather(lat, lon, unit) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&temperature_unit=${unit.temperature === 'c' ? 'celsius' : 'fahrenheit'}&wind_speed_unit=${unit.windSpeed === 'km/h' ? 'kmh' : 'mph'}&precipitation_unit=${unit.precipitation === 'mm' ? 'mm' : 'inch'}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    
    return await response.json();
  }

  async function getCityFromCoords(lat, lon) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    const data = await response.json();
    console.log(data)
    return data.address.town;
  }
  
  async function fetchAndSetWeather({lat, lon, cityName}) {

    let displayName = cityName;

    if(cityName) {
      const resultGeo = await getCoordinates(cityName);
      lat = resultGeo[0].lat;
      lon = resultGeo[0].lon;
      displayName = resultGeo[0].display_name;
    } else {
      displayName = await getCityFromCoords(lat, lon);
    }

    const result = await getWeather(lat, lon, unit);

    const dailyArray = result.daily.time.map((date, index) => ({
      time: dayjs(date).format('ddd'),
      day: date,
      weatherCode: result.daily.weather_code[index],
      maxTemperature: Math.round(result.daily.temperature_2m_max[index]),
      minTemperature: Math.round(result.daily.temperature_2m_min[index]),
    }));

    const hourlyArray = result.hourly.time.map((hour, index) => ({
      time: dayjs(hour).format('h A'),
      time2: hour,
      weatherCode: result.hourly.weather_code[index],
      temperature: Math.round(result.hourly.temperature_2m[index]),
    }))

    console.log(hourlyArray)
  
    setData(prev => ({
      ...prev,
      current: {
        ...prev.current,
        weatherCode: result.current.weather_code,
        time: dayjs(result.current.time).format('dddd, MMM D, YYYY'),
        cityName: displayName,
        currentTemperature: Math.round(result.current.temperature_2m),
        feelsLike: Math.round(result.current.apparent_temperature),
        humidity: result.current.relative_humidity_2m,
        wind: Math.round(result.current.wind_speed_10m),
        percipitation: Math.round(result.current.precipitation),
      },
      daily: dailyArray,
      hourly: hourlyArray,
    }))
  }

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const lat = position.coords.latitude;
  //       const lon = position.coords.longitude;
  //       const cityName = undefined;
  //       await fetchAndSetWeather({lat, lon, cityName});
  //     });
  //   }
  // },[unit]);

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }
}, []);

useEffect(() => {
  if (!coords) return;

  const load = async () => {
    try {
      await fetchAndSetWeather({
        lat: coords.lat,
        lon: coords.lon
      });
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  load();
}, [coords, unit]);

  const reload = async () => {
  if (!coords) return;

  try {
    await fetchAndSetWeather({
      lat: coords.lat,
      lon: coords.lon
    });
    setError(false);
  } catch (error) {
    console.log(error.message);
    setError(true);
  }
};


  async function getData(e) {
    e.preventDefault();

    const cityName = e.target.search.value;
    setError(false);

    try {
      // const responseGeo = await fetch(`https://nominatim.openstreetmap.org/search?city=${form}&format=jsonv2`);
      
      // if (!responseGeo.ok) {
      //   throw new Error(`Response status: ${responseGeo.status}`);
      // }

      // const resultGeo = await responseGeo.json();
      // console.log(resultGeo[0].display_name)


      // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${resultGeo[0].lat}&longitude=${resultGeo[0].lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=,temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature`);

      // if (!response.ok) {
      //   throw new Error(`Response status: ${response.status}`);
      // }

      // const result = await response.json();
      // const resultGeo = await getCoordinates(form);

      // const result = await getWeather(resultGeo[0].lat, resultGeo[0].lon);

      // const dailyArray = result.daily.time.map((date, index) => ({
      //   time: dayjs(date).format('ddd'),
      //   weatherCode: result.daily.weather_code[index],
      //   maxTemperature: result.daily.temperature_2m_max[index],
      //   minTemperature: result.daily.temperature_2m_min[index],
      // }));

      // const hourlyArray = result.hourly.time.map((hour, index) => ({
      //   time: dayjs(hour).format('h A'),
      //   weatherCode: result.hourly.weather_code[index],
      //   temperature: result.hourly.temperature_2m[index],
      // }))
    
      // setData({
      //   ...data,
      //   current: {
      //     ...data.current,
      //     weatherCode: result.current.weather_code,
      //     time: dayjs(result.current.time).format('dddd, MMM D, YYYY'),
      //     cityName: resultGeo[0].display_name,
      //     currentTemperature: result.current.temperature_2m,
      //     feelsLike: result.current.apparent_temperature,
      //     humidity: result.current.relative_humidity_2m,
      //     wind: result.current.wind_speed_10m,
      //     percipitation: result.current.precipitation,
      //   },
      //   daily: dailyArray,
      //   hourly: hourlyArray,
      // })

      await fetchAndSetWeather({cityName});

      const now = dayjs();
      const todaysDay = now.format('YYYY-MM-DD HH:mm');
      console.log(todaysDay)
      console.log(now)

    } catch (error) {
      console.log(error.message)
      setError(true);
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
    {error
      ? <Error
          reload={reload}
        />
      : <section >
        <h1 className='text-5xl font-display text-center leading-14 tracking-tight py-10'>How's the sky looking today?</h1>
        <InputSearch
          getData={getData}
        />
        <div className='grid md:grid-cols-3 gap-4'>
          <div className='grid gap-4 md:col-span-2 md:min-h-screen'>
            <CurrentWeather
              data={data}
              getWeatherIcon={getWeatherIcon}
              unit={unit}
            />
            <DailyForecast
              data={data}
              getWeatherIcon={getWeatherIcon}
            />
          </div>
          <div className='grid md:col-span-1'>
            <HourlyForecast
              data={data}
              getWeatherIcon={getWeatherIcon}
              showUnits={showUnits}
              setShowUnits={setShowUnits}
            />
          </div>
        </div>
      </section>
    }
    </>
  )
}