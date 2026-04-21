import IconDropdown from '../assets/images/icon-dropdown.svg';

export function HourlyForecast({data, getWeatherIcon, showUnits, setShowUnits}) {

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
    <div className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] rounded-2xl p-4 relative'>
      <div className='flex flex-row justify-between items-center w-full'>
        <h2 className='font-normal'>Hourly forecast</h2>
        <button
          className='flex flex-row justify-center items-center gap-2 px-4 py-1.5 bg-[hsl(var(--neutral-600))] rounded-sm text-xs font-light'
          onClick={() => setShowUnits(!showUnits)}
        >
          {data.daily.map(day => day.day)[0]}
          <img className='w-2 h-2' src={IconDropdown} alt="" />
        </button>
        <div>{showUnits ? hourlyForecastDays() : null}</div>
      </div>
      {data.hourly.map(hour => (
        <div key={hour.time} className='flex flex-row justify-between items-center w-full bg-[hsl(var(--neutral-700))] rounded-lg border border-[hsl(var(--neutral-600))] px-4 py-2'>
          <div className='flex flex-row justify-center items-center gap-2'>
            <img className='w-10' src={getWeatherIcon(hour.weatherCode)} alt="" />
            <p>{hour.time} PM</p>
          </div>
          <p className='text-sm'>{hour.temperature}°</p>
        </div>
      ))}
    </div>
  )
}