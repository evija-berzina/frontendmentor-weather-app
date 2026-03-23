import Logo from '../assets/images/logo.svg';
import IconUnits from '../assets/images/icon-units.svg';
import IconDropdown from '../assets/images/icon-dropdown.svg';

export function Header() {

  return (
    <>
      <header>
        <nav className='flex flex-row justify-between'>
          <img className='w-30' src={Logo} alt="Weather Now logo" />
          <button className='flex flex-row justify-center items-center gap-1 px-2 py-1.5 bg-[hsl(var(--neutral-800))] rounded-sm text-xs font-light'>
            <img className='w-3 h-3' src={IconUnits} alt="" />
            Units
            <img className='w-2 h-2' src={IconDropdown} alt="" />
          </button>
        </nav>
      </header>
    </>
  )
}