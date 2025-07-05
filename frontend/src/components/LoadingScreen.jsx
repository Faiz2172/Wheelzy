import React from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import chatbotAnimation from '../assets/chatbot-animation.json'

const LoadingScreen = ({ 
  title = "CarDekho", 
  message = "Loading your car shopping experience...",
  animationData = chatbotAnimation,
  animationSize = { width: 300, height: 300 }
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Lottie
            animationData={animationData}
            loop={true}
            style={animationSize}
          />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {message}
          </p>
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
