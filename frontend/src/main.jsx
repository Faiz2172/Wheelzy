import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Profile from './profile'
import AddListing from './add-listing'
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import Blog from './pages/BlogReview'
import BlogDetail from './pages/BlogDetail'
import ReviewDetail from './pages/ReviewDetail'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/add-listing',
    element:<AddListing/>
  },
  {
    path:'/search/:category',
    element:<SearchByCategory/>
  },
  {
    path:'/search',
    element:<SearchByOptions/>
  },
  {
    path:'/blogs',
    element:<Blog/>
  },
  {
    path:'/blogs/:id',
    element:<BlogDetail/>
  },
  {
    path:'/reviews/:id',
    element:<ReviewDetail/>
  },
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <RouterProvider router={router}/>
  </ClerkProvider>
</StrictMode>,

)
