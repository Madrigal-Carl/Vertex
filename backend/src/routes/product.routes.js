import express from "express";
import {
  getProducts,
  getFeaturedProducts,
  getPopularProducts,
  getProduct,
} from "../controllers/product.controller.js";
import {
  authenticated,
  allowRoles,
  excludeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", allowRoles("guest", "customer"), getFeaturedProducts);
router.get("/popular", allowRoles("guest", "customer"), getPopularProducts);
router.get("/:id", authenticated, excludeRoles("technician"), getProduct);

export default router;
