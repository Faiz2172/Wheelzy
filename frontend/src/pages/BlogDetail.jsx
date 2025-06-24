import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogApi } from '../services/api';
import { 
  FiUser, 
  FiCalendar, 
  FiArrowLeft, 
  FiBookmark,
  FiShare2,
  FiMessageSquare,
  FiHeart
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Skeleton } from '@mui/material';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getBlogById(id);
        setBlog(response.data.data);
        setError(null);
      } catch (err) {
        setError('Blog not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Skeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
          </motion.div>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <Skeleton variant="rectangular" width="100%" height={400} className="mb-6" />
            
            <div className="p-8">
              <div className="mb-6">
                <Skeleton variant="text" width="80%" height={48} className="mb-4" />
                <div className="flex gap-4 mb-4">
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={100} height={24} />
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={100} height={24} />
                </div>
                <div className="flex gap-2 mb-6">
                  <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
                  <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
                </div>
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
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
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
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
          >
            <FiArrowLeft className="text-lg" /> 
            <span>Return to Blogs</span>
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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <FiArrowLeft className="text-xl" />
          <span>Back to Blogs</span>
        </motion.button>

        {/* Blog Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Featured Image */}
          {blog.featuredImageUrl && (
            <div className="relative h-96 w-full overflow-hidden">
              <img
                src={blog.featuredImageUrl}
                alt={blog.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          <div className="p-8 sm:p-10">
            {/* Blog Header */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-2">
                  <FiUser className="text-blue-500" /> 
                  <span className="font-medium text-gray-700">{blog.authorName}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-blue-500" /> 
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </span>
              </div>

              {(blog.carBrand || blog.carModel) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.carBrand && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                      {blog.carBrand}
                    </span>
                  )}
                  {blog.carModel && (
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                      {blog.carModel}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none text-gray-800 mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiHeart className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
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
                <FiBookmark className={isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-gray-500'} />
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

        {/* Related Blogs Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">More {blog.carBrand ? blog.carBrand + ' ' : ''}Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related blogs - you would map through actual data here */}
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {item === 1 ? 'JD' : 'AS'}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Author {item}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiCalendar size={12} />
                        <span>1 week ago</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                    {item === 1 
                      ? "The Ultimate Guide to Car Maintenance" 
                      : "Electric Vehicles: The Future of Transportation"}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item === 1 
                      ? "Learn all the essential tips and tricks to keep your vehicle running smoothly for years to come." 
                      : "Exploring the benefits and challenges of transitioning to electric vehicles in modern society."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;