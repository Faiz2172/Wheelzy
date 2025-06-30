import express from 'express';
import {
  addCarImages,
  getCarImagesByCarId,
  deleteCarImage
} from '../controllers/carImageController.js';

const router = express.Router();

router.post('/', addCarImages);                     // Add images
router.get('/:carId', getCarImagesByCarId);         // Get images by carId
router.delete('/:imageId', deleteCarImage);         // Delete a specific image

export default router;
