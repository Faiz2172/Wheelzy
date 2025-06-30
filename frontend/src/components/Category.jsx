import Data from '@/Shared/Data'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { carListingApi } from '../services/api.js';
import CarItem from './CarItem';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setLoading(true);
    setError(null);
    try {
      const response = await carListingApi.getAllCarListings({ category: categoryName });
      setCars(response.data.data || []);
    } catch (err) {
      setError('Failed to load cars for this category.');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-20 mb-16'>
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h2 className='font-bold text-4xl text-gray-800 mb-3'>Browse By Type</h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Discover your perfect vehicle from our diverse collection of car categories
        </p>
      </div>

      {/* Category Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4 lg:gap-6'>
          {Data.Category.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`
                group relative bg-white border-2 rounded-xl p-4 lg:p-6 
                transition-all duration-300 ease-in-out cursor-pointer
                hover:shadow-xl hover:scale-105 hover:-translate-y-1
                flex flex-col items-center justify-center min-h-[120px]
                ${selectedCategory === category.name 
                  ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-blue-300'
                }
              `}
            >
              {/* Icon with animation */}
              <div className={`
                p-3 rounded-full mb-3 transition-all duration-300
                ${selectedCategory === category.name 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 group-hover:bg-blue-100'
                }
              `}>
                <img 
                  src={category.icon} 
                  width={32} 
                  height={32} 
                  className={`
                    transition-all duration-300 
                    ${selectedCategory === category.name ? 'filter brightness-0 invert' : ''}
                  `}
                  alt={category.name}
                />
              </div>
              
              {/* Category Name */}
              <h3 className={`
                text-sm lg:text-base font-semibold text-center transition-colors duration-300
                ${selectedCategory === category.name 
                  ? 'text-blue-700' 
                  : 'text-gray-700 group-hover:text-blue-600'
                }
              `}>
                {category.name}
              </h3>

              {/* Selection Indicator */}
              {selectedCategory === category.name && (
                <div className='absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                  <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {selectedCategory && (
        <div className='mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Results Header */}
          <div className='text-center mb-8'>
            <h3 className='text-3xl font-bold text-gray-800 mb-2'>
              {selectedCategory} Collection
            </h3>
            <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full'></div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='flex flex-col items-center justify-center py-16'>
              <div className='relative'>
                <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin'></div>
              </div>
              <p className='mt-4 text-lg text-gray-600 font-medium'>Finding perfect cars for you...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='bg-red-50 border border-red-200 rounded-xl p-8 text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                </svg>
              </div>
              <h4 className='text-xl font-semibold text-red-800 mb-2'>Oops! Something went wrong</h4>
              <p className='text-red-600'>{error}</p>
              <button 
                onClick={() => handleCategoryClick(selectedCategory)}
                className='mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && cars.length === 0 && (
            <div className='bg-gray-50 border border-gray-200 rounded-xl p-12 text-center'>
              <div className='w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
                <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                </svg>
              </div>
              <h4 className='text-2xl font-semibold text-gray-700 mb-3'>No cars available</h4>
              <p className='text-gray-500 mb-6'>
                We don't have any {selectedCategory.toLowerCase()} cars in our inventory right now.
              </p>
              <p className='text-sm text-gray-400'>
                Check back soon or explore other categories!
              </p>
            </div>
          )}

          {/* Cars Grid */}
          {!loading && !error && cars.length > 0 && (
            <div>
              <div className='flex items-center justify-between mb-6'>
                <p className='text-gray-600'>
                  Showing <span className='font-semibold text-gray-800'>{cars.length}</span> {selectedCategory.toLowerCase()} {cars.length === 1 ? 'car' : 'cars'}
                </p>
                <div className='flex items-center space-x-2 text-sm text-gray-500'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                  </svg>
                  <span>Click on any car to view details</span>
                </div>
              </div>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {cars.map((car, index) => (
                  <div 
                    key={car.id} 
                    className='transform transition-all duration-300 hover:scale-105'
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100'>
                      <CarItem car={car} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Category