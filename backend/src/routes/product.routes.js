import express from "express";
import {
  getProducts,
  getFeaturedProducts,
  getPopularProducts,
  getProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/popular", getPopularProducts);
router.get("/:id", getProduct);

export default router;
