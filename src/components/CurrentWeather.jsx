import BgImageSmall from '../assets/images/bg-today-small.svg';
import BgImageLarge from '../assets/images/bg-today-large.svg';
import IconSunny from '../assets/images/icon-sunny.webp';

export function CurrentWeather() {
  
  return (
    <>
      <div className=' relative w-full h-72 flex flex-col justify-evenly items-center p-6 rounded-2xl overflow-hidden mt-8 mb-4'>
        <picture className='absolute inset-0 w-full h-full'>
          <source srcSet={BgImageLarge} media="(width: 425px)" />
          <img src={BgImageSmall} alt="MDN"
          className="w-full h-full object-cover" />
        </picture>
        <div className='text-center relative'>
          <p className='text-3xl font-semibold'>
            Berlin, Germany
          </p>
          <p className='text-xl pt-2'>
            Tuesday, Aug 5, 2025
          </p>
        </div>
        <div className='flex flex-row justify-between items-center w-full relative'>
          <img
          className='w-30 h-30'
          src={IconSunny} alt="" />
          <p className='text-8xl italic font-normal'>68°</p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='
          text-[hsl(var(--neutral-200))] text-md pb-4'>
            Feels Like
          </p>
          <p className='text-4xl'>64°</p>
        </div>
        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='
          text-[hsl(var(--neutral-200))] text-md pb-4'>
            Humidity
          </p>
          <p className='text-4xl'>46%</p>
        </div>
        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='
          text-[hsl(var(--neutral-200))] text-md pb-4'>
            Wind
          </p>
          <p className='text-4xl'>9 mph</p>
        </div>
        <div className='bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md p-4'>
          <p className='
          text-[hsl(var(--neutral-200))] text-md pb-4'>
            Precipitation
          </p>
          <p className='text-4xl'>0 in</p>
        </div>
      </div>
    </>
  )
}