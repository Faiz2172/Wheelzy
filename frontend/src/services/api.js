import axios from 'axios';

const API_BASE = 'https://wheelzy.onrender.com/api' ;


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

export const carListingApi = {
  getAllCarListings: (params) => axios.get(`${API_BASE}/carListings`, { params }),
  createCarListing: (data) => axios.post(`${API_BASE}/carListings`, data),
  updateCarListing: (id, data) => axios.put(`${API_BASE}/carListings/${id}`, data),
  deleteCarListing: (id) => axios.delete(`${API_BASE}/carListings/${id}`),
  getCarListingById: (id) => axios.get(`${API_BASE}/carListings/${id}`),
  getCarListingsByEmail: (email) => axios.get(`${API_BASE}/carListings/by-email`, { params: { email } }),
  searchCarListings: (params) => axios.get(`${API_BASE}/carListings`, { params }),
};

export const carImageApi = {
  addCarImages: (carId, images) => axios.post(`${API_BASE}/carImages`, { carId, images }),
  getCarImagesByCarId: (carId) => axios.get(`${API_BASE}/carImages/${carId}`),
  deleteCarImage: (imageId) => axios.delete(`${API_BASE}/carImages/${imageId}`)
};
