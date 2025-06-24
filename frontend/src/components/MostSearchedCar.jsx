import React, { useState, useEffect } from 'react'
import CarItem from './CarItem'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase.js'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MostSearchedCar = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const carsCollection = collection(db, 'carListings')
        const carsSnapshot = await getDocs(carsCollection)
        const carsList = carsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        })
        setCars(carsList)
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

  if (cars.length === 0) {
    return (
      <div className='mx-24'>
        <h2 className='font-bold text-3xl text-center my-16'>Most Searched Cars</h2>
        <div className="text-center py-8">No cars found</div>
      </div>
    )
  }

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center my-16'>Most Searched Cars</h2>
      <Carousel>
        <CarouselContent >
        {cars.map((car) => (
  <CarouselItem key={car.id} className="basis-1/4">
    <CarItem car={car} />
  </CarouselItem>
))}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MostSearchedCar