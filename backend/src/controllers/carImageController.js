import { db } from '../config/database.js';
import { carImages } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// POST: Add multiple images for a car listing
export const addCarImages = async (req, res) => {
  try {
    const { carId, images } = req.body; // images = [url1, url2, ...]

    if (!carId || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'carId and images array are required'
      });
    }

    const inserted = await db.insert(carImages).values(
      images.map((url) => ({
        carId,
        imageUrl: url
      }))
    ).returning();

    res.status(201).json({
      success: true,
      message: 'Images added successfully',
      data: inserted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add images',
      error: error.message
    });
  }
};

// GET: Get all images for a specific car listing
export const getCarImagesByCarId = async (req, res) => {
  try {
    const { carId } = req.params;

    const images = await db
      .select()
      .from(carImages)
      .where(eq(carImages.carId, parseInt(carId)));

    res.status(200).json({
      success: true,
      data: images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images',
      error: error.message
    });
  }
};

// DELETE: Remove a specific image by image ID
export const deleteCarImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const deleted = await db
      .delete(carImages)
      .where(eq(carImages.id, parseInt(imageId)))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image deleted',
      data: deleted[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message
    });
  }
};
