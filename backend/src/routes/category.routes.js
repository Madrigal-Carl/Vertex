import express from "express";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";
import { validateCategory } from "../validators/category.validator.js";
import { authenticated, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCategories);

router.post(
    "/",
    authenticated,
    allowRoles("admin"),
    validateCategory,
    createCategory
);

router.put(
    "/:id",
    authenticated,
    allowRoles("admin"),
    validateCategory,
    updateCategory
);

router.delete(
    "/:id",
    authenticated,
    allowRoles("admin"),
    deleteCategory
);

export default router;
