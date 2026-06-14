import express from "express";
import {
  getProducts,
  getFeaturedProducts,
  getPopularProducts,
  getProduct,
  createProduct,
} from "../controllers/product.controller.js";
import {
  authenticated,
  allowRoles,
} from "../middlewares/auth.middleware.js";
import { validateCreateProduct } from "../validators/product.validator.js";

const router = express.Router();

router.get("/", allowRoles("guest", "customer", "admin", "customer"), getProducts);

router.get("/featured", allowRoles("guest", "customer"), getFeaturedProducts);

router.get("/popular", allowRoles("guest", "customer"), getPopularProducts);

router.get("/:id", allowRoles("guest", "customer", "admin", "customer"), getProduct);

router.post(
  "/",
  authenticated,
  allowRoles("admin"),
  validateCreateProduct,
  createProduct
);

export default router;
