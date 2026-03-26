import {Error} from './Error'
import {InputSearch} from '../components/InputSearch';
import { CurrentWeather } from '../components/CurrentWeather';
import {DailyForecast} from '../components/DailyForecast';

export function Home() {

  return (
    <>
      <section>
        <h1 className='text-5xl font-display text-center leading-14 tracking-tight py-10'>How's the sky looking today?</h1>
        <InputSearch />
        <CurrentWeather />
        <DailyForecast />
      </section>
      {/* <Error /> */}
    </>
  )
}