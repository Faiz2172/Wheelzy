import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <Hero/>
      {/* Category */}
      <Category/>
      {/* Most Searched Car */}
      <MostSearchedCar/>
      {/* Info-Section */}
<InfoSection/>
{/* Footer-Section */}
<Footer/>
      
    </div>
  )
}

export default Home

