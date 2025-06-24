import { db } from '../config/database.js';
import { reviews } from '../db/schema.js';
import { eq, desc, and } from 'drizzle-orm';

export const createReview = async (req, res) => {
  try {
    const { 
      carModel, 
      carBrand, 
      reviewerName, 
      reviewerEmail, 
      rating, 
      reviewText, 
      purchaseDate,
      verifiedPurchase 
    } = req.body;

    const newReview = await db.insert(reviews).values({
      carModel,
      carBrand,
      reviewerName,
      reviewerEmail,
      rating,
      reviewText,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
      verifiedPurchase: verifiedPurchase || false,
    }).returning();

    res.status(201).json({
      success: true,
      data: newReview[0],
      message: 'Review created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { carModel, carBrand } = req.query;
    
    let query = db.select().from(reviews);
    
    if (carModel && carBrand) {
      query = query.where(
        and(
          eq(reviews.carModel, carModel),
          eq(reviews.carBrand, carBrand)
        )
      );
    }
    
    const allReviews = await query.orderBy(desc(reviews.createdAt));

    res.status(200).json({
      success: true,
      data: allReviews,
      count: allReviews.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, parseInt(id)))
      .limit(1);

    if (review.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review',
      error: error.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(reviews).where(eq(reviews.id, parseInt(id))).returning();
    if (deleted.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      data: deleted[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updated = await db.update(reviews).set(updateData).where(eq(reviews.id, parseInt(id))).returning();
    if (updated.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: updated[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
};