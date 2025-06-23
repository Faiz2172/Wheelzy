import React from 'react'
import Search from './Search'
import Category from './Category'

const Hero = () => {
  return (
    <div>
        <div className='flex flex-col items-center p-4 md:p-10 py-12 md:py-20 gap-4 md:gap-6 min-h-[400px] md:h-[650px] w-full bg-[#eef0fc]'>
            <h2 className='text-base md:text-lg text-center'>Find Cars for Sale and rent near you</h2>
            <h2 className='text-3xl md:text-5xl lg:text-[60px] font-bold text-center'>Find Your Dream Car</h2>
            <Search/>
            <img src="/tesla.png" className='mt-10 w-auto max-w-full h-auto' />
        </div>
    </div>
  )
}

export default Hero