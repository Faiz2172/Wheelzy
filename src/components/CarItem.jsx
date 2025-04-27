import React, { useState } from 'react'
import { Link } from 'react-router-dom' 

const CarItem = ({ car }) => {
  // Extract properties from car object
  const carMake = car?.make || 'Unknown'
  const carModel = car?.model || 'Model'
  const carYear = car?.year || 'N/A'
  const carPrice = car?.price || 'Contact for price'
  const carImage = car?.imageUrls?.[0] || null
  const carLocation = car?.location || 'Unknown location'
  const carMileage = car?.mileage || 'N/A'
  const [imageError, setImageError] = useState(false)// State to track if image failed to load

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="h-48 overflow-hidden relative">
        {carImage && !imageError ? (
          <img 
            src={carImage} 
            alt={`${carYear} ${carMake} ${carModel}`} 
            className="w-full h-full object-cover"
            onError={() => {
              console.error("Image failed to load:", carImage);
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
          {carYear}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{carMake} {carModel}</h3>
        <p className="text-gray-700 font-medium text-lg mb-2">${typeof carPrice === 'number' ? carPrice.toLocaleString() : carPrice}</p>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{carMileage} {typeof carMileage === 'number' ? 'mi' : ''}</span>
          <span>{carLocation}</span>
        </div>
        
        <Link 
          to={`/car/${car?.id}`} 
          className="mt-3 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default CarItem