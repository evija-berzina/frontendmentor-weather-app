import Logo from '../assets/images/logo.svg';
import IconUnits from '../assets/images/icon-units.svg';
import IconDropdown from '../assets/images/icon-dropdown.svg';

export function Header() {

  return (
    <>
      <header>
        <nav>
          <img src={Logo} alt="Weather Now logo" />
          <button>
            <img src={IconUnits} alt="" />
            Units
            <img src={IconDropdown} alt="" />
          </button>
          <div>
            
          </div>
        </nav>
      </header>
    </>
  )
}