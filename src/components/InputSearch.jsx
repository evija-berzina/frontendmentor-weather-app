import IconSearch from '../assets/images/icon-search.svg';

export function InputSearch({getData, query, setQuery, suggestions, setSuggestions, handleSelect}) {

  return (
    <form onSubmit={getData} className='flex flex-col gap-2 md:flex-row md:gap-4 md:justify-center md:items-center md:max-w-xl md:mx-auto mb-10'>
      <div className='relative w-full xl:w-auto'>
        <img
          className='w-4 absolute z-10 top-1/2 -translate-y-1/2 left-4'
          src={IconSearch} alt="Search" />
        <input
          className='bg-[hsl(var(--neutral-800))] placeholder:text-[hsl(var(--neutral-200))] text-md font-light py-3 pl-12 pr-4 rounded-lg  w-full md:w-120 cursor-pointer'
          aria-label='Search for a place'
          type="search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          placeholder="Search for a place..." />
        {suggestions.length > 0 && (
          <ul className='bg-[hsl(var(--neutral-800))] rounded-md text-sm p-3 w-full absolute top-14 z-10'>
            {suggestions.map((item, index) => (
              <li
                className='p-2 rounded-md cursor-pointer hover:bg-[hsl(var(--neutral-600))] '
                key={index}
                onClick={() => {handleSelect(item); setQuery(''); setSuggestions([])}}
              >
                {item.display_name.split(',').slice(0, 1)}, {item.display_name.split(',').slice(-1)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
      type='submit'
      className='bg-[hsl(var(--blue-500))] py-3 px-6 rounded-lg text-md font-light cursor-pointer hover:bg-[hsl(var(--blue-700))] transition-colors duration-300 ease-in-out'>Search</button>
    </form>
  )
}