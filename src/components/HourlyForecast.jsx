import dayjs from 'dayjs';
import IconDropdown from '../assets/images/icon-dropdown.svg';

export function HourlyForecast({data, getWeatherIcon, showUnits, setShowUnits}) {

  const now = dayjs().format('h A');
  const hourTime = data.hourly.findIndex((hour, index) => {
    if(hour.time === now) {
      return index;
    }
  });
  const hourTime2 = data.hourly.slice(hourTime, hourTime + 24);

  console.log(hourTime2)
  console.log(now)
  console.log(hourTime)

  function hourlyForecastDays() {
    return(
      <>
        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md text-xs p-2 w-40 absolute top-12 right-4 z-10'>
          {data.daily.map((days) => (
            
            <label htmlFor={days.day} key={days.day} className='flex flex-row justify-between items-center p-2 w-full'>
              <input type="radio" id={days.day} name="daily" className="hidden" />
              {days.day}
            </label>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col items-center gap-2 bg-[hsl(var(--neutral-800))] rounded-2xl py-4 ps-4 relative'>
      <div className='flex flex-row justify-between items-center w-full pe-4'>
        <h2 className='font-normal'>Hourly forecast</h2>
        <button
          className='flex flex-row justify-center items-center gap-2 px-4 py-1.5 bg-[hsl(var(--neutral-600))] rounded-sm text-xs font-light'
          onClick={() => setShowUnits(!showUnits)}
        >
          {data.daily?.[0]?.day ?? '-'}
          <img className='w-2 h-2' src={IconDropdown} alt="" />
        </button>
      </div>
      <div>{showUnits ? hourlyForecastDays() : null}</div>
      <div className='flex flex-col w-full gap-4 overflow-y-auto h-144 pe-4'>
        {hourTime2.map((hour) => (
          <div key={hour.time} className='flex flex-row justify-between items-center w-full bg-[hsl(var(--neutral-700))] rounded-lg border border-[hsl(var(--neutral-600))] px-4 py-2'>
            <div className='flex flex-row justify-center items-center gap-2'>
              <img className='w-10' src={getWeatherIcon(hour.weatherCode)} alt="" />
              <p>{hour.time}</p>
            </div>
            <p className='text-sm'>{hour.temperature}°</p>
          </div>
        ))}
      </div>
    </div> 
  )
}