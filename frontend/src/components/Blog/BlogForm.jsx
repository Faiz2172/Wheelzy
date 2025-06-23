import React, { useState } from 'react';
import { FiUpload, FiUser, FiMail, FiType, FiFileText } from 'react-icons/fi';

const BlogForm = ({ onBlogCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    carModel: '',
    carBrand: '',
    featuredImageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    if (!formData.authorEmail.trim()) {
      newErrors.authorEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.authorEmail)) {
      newErrors.authorEmail = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'published',
          publishedAt: new Date().toISOString()
        })
      });
      const data = await response.json();
      if (data.success) {
        setFormData({
          title: '',
          content: '',
          authorName: '',
          authorEmail: '',
          carModel: '',
          carBrand: '',
          featuredImageUrl: ''
        });
        setImagePreview('');
        if (onBlogCreated) onBlogCreated();
      } else {
        alert(data.message || 'Error creating blog');
      }
    } catch (error) {
      alert('Error creating blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, featuredImageUrl: url });
    if (url) setImagePreview(url);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiFileText className="text-blue-600" />
        Create New Blog Post
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title *</label>
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            <FiType className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Image Field with Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <div className="relative">
            <input
              type="url"
              name="featuredImageUrl"
              placeholder="Paste image URL"
              value={formData.featuredImageUrl}
              onChange={handleImageChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FiUpload className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-40 object-cover rounded-lg border border-gray-200"
                onError={() => setImagePreview('')}
              />
            </div>
          )}
        </div>

        {/* Author Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
            <div className="relative">
              <input
                type="text"
                name="authorName"
                placeholder="Full name"
                value={formData.authorName}
                onChange={handleChange}
                className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.authorName ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.authorName && <p className="mt-1 text-sm text-red-600">{errors.authorName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Email *</label>
            <div className="relative">
              <input
                type="email"
                name="authorEmail"
                placeholder="email@example.com"
                value={formData.authorEmail}
                onChange={handleChange}
                className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.authorEmail ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.authorEmail && <p className="mt-1 text-sm text-red-600">{errors.authorEmail}</p>}
          </div>
        </div>

        {/* Car Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Brand</label>
            <input
              type="text"
              name="carBrand"
              placeholder="e.g. Toyota, Tesla"
              value={formData.carBrand}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
            <input
              type="text"
              name="carModel"
              placeholder="e.g. Camry, Model 3"
              value={formData.carModel}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content *</label>
          <textarea
            name="content"
            placeholder="Write your blog content here..."
            value={formData.content}
            onChange={handleChange}
            rows="8"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publishing...
            </>
          ) : (
            'Publish Blog Post'
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;