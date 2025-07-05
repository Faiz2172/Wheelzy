import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import { Separator } from './components/ui/separator'

const Home = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  // Handle loading screen for 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showLoadingScreen && (
          <LoadingScreen 
            title="CarDekho"
            message="Loading your car shopping experience..."
          />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: showLoadingScreen ? 0.5 : 0, duration: 0.5 }}
      >
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
        <Separator  />
        {/* Footer-Section */}
        <Footer/>
      </motion.div>
    </>
  )
}

export default Home

