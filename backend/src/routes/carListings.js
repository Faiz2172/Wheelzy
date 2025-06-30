import express from "express";
import { createCarListing ,getAllCars,getCarById,deleteCar,updateCar} from "../controllers/carListingController.js";

const router = express.Router();

router.post('/', createCarListing);
router.get('/', getAllCars);
router.get('/:id', getCarById);
router.delete('/:id', deleteCar);
router.put('/:id', updateCar);

export default router;