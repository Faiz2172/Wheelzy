import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='flex justify-between items-center shadow-md p-5 bg-white sticky top-0 z-50'>
      <img 
        src="/logo.svg" 
        width={150} 
        height={100} 
        className="transition-transform duration-300 hover:scale-105"
        alt="Logo"
      />
      
      <ul className='hidden md:flex gap-16'>
        <Link to={'/'}>
        <li className='font-[25px] cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>Home</li>
        </Link>
        <li className='font-[25px] cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>New</li>
        <Link to={'/blogs'}>
        <li className='font-[25px] cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>Blogs</li>
        </Link>
        <Link to={'/recommend'}>
        <li className='font-[25px] cursor-pointer hover:text-primary hover:underline hover:underline-offset-4 hover:font-medium'>Ai Car Recommend</li> 
        </Link>
       
        
      </ul>

      <div className='flex gap-5 items-center'>
        {/* Signed Out: Show Login Button */}
        <SignedOut>
          <SignInButton>
            <Button className="bg-primary hover:bg-primary/90">Login</Button>
          </SignInButton>
        </SignedOut>

        {/* Signed In: Show User Avatar */}
        <SignedIn>
          <div className="transition-transform duration-300 hover:scale-110 cursor-pointer">
            <UserButton />
          </div>
        </SignedIn>

        {/* Submit Listing button visible for all */}
        <Link to={'/profile'}>
        <Button className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-primary hover:bg-primary/90">
          Submit Listing
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;