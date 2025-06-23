import express from 'express';
import { createBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog } from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);

export default router;