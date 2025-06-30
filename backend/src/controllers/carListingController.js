import { db } from '../config/database.js';
import { carListings } from '../db/schema.js';
import { eq, desc, and, lte } from 'drizzle-orm';

// CREATE CAR LISTING
export const createCarListing = async (req, res) => {
  try {
    const {
      listingTitle,
      tagline,
      originalPrice,
      sellingPrice,
      category,
      condition,
      offerType,
      make,
      model,
      year,
      driveType,
      transmission,
      fuelType,
      mileage,
      engineSize,
      cylinder,
      color,
      door,
      vin,
      listingDescription,
      email,
    } = req.body;

    const newListing = await db.insert(carListings).values({
      listingTitle,
      tagline,
      originalPrice,
      sellingPrice,
      category,
      condition,
      offerType,
      make,
      model,
      year,
      driveType,
      transmission,
      fuelType,
      mileage,
      engineSize,
      cylinder,
      color,
      door,
      vin,
      listingDescription,
      email
    }).returning();

    res.status(201).json({
      success: true,
      data: newListing[0],
      message: 'Car listing created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating car listing',
      error: error.message
    });
  }
};

// GET ALL CARS
export const getAllCars = async (req, res) => {
  try {
    const { make, price, condition, category } = req.query;
    let filters = [];
    if (make) {
      filters.push(eq(carListings.make, make));
    }
    if (price) {
      filters.push(lte(carListings.sellingPrice, Number(price)));
    }
    if (condition) {
      filters.push(eq(carListings.condition, condition));
    }
    if (category) {
      filters.push(eq(carListings.category, category));
    }
    let query = db.select().from(carListings);
    if (filters.length > 0) {
      query = query.where(and(...filters));
    }
    const allCars = await query.orderBy(desc(carListings.createdAt));
    res.status(200).json({
      success: true,
      data: allCars,
      count: allCars.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching car listings',
      error: error.message
    });
  }
};

// GET CAR BY ID
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await db
      .select()
      .from(carListings)
      .where(eq(carListings.id, parseInt(id)))
      .limit(1);

    if (car.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      data: car[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching car',
      error: error.message
    });
  }
};

// DELETE CAR BY ID
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db
      .delete(carListings)
      .where(eq(carListings.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: deleted[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting car',
      error: error.message
    });
  }
};

// UPDATE CAR LISTING
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await db
      .update(carListings)
      .set(updateData)
      .where(eq(carListings.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: updated[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating car',
      error: error.message
    });
  }
};

// GET CAR LISTINGS BY EMAIL
export const getCarListingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email query parameter is required'
      });
    }
    const listings = await db
      .select()
      .from(carListings)
      .where(eq(carListings.email, email));
    res.status(200).json({
      success: true,
      data: listings,
      count: listings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching car listings by email',
      error: error.message
    });
  }
};
