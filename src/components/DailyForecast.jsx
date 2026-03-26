import IconRain from '../assets/images/icon-rain.webp';

export function DailyForecast() {
  return (
    <div className='pb-8'>
      <h2 className='font-normal pb-4'>Daily forecast</h2>
      <div className='grid grid-cols-3 gap-4 text-sm'>
        <div className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
          <p>Tue</p>
          <img className='w-14' src={IconRain} alt="" />
          <div className='flex flex-row justify-between items-center w-full'>
            <p>77°</p>
            <p>55°</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
          <p>Tue</p>
          <img className='w-14' src={IconRain} alt="" />
          <div className='flex flex-row justify-between items-center w-full'>
            <p>77°</p>
            <p>55°</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
          <p>Tue</p>
          <img className='w-14' src={IconRain} alt="" />
          <div className='flex flex-row justify-between items-center w-full'>
            <p>77°</p>
            <p>55°</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-2 bg-[hsl(var(--neutral-800))] border border-[hsl(var(--neutral-600))] rounded-md px-2 py-4'>
          <p>Tue</p>
          <img className='w-14' src={IconRain} alt="" />
          <div className='flex flex-row justify-between items-center w-full'>
            <p>77°</p>
            <p>55°</p>
          </div>
        </div>
      </div>
    </div>
  )
}