import Header from '@/components/Header'
import React, { useState } from 'react'
import carDetails from './../Shared/carDetails.json';
import InputField from './components/InputField';
import DropDownField from './components/DropDownField';
import TextAreaField from './components/TextAreaField';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import features from './../Shared/features.json'
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
function AddListing () {
  const [formData,setFormData]=useState([]);

    const handleInputChange=(name,value)=>{
      setFormData((prevData)=>({
        ...prevData,
        [name]:value
      }))
      console.log(formData);
    }

    const onSubmit=(e)=>{
      e.preventDefault();
        console.log(formData);
        }

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
                    {item.fieldType=='text' || item.fieldType=='number'?
                    <InputField item={item} handleInputChange={handleInputChange}/>
                    :item.fieldType =='dropdown'?<DropDownField item={item}
                    handleInputChange={handleInputChange}
                    />
                    :item.fieldType =='textarea'?
                    <Textarea item={item} />
                    :null}
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6 "/>
          {/* features List */}
          <div>
            <h2 className='font-md text-xl my-6'>Features</h2>
            <div className=' grid grid-cols-2 md:grid-cols-3'>
              {features.features.map((item,index)=>(
                <div className="flex items-center gap-3"key={index}>
                  <Checkbox onCheckedChange={(value)=>handleInputChange(item.name,value)}/> <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>


          {/* car Images */}
          <div className='mt-10 flex justify-end'>
            <Button type="submit" onClick={(e)=>onSubmit(e)}className="justify-end">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddListing
