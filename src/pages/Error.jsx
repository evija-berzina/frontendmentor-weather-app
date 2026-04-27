import IconError from '../assets/images/icon-error.svg';
import IconRetry from '../assets/images/icon-retry.svg';

export function Error({reload}) {

  return (
    <div className='flex flex-col justify-center items-center text-center mt-20'>
      <img src={IconError} alt="" className='w-10 h-10' />
      <h1 className='text-5xl font-display text-center leading-14 tracking-tight py-4'>Something went wrong</h1>
      <p className='px-145 text-[hsl(var(--neutral-200))] mb-6'>
        We couldn't connect to the server (API error). Please try again in a few moments.
      </p>
      <button
        className='flex flex-row gap-2 rounded-md bg-[hsl(var(--neutral-600))] py-2 px-6 text-sm cursor-pointer hover:border hover:border-[hsl(var(--neutral-300))] transition-colors duration-300 ease-in-out'
        onClick={() => reload()}
      >
        <img src={IconRetry} alt="" />
        Retry
      </button>
    </div>
  )
}