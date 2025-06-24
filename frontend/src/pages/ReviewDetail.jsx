import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reviewApi } from '../services/api';
import { 
  FiUser, 
  FiCalendar, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiStar,
  FiThumbsUp,
  FiShare2,
  FiBookmark,
  FiMessageSquare
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Skeleton } from '@mui/material';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        const response = await reviewApi.getReviewById(id);
        setReview(response.data.data);
        setError(null);
      } catch (err) {
        setError('Review not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });

  const handleHelpfulClick = () => {
    setIsHelpful(!isHelpful);
    // You would typically call an API here to update the helpful count
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Skeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
          </motion.div>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
            <div className="mb-6">
              <Skeleton variant="text" width="70%" height={40} className="mb-4" />
              <div className="flex gap-4 mb-4">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width={100} height={24} />
              </div>
              <Skeleton variant="rectangular" width={200} height={32} className="mb-6 rounded-md" />
            </div>
            
            <div className="space-y-3">
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="90%" height={24} />
              <Skeleton variant="text" width="70%" height={24} />
            </div>
            
            <div className="mt-8 flex gap-4">
              <Skeleton variant="rectangular" width={120} height={40} className="rounded-full" />
              <Skeleton variant="rectangular" width={120} height={40} className="rounded-full" />
              <Skeleton variant="rectangular" width={120} height={40} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6"
      >
        <div className="max-w-md text-center bg-white p-8 rounded-3xl shadow-lg">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
          >
            <FiArrowLeft className="text-lg" /> 
            <span>Return to Reviews</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
        >
          <FiArrowLeft className="text-xl" />
          <span>Back to Reviews</span>
        </motion.button>

        {/* Review Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8 sm:p-10">
            {/* Review Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {review.carBrand} {review.carModel}
                </h1>
                {review.verifiedPurchase && (
                  <span className="flex items-center gap-1 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full self-start sm:self-center">
                    <FiCheckCircle className="text-green-500" /> Verified Purchase
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-2">
                  <FiUser className="text-purple-500" /> 
                  <span className="font-medium text-gray-700">{review.reviewerName}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-purple-500" /> 
                  {formatDate(review.createdAt)}
                </span>
                {review.purchaseDate && (
                  <span className="flex items-center gap-2">
                    <FiCalendar className="text-purple-500" /> 
                    Purchased: {formatDate(review.purchaseDate)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Rating
                  value={review.rating}
                  readOnly
                  style={{ maxWidth: 120 }}
                  itemStyles={{
                    itemShapes: FiStar,
                    activeFillColor: '#f59e0b',
                    inactiveFillColor: '#e5e7eb',
                  }}
                />
                <span className="text-lg font-medium text-gray-700">{review.rating}.0</span>
              </div>
            </div>

            {/* Review Content */}
            <div className="prose prose-lg max-w-none text-gray-800 mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {review.reviewText}
              </ReactMarkdown>
            </div>

            {/* Review Stats */}
            {review.helpfulCount > 0 && (
              <div className="text-sm text-gray-500 mb-6">
                {review.helpfulCount} people found this helpful
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleHelpfulClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isHelpful 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiThumbsUp className={isHelpful ? 'text-purple-600' : 'text-gray-500'} />
                <span>{isHelpful ? 'Helpful' : 'Helpful'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isBookmarked 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiBookmark className={isBookmarked ? 'text-amber-500' : 'text-gray-500'} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition-colors"
              >
                <FiShare2 className="text-gray-500" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition-colors"
              >
                <FiMessageSquare className="text-gray-500" />
                <span>Comment</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Related Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">More Reviews for {review.carBrand}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related reviews - you would map through actual data here */}
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                    {item === 1 ? 'JD' : 'AS'}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Reviewer {item}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiCalendar size={12} />
                      <span>2 weeks ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`${star <= (item === 1 ? 4 : 5) ? 'text-yellow-400' : 'text-gray-300'}`}
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {item === 1 
                    ? "Great car overall, but the fuel economy could be better for city driving." 
                    : "Absolutely love this vehicle! The performance exceeds all my expectations."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReviewDetail;