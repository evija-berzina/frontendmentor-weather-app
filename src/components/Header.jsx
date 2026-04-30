import Logo from '../assets/images/logo.svg';
import IconUnits from '../assets/images/icon-units.svg';
import IconDropdown from '../assets/images/icon-dropdown.svg';
import { UnitsPanel } from './UnitsPanel';

export function Header({unit, setUnit, showUnits, setShowUnits}) {

  return (
    <>
      <header>
        <nav className='flex flex-row justify-between'>
          <img className='w-40 sm:w-50' src={Logo} alt="Weather Now logo" />
          <button onClick={() => setShowUnits(!showUnits)} className='flex flex-row justify-center items-center gap-2 px-5 py-3 bg-[hsl(var(--neutral-800))] rounded-md text-sm font-light cursor-pointer hover:bg-[hsl(var(--neutral-700))] transform transition-colors duration-300 ease-in-out'>
            <img className='w-4 h-4' src={IconUnits} alt="" />
            Units
            <img
              src={IconDropdown}
              className={`w-3 h-3 transform transition-transform duration-300 ease-in-out ${showUnits ? "rotate-180" : "rotate-0"}`}
              alt=""
            />
          </button>
          {showUnits && <UnitsPanel unit={unit} setUnit={setUnit} />}
        </nav>
      </header>
    </>
  )
}