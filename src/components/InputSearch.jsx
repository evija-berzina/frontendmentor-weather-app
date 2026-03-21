import IconSearch from '../assets/images/icon-search.svg';

export function InputSearch() {

  return (
    <>
      <img src={IconSearch} alt="" />
      <input type="text" placeholder="Search for a place..." />
      <button>Search</button>
    </>
  )
}