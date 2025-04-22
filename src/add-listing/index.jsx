import Header from '@/components/Header'
import React from 'react'
import carDetails from './../Shared/carDetails.json';
import InputField from './components/InputField';
import DropDownField from './components/DropDownField';
import TextAreaField from './components/TextAreaField';
import { Textarea } from '@/components/ui/textarea';

const AddListing = () => {
  return (
    <div>
      <Header/>
      <div className='px-10 md:px-20 my-10'>
        <h2 className='text-4xl font-bold'>Add New Listing</h2>
        <form className='p-10 border-2 rounded-xl mt-10'>
          {/* Car details */}
            <div >
              <h2 className='font-medium text-xl mb-6'>Car details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {carDetails.carDetails.map((item,index)=>(
                  <div key={index}>
                    <label className='text-sm'>{item?.label} {item.required&&<span className='text-red-700'>*</span>}</label>
                    {item.fieldType=='text' || item.fieldType=='number' 
                    ?<InputField item={item}/>
                    :item.fieldType =='dropdown'?<DropDownField item={item}/>
                    :item.fieldType =='textarea'?<Textarea item={item}/>
                    :null}
                  </div>
                ))}
              </div>
            </div>
          {/* features List */}

          {/* car Images */}
        </form>
      </div>
    </div>
  )
}

export default AddListing
