import { Button } from '@/components/ui/button';
import React from 'react'

// Listing Card Component
function ListingCard({ listing, onDelete }) {
    return (
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {listing.imageUrls && listing.imageUrls.length > 0 ? (
            <img 
              src={listing.imageUrls[0]} 
              alt={`${listing.make} ${listing.model}`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
              No image available
            </div>
          )}
          
          {/* Listing status badge */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Active
            </span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 dark:text-white">
            {listing.make} {listing.model} {listing.year}
          </h3>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
            <span className="text-lg font-semibold text-primary dark:text-blue-400">
              ${Number(listing.price).toLocaleString()}
            </span>
          </div>
          
          {/* Car details */}
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            {listing.mileage && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <span>Mileage:</span>
                <span>{Number(listing.mileage).toLocaleString()} mi</span>
              </div>
            )}
            
            {listing.transmission && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <span>Transmission:</span>
                <span>{listing.transmission}</span>
              </div>
            )}
            
            {listing.fuelType && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <span>Fuel:</span>
                <span>{listing.fuelType}</span>
              </div>
            )}
            
            {listing.condition && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <span>Condition:</span>
                <span>{listing.condition}</span>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 justify-end mt-4">
              <Button variant="outline" className="text-sm px-3 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Edit
              </Button>
            
            <Button 
              variant="outline" 
              className="text-sm px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }

export default ListingCard
