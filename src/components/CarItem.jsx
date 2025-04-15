import React from 'react'

const CarItem = ({ car }) => { 
  return (
    <div>
      <div>
        <h2>{car.name}</h2>  
      </div>
    </div>
  )
}

export default CarItem