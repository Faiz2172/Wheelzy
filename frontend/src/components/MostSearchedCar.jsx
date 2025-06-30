import React, { useState, useEffect } from 'react'
import CarItem from './CarItem'
import { carListingApi } from '../services/api.js'
import Marquee from 'react-fast-marquee'

const MostSearchedCar = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const VISIBLE_COUNT = 4

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await carListingApi.getAllCarListings()
        setCars(response.data.data || [])
      } catch (err) {
        console.error("Error fetching cars:", err)
        setError("Failed to load cars. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (loading) {
    return (
      <div className='mx-24'>
        <h2 className='font-bold text-3xl text-center my-16'>Most Searched Cars</h2>
        <div className="text-center py-8">Loading cars...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mx-24'>
        <h2 className='font-bold text-3xl text-center my-16'>Most Searched Cars</h2>
        <div className="text-center text-red-500 py-8">{error}</div>
      </div>
    )
  }

  if (cars.length < VISIBLE_COUNT) {
    return (
      <div className='mx-24'>
        <h2 className='font-bold text-3xl text-center my-16'>Most Searched Cars</h2>
        <div className="text-center py-8">At least 4 cars are required to show the slider.</div>
      </div>
    )
  }

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center my-16'>Most Searched Cars</h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true} style={{ gap: '2rem' }}>
        {cars.map((car) => (
          <div key={car.id} style={{ width: '300px', marginRight: '32px' }}>
            <CarItem car={car} />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default MostSearchedCar