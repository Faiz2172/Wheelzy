import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { LuFuel } from "react-icons/lu"
import { IoSpeedometerOutline } from "react-icons/io5"
import { GiGearStickPattern } from "react-icons/gi"
import { IoMdOpen } from "react-icons/io"
import { motion } from "framer-motion"

const CarItem = ({ car }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <motion.img
            src={car?.image || "/api/placeholder/400/320"}
            alt={car?.name}
            className="w-full h-64 object-cover rounded-t-xl"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {car?.price && (
          <div className="absolute top-4 right-4">
            <motion.div 
              className="bg-black text-white py-1 px-3 rounded-full font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ${car.price}
            </motion.div>
          </div>
        )}

        <div className="p-6">
          <h2 className="font-black text-black text-xl mb-2 truncate">{car?.name}</h2>
          <Separator className="my-3" />
          
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1, color: "#2563eb" }}
            >
              <LuFuel className="text-lg mb-1" />
              <span>{car?.miles} Miles</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1, color: "#2563eb" }}
            >
              <IoSpeedometerOutline className="text-lg mb-1" />
              <span>{car?.fuelType}</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1, color: "#2563eb" }}
            >
              <GiGearStickPattern className="text-lg mb-1" />
              <span>{car?.gearType}</span>
            </motion.div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between mt-2">
            <h2 className="font-bold text-2xl text-black">${car.price}</h2>
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Details</span>
              <IoMdOpen className="ml-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CarItem