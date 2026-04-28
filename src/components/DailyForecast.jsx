export function DailyForecast({data, getWeatherIcon}) {
  return (
    <div className='pb-8'>
      <h2 className='font-normal pb-4'>Daily forecast</h2>
      <div className='grid grid-cols-3 gap-4 text-sm md:grid-cols-7'>
        {data.daily.length === 0
          ? Array.from({ length: 7 }).map((_, i) => (
           <div key={i} className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
              <div className="h-4 w-10"></div>
              <div className='w-14 h-14'></div>
              <div className='flex flex-row justify-between items-center w-full'>
                <div className="h-4 w-10"></div>
                <div className="h-4 w-10"></div>
              </div>
            </div>
          ))
        : data.daily.map((day, index) =>
          (
            <div key={day.time ?? index} className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
              <p>{day.time}</p>
              <img className='w-14 h-14' src={getWeatherIcon(day.weatherCode)} alt="" />
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