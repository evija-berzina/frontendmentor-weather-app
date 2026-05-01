import { useState } from 'react';
import IconError from '../assets/images/icon-error.svg';
import IconRetry from '../assets/images/icon-retry.svg';

export function Error({reload}) {
  const [loading, setLoading] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    await reload();
    setLoading(false);
  };

  return (
    <div className='flex flex-col justify-center items-center text-center mt-20'>
      <img src={IconError} alt="" className='w-10 h-10' />
      <h1 className='text-5xl font-display text-center leading-14 tracking-tight py-4'>Something went wrong</h1>
      <p className='text-[hsl(var(--neutral-200))] mb-6'>
        We couldn't connect to the server (API error). Please try again in a few moments.
      </p>
      <button
        className='flex flex-row gap-2 rounded-md bg-[hsl(var(--neutral-600))] py-2 px-6 text-sm cursor-pointer hover:shadow-[0_0_3px_hsl(var(--neutral-300))] transition-colors duration-300 ease-in-out'
        onClick={() => {
          handleReload();
          reload();
        }}
      >
        <img src={IconRetry} alt="" className={loading ? 'animate-spin' : ''} />
        Retry
      </button>
    </div>
  )
}