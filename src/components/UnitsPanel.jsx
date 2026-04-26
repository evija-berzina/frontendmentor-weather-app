import {useState} from 'react';
import IconCheckmark from '../assets/images/icon-checkmark.svg';

export function UnitsPanel({unit, setUnit}) {
  const [allUnits, setAllUnits] = useState('metric');

  function switchAllUnits() {
    if(allUnits === 'metric') {
      setAllUnits('imperial');
      setUnit({
        temperature: 'f',
        windSpeed: 'mph',
        precipitation: 'in'
      });
    } else {
      setAllUnits('metric');
      setUnit({
        temperature: 'c',
        windSpeed: 'km/h',
        precipitation: 'mm'
      });
    }
  }

  return (
    <>
      <div className='bg-[hsl(var(--neutral-800))] rounded-md text-xs p-2 w-40 absolute top-18 right-7 z-10'>
        <button
          className='p-2 text-left cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md hover:w-full'
          onClick={() => switchAllUnits()}
        >{allUnits === 'metric' ? 'Switch to Imperial' : 'Switch to Metric'}</button>
        <div className=' flex flex-col gap-2 border-b border-b-[hsl(var(--neutral-600))] pb-2'>
          <p className='text-[hsl(var(--neutral-300))] px-2 pt-2'>Temperature</p>
          <label htmlFor="celsius" className={`flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md ${unit.temperature === 'c' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
            <input
              id="celsius"
              type="radio"
              name="temp"
              value="c"
              checked={unit?.temperature === 'c'}
              onChange={() => setUnit({ ...unit, temperature: 'c' })}
              className="hidden"
            />

            Celsius (°C)

            {unit.temperature === 'c' ? <img src={IconCheckmark} alt="" /> : null}
          </label>
          <label htmlFor="fahrenheit" className={`flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md ${unit.temperature === 'f' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
            <input
              id="fahrenheit"
              type="radio"
              name="temp"
              value="f"
              checked={unit.temperature === 'f'}
              onChange={() => setUnit({ ...unit, temperature: 'f' })}
              className="hidden"
            />

            Fahrenheit (°F)

            {unit.temperature === 'f' ? <img src={IconCheckmark} alt="" /> : null}
          </label>
        </div>
        
        <div className='flex flex-col gap-2 border-b border-b-[hsl(var(--neutral-600))] pb-2'>
          <p className='text-[hsl(var(--neutral-300))] px-2 pt-2'>Wind Speed</p>
          <label htmlFor="wind-kmh" className={`flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md ${unit.windSpeed === 'km/h' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
            <input
              id="wind-kmh"
              type="radio"
              name="windSpeed"
              value="km/h"
              checked={unit.windSpeed === 'km/h'}
              onChange={() => setUnit({ ...unit, windSpeed: 'km/h' })}
              className="hidden"
            />

            km/h

            {unit.windSpeed === 'km/h' ? <img src={IconCheckmark} alt="" /> : null}
          </label>
          <label htmlFor="wind-mph" className={`flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md ${unit.windSpeed === 'mph' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
            <input
              id="wind-mph"
              type="radio"
              name="windSpeed"
              value="mph"
              checked={unit.windSpeed === 'mph'}
              onChange={() => setUnit({ ...unit, windSpeed: 'mph' })}
              className="hidden"
            />

            mph

            {unit.windSpeed === 'mph' ? <img src={IconCheckmark} alt="" /> : null}
          </label>
        </div>
        
        <div className='flex flex-col gap-2'>
          <p className='text-[hsl(var(--neutral-300))] px-2 pt-2'>Precipitation</p>
          <label htmlFor="millimeters" className={`flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md ${unit.precipitation === 'mm' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
            <input
              id="millimeters"
              type="radio"
              name="precipitation"
              value="mm"
              checked={unit.precipitation === 'mm'}
              onChange={() => setUnit({ ...unit, precipitation: 'mm' })}
              className="hidden"
            />
            Millimeters (mm)
            {unit.precipitation === 'mm' ? <img src={IconCheckmark} alt="" /> : null}
          </label>
          <label htmlFor="inches" className={`flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-[hsl(var(--neutral-700))] hover:rounded-md ${unit.precipitation === 'in' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
            <input
              id="inches"
              type="radio"
              name="precipitation"
              value="in"
              checked={unit.precipitation === 'in'}
              onChange={() => setUnit({ ...unit, precipitation: 'in' })}
              className="hidden"
            />
            Inches (in)
            {unit.precipitation === 'in' ? <img src={IconCheckmark} alt="" /> : null}
          </label>
        </div>
      </div>
    </>
  )
}