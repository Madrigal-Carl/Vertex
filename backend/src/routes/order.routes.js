import express from "express";
import { create } from "../controllers/order.controller.js";
import { authenticated, excludeRoles } from "../middlewares/auth.middleware.js";
import { validateCreateOrder } from "../validators/order.validator.js";

const router = express.Router();

router.post("/", authenticated, excludeRoles("technician"), validateCreateOrder, create);

export default router;
