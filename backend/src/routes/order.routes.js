import express from "express";
import { create } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateCreateOrder } from "../validators/order.validator.js";

const router = express.Router();

router.post("/", protect, validateCreateOrder, create);

export default router;
