import {useState} from 'react';
import dayjs from 'dayjs';
import IconDropdown from '../assets/images/icon-dropdown.svg';

export function HourlyForecast({data, getWeatherIcon}) {

  const [selectedDay, setSelectedDay] = useState(null);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  const now = dayjs().format('h A');
  const hourTime = data.hourly.findIndex((hour, index) => {
    if(hour.time === now) {
      console.log(hour.time)
      return index;
    }
  });
  const hourTime2 = data.hourly.slice(hourTime, hourTime + 24);

  
  const dayTime = data.hourly.filter(hour => {
    const daysFormat = dayjs(hour.time2).format('YYYY-MM-DD');
    console.log(daysFormat)
    return daysFormat === selectedDay;
  });

  console.log(dayTime)
  
  console.log(selectedDay)
  console.log(now)
  console.log(hourTime)
  console.log(hourTime2)
  console.log(data.hourly)
  console.log(data.daily)

  function hourlyForecastDays() {
    return(
      <>
        <div className='flex flex-col gap-1 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md text-xs p-2 w-40 absolute top-12 right-4 z-10'>
          {data.daily.map((days) => (
            <label htmlFor={days.day} key={days.day} className={`flex flex-row justify-between items-center p-2 w-full hover:bg-[hsl(var(--neutral-700))] hover:rounded-md cursor-pointer ${days.day === selectedDay ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
              <input
                type="radio"
                id={days.day}
                name="daily"
                value={days.day}
                onChange={() => setSelectedDay(days.day)}
                className="hidden" />
              {dayjs(days.day).format('dddd')}
            </label>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col items-center gap-2 bg-[hsl(var(--neutral-800))] rounded-2xl py-4 ps-4 relative h-fit'>
      <div className='flex flex-row justify-between items-center w-full pe-4'>
        <h2 className='font-normal'>Hourly forecast</h2>
        <button
          className='flex flex-row justify-center items-center gap-2 px-4 py-1.5 bg-[hsl(var(--neutral-600))] rounded-sm text-xs font-light cursor-pointer'
          onClick={() => setShowDayDropdown(!showDayDropdown)}
        >
          {selectedDay === null
            ? data.daily?.[0]?.day
              ? dayjs(data.daily[0].day).format('dddd')
              : '-'
            : dayjs(selectedDay).format('dddd')
          }
          <img className='w-2 h-2' src={IconDropdown} alt="" />
        </button>
      </div>
      <div>{showDayDropdown ? hourlyForecastDays() : null}</div>
      <div className='flex flex-col w-full gap-4 overflow-y-auto h-144 pe-4'>
        {data.hourly.length === 0
          ? <div className='flex flex-row justify-between items-center w-full bg-[hsl(var(--neutral-700))] rounded-lg border border-[hsl(var(--neutral-600))] px-4 py-2'>
              <div className='flex flex-row justify-center items-center gap-2'>
                <img className='w-10' src='' alt="" />
                <p></p>
              </div>
              <p className='text-sm'></p>
            </div>
          : selectedDay === null
            ? hourTime2.map((hour) => (
              <div key={hour.time} className='flex flex-row justify-between items-center w-full bg-[hsl(var(--neutral-700))] rounded-lg border border-[hsl(var(--neutral-600))] px-4 py-2'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <img className='w-10' src={getWeatherIcon(hour.weatherCode)} alt="" />
                  <p>{hour.time}</p>
                </div>
                <p className='text-sm'>{hour.temperature}°</p>
              </div>
            ))
            : dayTime.map((hour) => (
              <div key={hour.time} className='flex flex-row justify-between items-center w-full bg-[hsl(var(--neutral-700))] rounded-lg border border-[hsl(var(--neutral-600))] px-4 py-2'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <img className='w-10' src={getWeatherIcon(hour.weatherCode)} alt="" />
                  <p>{hour.time}</p>
                </div>
                <p className='text-sm'>{hour.temperature}°</p>
              </div>
            ))
        }
      </div>
    </div> 
  )
}