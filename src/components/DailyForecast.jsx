export function DailyForecast({data, getWeatherIcon}) {
  return (
    <div className='pb-8'>
      <h2 className='font-normal pb-4'>Daily forecast</h2>
      <div className='grid grid-cols-3 gap-4 text-sm'>
        {data.daily.map(day =>
          (
            <div key={day.time} className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
              <p>{day.time}</p>
              <img className='w-14' src={getWeatherIcon(day.weatherCode)} alt="" />
              <div className='flex flex-row justify-between items-center w-full'>
                <p>{day.maxTemperature}°</p>
                <p>{day.minTemperature}°</p>
              </div>
            </div>
          )
        )
        
        }
      </div>
    </div>
  )
}