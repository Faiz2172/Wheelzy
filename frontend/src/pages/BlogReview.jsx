import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from '../components/Blog/BlogCard';
import BlogForm from '../components/Blog/BlogForm';
import ReviewCard from '../components/Review/ReviewCard';
import ReviewForm from '../components/Review/ReviewForm';
import { blogApi, reviewApi } from '../services/api';
import { Plus, X, BookOpen, MessageSquare, Sparkles, Search, Filter, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

const BlogReview = () => {
  const [tab, setTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const response = await blogApi.getAllBlogs();
      setBlogs(response.data.data);
    } catch (error) {
      toast.error('Error fetching blogs');
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await reviewApi.getAllReviews();
      setReviews(response.data.data);
    } catch (error) {
      toast.error('Error fetching reviews');
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchReviews();
  }, []);

  const handleBlogCreated = () => {
    fetchBlogs();
    setShowModal(false);
    toast.success('Blog created successfully! 🎉');
  };

  const handleReviewCreated = () => {
    fetchReviews();
    setShowModal(false);
    toast.success('Review submitted successfully! ⭐');
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(review =>
    review.reviewText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.carBrand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.carModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.reviewerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <Header />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '16px',
            },
          }}
        />

        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Content Hub
            </h1>
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          </motion.div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover amazing stories and share your thoughts with our vibrant community
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${tab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filter</span>
          </button>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="relative flex bg-white/80 backdrop-blur-md rounded-3xl p-2 shadow-xl border border-white/30">
            {['blogs', 'reviews'].map((t) => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  tab === t ? 'text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === t && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-2xl ${
                      t === 'blogs' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-r from-purple-500 to-purple-600'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  {t === 'blogs' ? (
                    <BookOpen className="w-5 h-5" />
                  ) : (
                    <MessageSquare className="w-5 h-5" />
                  )}
                  <span className="capitalize">{t}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Floating Action Button */}
        <motion.button
          onClick={() => setShowModal(true)}
          className={`fixed bottom-8 right-8 z-50 p-5 rounded-full shadow-2xl text-white transition-all duration-300 ${
            tab === 'blogs' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
              : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
          }`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          aria-label={tab === 'blogs' ? 'Add Blog' : 'Add Review'}
        >
          <Plus size={28} />
        </motion.button>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-lg relative border border-white/30"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-300"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
                {tab === 'blogs' ? (
                  <BlogForm onBlogCreated={handleBlogCreated} />
                ) : (
                  <ReviewForm onReviewCreated={handleReviewCreated} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Content Display */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tab === 'blogs' ? (
            loadingBlogs ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-xl text-gray-600 font-medium">Loading blogs...</p>
                <p className="text-gray-500 mt-2">Fetching the latest content for you</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No blogs found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? `No blogs match "${searchTerm}"` : 'Be the first to write a blog!'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Write First Blog
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            loadingReviews ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                <p className="text-xl text-gray-600 font-medium">Loading reviews...</p>
                <p className="text-gray-500 mt-2">Gathering community feedback</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No reviews found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? `No reviews match "${searchTerm}"` : 'Be the first to write a review!'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Write First Review
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
              </div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogReview;