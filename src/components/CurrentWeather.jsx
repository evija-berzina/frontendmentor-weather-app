import BgImageSmall from '../assets/images/bg-today-small.svg';
import BgImageLarge from '../assets/images/bg-today-large.svg';

export function CurrentWeather({data, getWeatherIcon, unit}) {
  
  return (
    <div className='flex flex-col justify-between'>
      {data.daily.length === 0 ? (
        <div className='w-full h-72 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md flex flex-col justify-center items-center'>
          <div className="flex gap-2 h-4">
            <span className="w-3 h-3 bg-[hsl(var(--neutral-200))] rounded-full animate-bounce [animation-delay:0s]" />
            <span className="w-3 h-3 bg-[hsl(var(--neutral-200))] rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-3 h-3 bg-[hsl(var(--neutral-200))] rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
          <p className='text-xl text-[hsl(var(--neutral-200))]'>
            Loading...
          </p>
        </div>
      ) : (
        <>
          <div className='relative w-full h-72 flex flex-col justify-evenly items-center p-6 rounded-2xl overflow-hidden mt-8 mb-4'>
            <picture>
              <source srcSet={BgImageLarge} media="(min-width: 1024px)" />
              <img src={BgImageSmall} className="absolute inset-0 w-full h-full object-cover" />
            </picture>

            <div className='text-center relative'>
              <p className='text-3xl font-semibold'>{data.current.cityName}</p>
              <p className='text-xl pt-2'>{data.current.time}</p>
            </div>

            <div className='flex flex-row justify-between items-center w-full relative'>
              <img
                className='w-30 h-30'
                src={getWeatherIcon(data.current.weatherCode)}
                alt=""
              />
              <p className='text-8xl italic font-normal'>
                {data.current.currentTemperature}°
              </p>
            </div>
          </div>
        </>
      )}

      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='text-[hsl(var(--neutral-200))] pb-4'>Feels Like</p>
          <p className='text-4xl'>
            {data.hourly.length === 0 ? '-' : data.current.feelsLike +'°'}
          </p>
        </div>

        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='text-[hsl(var(--neutral-200))] pb-4'>Humidity</p>
          <p className='text-4xl'>
            {data.hourly.length === 0 ? '-' : data.current.humidity +'%' }
          </p>
        </div>

        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='text-[hsl(var(--neutral-200))] pb-4'>Wind</p>
          <p className='text-4xl'>
            {data.hourly.length === 0 ? '-' : data.current.wind +' ' + unit.windSpeed}
          </p>
        </div>

        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='text-[hsl(var(--neutral-200))] pb-4'>
            Precipitation
          </p>
          <p className='text-4xl'>
            {data.hourly.length === 0 ? '-' : data.current.percipitation +' ' + unit.precipitation}
          </p>
        </div>
      </div>
    </div>
  )
}