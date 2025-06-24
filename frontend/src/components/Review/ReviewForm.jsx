import React, { useState, useEffect } from 'react';
import { FiStar, FiUser, FiMail, FiCheckCircle, FiCalendar } from 'react-icons/fi';

const ReviewForm = ({ onReviewCreated, initialData, onUpdate }) => {
  const [formData, setFormData] = useState({
    carModel: '',
    carBrand: '',
    reviewerName: '',
    reviewerEmail: '',
    rating: 5,
    reviewText: '',
    purchaseDate: '',
    verifiedPurchase: false
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        carModel: initialData.carModel || '',
        carBrand: initialData.carBrand || '',
        reviewerName: initialData.reviewerName || '',
        reviewerEmail: initialData.reviewerEmail || '',
        rating: initialData.rating || 5,
        reviewText: initialData.reviewText || '',
        purchaseDate: initialData.purchaseDate || '',
        verifiedPurchase: initialData.verifiedPurchase || false
      });
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.carBrand.trim()) newErrors.carBrand = 'Car brand is required';
    if (!formData.carModel.trim()) newErrors.carModel = 'Car model is required';
    if (!formData.reviewerName.trim()) newErrors.reviewerName = 'Name is required';
    if (!formData.reviewerEmail.trim()) {
      newErrors.reviewerEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.reviewerEmail)) {
      newErrors.reviewerEmail = 'Email is invalid';
    }
    if (!formData.reviewText.trim()) newErrors.reviewText = 'Review text is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const url = initialData && initialData._id
        ? `http://localhost:5001/api/reviews/${initialData._id}`
        : 'http://localhost:5001/api/reviews';
      const method = initialData && initialData._id ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          createdAt: initialData && initialData.createdAt ? initialData.createdAt : new Date().toISOString()
        })
      });
      const data = await response.json();
      if (data.success) {
        setFormData({
          carModel: '',
          carBrand: '',
          reviewerName: '',
          reviewerEmail: '',
          rating: 5,
          reviewText: '',
          purchaseDate: '',
          verifiedPurchase: false
        });
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        if (initialData && onUpdate) onUpdate();
        else if (onReviewCreated) onReviewCreated();
      } else {
        alert(data.message || 'Error submitting review');
      }
    } catch (error) {
      alert('Error submitting review: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiStar className="text-yellow-500" />
        Write Your Review
      </h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            <span>Thank you! Your review has been submitted successfully.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Car Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Brand *</label>
            <div className="relative">
              <input
                type="text"
                name="carBrand"
                placeholder="e.g. Toyota, Tesla"
                value={formData.carBrand}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.carBrand ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.carBrand && <p className="mt-1 text-sm text-red-600">{errors.carBrand}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Model *</label>
            <div className="relative">
              <input
                type="text"
                name="carModel"
                placeholder="e.g. Camry, Model 3"
                value={formData.carModel}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.carModel ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.carModel && <p className="mt-1 text-sm text-red-600">{errors.carModel}</p>}
          </div>
        </div>

        {/* Reviewer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <div className="relative">
              <input
                type="text"
                name="reviewerName"
                placeholder="Full name"
                value={formData.reviewerName}
                onChange={handleChange}
                className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.reviewerName ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.reviewerName && <p className="mt-1 text-sm text-red-600">{errors.reviewerName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
            <div className="relative">
              <input
                type="email"
                name="reviewerEmail"
                placeholder="email@example.com"
                value={formData.reviewerEmail}
                onChange={handleChange}
                className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.reviewerEmail ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.reviewerEmail && <p className="mt-1 text-sm text-red-600">{errors.reviewerEmail}</p>}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating *</label>
          <div className="flex items-center gap-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} star`}
                >
                  <span className={`text-3xl ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
            <span className="text-lg font-medium text-gray-700">
              {formData.rating}.0
            </span>
          </div>
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
          <div className="relative">
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              max={new Date().toISOString().split('T')[0]}
            />
            <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
          <textarea
            name="reviewText"
            placeholder="Share your experience with this vehicle..."
            value={formData.reviewText}
            onChange={handleChange}
            rows="6"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.reviewText ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.reviewText && <p className="mt-1 text-sm text-red-600">{errors.reviewText}</p>}
        </div>

        {/* Verified Purchase */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="verifiedPurchase"
            id="verifiedPurchase"
            checked={formData.verifiedPurchase}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="verifiedPurchase" className="ml-2 block text-sm text-gray-700">
            I made a verified purchase of this vehicle
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;