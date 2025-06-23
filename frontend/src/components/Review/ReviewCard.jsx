import React from 'react';
import { FiUser, FiCalendar, FiCheckCircle, FiThumbsUp } from 'react-icons/fi';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-200'}`}
      >
        ★
      </span>
    ));

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="p-6">
        {/* Header with car info and rating */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {review.carBrand} {review.carModel}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">{renderStars(review.rating)}</div>
              <span className="text-sm font-medium text-gray-600">
                {review.rating.toFixed(1)}/5
              </span>
            </div>
          </div>
          
          {review.verifiedPurchase && (
            <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              <FiCheckCircle className="text-green-500" /> Verified
            </span>
          )}
        </div>

        {/* Review text */}
        <p className="text-gray-600 mb-5 leading-relaxed">
          {review.reviewText}
        </p>

        {/* Footer with user info and actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FiUser size={14} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{review.reviewerName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FiCalendar size={12} /> {formatDate(review.createdAt)}
                </span>
                {review.purchaseDate && (
                  <span className="hidden sm:inline-flex items-center gap-1">
                    • Purchased: {formatDate(review.purchaseDate)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <button 
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            onClick={() => console.log('Helpful clicked')}
          >
            <FiThumbsUp size={16} />
            <span>{review.helpfulCount || 0}</span>
          </button>
        </div>
      </div>
      
      {/* Purchase date for mobile */}
      {review.purchaseDate && (
        <div className="sm:hidden px-6 pb-4 text-xs text-gray-500">
          Purchased: {formatDate(review.purchaseDate)}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;