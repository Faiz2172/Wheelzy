import React from 'react';
import { FiUser, FiCalendar, FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 group cursor-pointer"
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      {/* Image with hover zoom effect */}
      {blog.featuredImageUrl && (
        <div className="overflow-hidden">
          <img
            src={blog.featuredImageUrl}
            alt={blog.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      {/* Card Content */}
      <div className="p-6">
        {/* Brand and Model Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
            {blog.carBrand}
          </span>
          {blog.carModel && (
            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
              {blog.carModel}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>

        {/* Content Excerpt */}
        <p className="text-gray-500 mb-4 line-clamp-3 leading-relaxed">
          {blog.content.substring(0, 150)}{blog.content.length > 150 && '...'}
        </p>

        {/* Footer with Author and Date */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FiUser size={14} />
            </div>
            <span className="text-sm font-medium text-gray-700">{blog.authorName}</span>
          </div>
          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FiCalendar size={14} className="text-gray-400" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
            {onEdit && (
              <button
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-yellow-600 transition-colors"
                onClick={() => onEdit(blog)}
                title="Edit Blog"
              >
                <FiEdit2 size={16} />
              </button>
            )}
            {onDelete && (
              <button
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
                onClick={() => onDelete(blog.id)}
                title="Delete Blog"
              >
                <FiTrash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;