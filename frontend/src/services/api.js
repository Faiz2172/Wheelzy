import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

export const blogApi = {
  getAllBlogs: () => axios.get(`${API_BASE}/blogs`),
  createBlog: (data) => axios.post(`${API_BASE}/blogs`, data),
  updateBlog: (id, data) => axios.put(`${API_BASE}/blogs/${id}`, data),
  deleteBlog: (id) => axios.delete(`${API_BASE}/blogs/${id}`),
  getBlogById: (id) => axios.get(`${API_BASE}/blogs/${id}`)
};

export const reviewApi = {
  getAllReviews: () => axios.get(`${API_BASE}/reviews`),
  createReview: (data) => axios.post(`${API_BASE}/reviews`, data),
  updateReview: (id, data) => axios.put(`${API_BASE}/reviews/${id}`, data),
  deleteReview: (id) => axios.delete(`${API_BASE}/reviews/${id}`),
  getReviewById: (id) => axios.get(`${API_BASE}/reviews/${id}`)
};