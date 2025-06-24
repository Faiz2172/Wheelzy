import { db } from '../config/database.js';
import { blogs } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export const createBlog = async (req, res) => {
  try {
    const { title, content, authorName, authorEmail, carModel, carBrand, featuredImageUrl } = req.body;
    
    const newBlog = await db.insert(blogs).values({
      title,
      content,
      authorName,
      authorEmail,
      carModel,
      carBrand,
      featuredImageUrl,
      status: 'published',
      publishedAt: new Date(),
    }).returning();

    res.status(201).json({
      success: true,
      data: newBlog[0],
      message: 'Blog created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.status, 'published'))
      .orderBy(desc(blogs.createdAt));

    res.status(200).json({
      success: true,
      data: allBlogs,
      count: allBlogs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, parseInt(id)))
      .limit(1);

    if (blog.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blog[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(blogs).where(eq(blogs.id, parseInt(id))).returning();
    if (deleted.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      data: deleted[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updated = await db.update(blogs).set(updateData).where(eq(blogs.id, parseInt(id))).returning();
    if (updated.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updated[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};