import IconSearch from '../assets/images/icon-search.svg';

export function InputSearch({getData}) {

  return (
    <form onSubmit={getData} className='flex flex-col gap-2'>
      <div className='relative w-full'>
        <img
          className='w-4 absolute z-10 top-1/2 -translate-y-1/2 left-4'
          src={IconSearch} alt="Search" />
        <input
          className='bg-[hsl(var(--neutral-800))] placeholder:text-[hsl(var(--neutral-200))] text-md font-light py-2 px-12 rounded-lg outline-none w-full'
          aria-label='Search for a place'
          type="search"
          name="search"
          placeholder="Search for a place..." />
      </div>
      <button
      type='submit'
      className='bg-[hsl(var(--blue-500))] py-2 rounded-lg text-md font-light'>Search</button>
    </form>
  )
}