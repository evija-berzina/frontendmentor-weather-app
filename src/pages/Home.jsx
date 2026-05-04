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
  const [location, setLocation] = useState({
    cityName: '',
    lat: null,
    lon: null
  });
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // GET COORDINATES FROM CITY NAME
  async function getCoordinates(form) {
    const responseGeo = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(form)}&format=jsonv2`);
      
    if (!responseGeo.ok) {
      throw new Error(`Response status: ${responseGeo.status}`);
    }
   
    return await responseGeo.json();
  }

  // GET WEATHER DATA
  async function getWeather(lat, lon, unit) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,apparent_temperature&temperature_unit=${unit.temperature === 'c' ? 'celsius' : 'fahrenheit'}&wind_speed_unit=${unit.windSpeed === 'km/h' ? 'kmh' : 'mph'}&precipitation_unit=${unit.precipitation === 'mm' ? 'mm' : 'inch'}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    
    return await response.json();
  }

  // GET CITY NAME FROM COORDINATES
  async function getCityFromCoords(lat, lon) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    const address = data.address;

    return `${address.city || address.town || address.village}, ${address.country}`;
  }
  
  async function fetchAndSetWeather({lat, lon, cityName}) {
    try {

      // GET CITY NAME (for UI)
      const displayName = cityName || await getCityFromCoords(lat, lon);

      // FETCH WEATHER DATA
      const result = await getWeather(lat, lon, unit);

      // FORMAT DAILY DATA
      const dailyArray = result.daily.time.map((date, index) => ({
        time: dayjs(date).format('ddd'),
        day: date,
        weatherCode: result.daily.weather_code[index],
        maxTemperature: Math.round(result.daily.temperature_2m_max[index]),
        minTemperature: Math.round(result.daily.temperature_2m_min[index]),
      }));

      // FORMAT HOURLY DATA
      const hourlyArray = result.hourly.time.map((hour, index) => ({
        time: dayjs(hour).format('h A'),
        time2: hour,
        weatherCode: result.hourly.weather_code[index],
        temperature: Math.round(result.hourly.temperature_2m[index]),
      }))
    
      // SET STATE
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
      }));

    } catch (error) {
        console.log(error.message);
        setError(true);
      }
  }

  // GET USER LOCATION 1x OR AFTER REFRESH
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    }
  }, []);

  // FETCH WEATHER DATA WHEN LOCATION OR UNIT CHANGES
  useEffect(() => {
      if (!location.lat || !location.lon) return;

      fetchAndSetWeather({
        lat: location.lat,
        lon: location.lon,
      });

  }, [location.lat, location.lon, unit]);

  // RELOAD DATA (FOR ERROR COMPONENT)
  const reload = async () => {
    if (!location.lat || !location.lon) return;

    try {
      await fetchAndSetWeather({
        lat: location.lat,
        lon: location.lon
      });

      setError(false);

    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.display_name);
    setSuggestions([]);

    setLocation({
      lat: item.lat,
      lon: item.lon,
      cityName: item.display_name
    });
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await getCoordinates(query);
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // GET WEATHER DATA ON SEARCH
  async function getData(e) {
    e.preventDefault();

    const cityName = e.target.search.value;
    setQuery(cityName);

    if(cityName.length < 2) {
      setSuggestions([]);
      return;
    }

    setNoResults(false);
    setError(false);

    setData({
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

    try {
      const resultGeo = await getCoordinates(cityName);
      setSuggestions(resultGeo.slice(0, 5));

      if (!resultGeo.length) {
        setNoResults(true);
        return;
      }

      setLocation({
        lat: resultGeo[0].lat,
        lon: resultGeo[0].lon,
        cityName: resultGeo[0].display_name
      });

      const now = dayjs();
      const todaysDay = now.format('YYYY-MM-DD HH:mm');
      console.log(todaysDay)
      console.log(now)

    } catch (error) {
      console.log(error.message)
      setError(true);
    }
  }

  // GET WEATHER ICONS
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
    { error ? (
      <Error
        reload={reload}
      />
    ) : <section >
        <h1 className='text-5xl font-display text-center leading-14 tracking-tight py-10'>How's the sky looking today?</h1>
        <InputSearch
          getData={getData}
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          handleSelect={handleSelect}
        />
        {noResults ? (
          <div className='flex flex-col justify-center items-center text-center'>
            <h1 className='text-2xl py-4'>No search result found!</h1>
          </div>
        ) : <div className='grid xl:grid-cols-3 gap-8'>
          <div className='grid gap-10 lg:gap2 xl:col-span-2'>
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
          <div className='grid xl:col-span-1 w-full mx-auto md:w-[70%] lg:w-[80%] xl:w-full'>
            <HourlyForecast
              data={data}
              getWeatherIcon={getWeatherIcon}
              showUnits={showUnits}
              setShowUnits={setShowUnits}
            />
          </div>
        </div>}
      </section>
    }
    </>
  )
}