import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  // const {user,isSignedIn}=useUser();
  const { user, isSignedIn } = useUser();
console.log("USER:", user, "SIGNED IN:", isSignedIn);


  return (
    <div className='flex justify-between items-center shadow-md p-5 bg-white sticky top-0 z-50'>
      <img 
        src="/logo.svg" 
        width={150} 
        height={100} 
        className="transition-transform duration-300 hover:scale-105"
      />
      <ul className='hidden md:flex gap-16'>
        <li className='font-[25px] transition-all duration-300 cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>Home</li>
        <li className='font-[25px] transition-all duration-300 cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>Search</li>
        <li className='font-[25px] transition-all duration-300 cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>New</li>
        <li className='font-[25px] transition-all duration-300 cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>PreOwned</li>
      </ul>
      
      {isSignedIn ? (
        <div className='flex gap-5 items-center'>
          <div className="transition-transform duration-300 hover:scale-110 cursor-pointer">
            <UserButton/>
          </div>
          <Button className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-primary hover:bg-primary/90">Submit Listing</Button>
        </div>
      ) : (
        <Button className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-primary hover:bg-primary/90">Submit Listing</Button>
      )}
    </div>
  )
}

export default Header
