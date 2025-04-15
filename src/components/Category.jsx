import Data from '@/Shared/Data'
import React from 'react'

const Category = () => {
  return (
    <div className='mt-40 '>
        <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type</h2>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20'>
            {Data.Category.map((Category,index)=>(
                <div key={Category.id} className='border-2 rounded-md hover:bg-blue-400 hover:cursor-pointer hover:scale-105 p-3  items-center flex flex-col'>
                    <img src={Category.icon}  width={35} height={35}/>
                    <h2 className='mt-2'>{Category.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Category
