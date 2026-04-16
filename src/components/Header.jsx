import Logo from '../assets/images/logo.svg';
import IconUnits from '../assets/images/icon-units.svg';
import IconDropdown from '../assets/images/icon-dropdown.svg';
import IconCheckmark from '../assets/images/icon-checkmark.svg';

export function Header({unit, setUnit, showUnits, setShowUnits}) {

  function toggleUnits() {
    return (
      <>
        <div className='bg-[hsl(var(--neutral-800))] rounded-md text-xs p-2 w-40 absolute top-18 right-7 z-10'>
          <button className='p-2'>Switch to Imperial</button>
          <div className='border-b border-b-[hsl(var(--neutral-600))]'>
            <p className='text-[hsl(var(--neutral-300))] p-2'>Temperature</p>
            <label htmlFor="celsius" className={`flex flex-row justify-between items-center p-2 ${unit.temperature === 'c' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
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
            <label htmlFor="fahrenheit" className={`flex flex-row justify-between items-center p-2 ${unit.temperature === 'f' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
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
          
          <div className='border-b border-b-[hsl(var(--neutral-600))]'>
            <p className='text-[hsl(var(--neutral-300))] p-2'>Wind Speed</p>
            <label htmlFor="wind-kmh" className={`flex flex-row justify-between items-center p-2 ${unit.windSpeed === 'km/h' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
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
            <label htmlFor="wind-mph" className={`flex flex-row justify-between items-center p-2 ${unit.windSpeed === 'mph' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
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
          
          <div className=''>
            <p className='text-[hsl(var(--neutral-300))] p-2'>Precipitation</p>
            <label htmlFor="millimeters" className={`flex flex-row justify-between items-center p-2 ${unit.precipitation === 'mm' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
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
            <label htmlFor="inches" className={`flex flex-row justify-between items-center p-2 ${unit.precipitation === 'in' ? 'bg-[hsl(var(--neutral-700))] rounded-md' : ''}`}>
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

  return (
    <>
      <header>
        <nav className='flex flex-row justify-between'>
          <img className='w-30' src={Logo} alt="Weather Now logo" />
          <button onClick={() => setShowUnits(!showUnits)} className='flex flex-row justify-center items-center gap-1 px-2 py-1.5 bg-[hsl(var(--neutral-800))] rounded-sm text-xs font-light'>
            <img className='w-3 h-3' src={IconUnits} alt="" />
            Units
            <img className='w-2 h-2' src={IconDropdown} alt="" />
          </button>
          {showUnits && toggleUnits()}
        </nav>
      </header>
    </>
  )
}