import express from "express";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";
import { validateCategory } from "../validators/category.validator.js";

const router = express.Router();

router.get("/", getCategories);

router.post(
    "/",
    validateCategory,
    createCategory
);

router.put(
    "/:id",
    validateCategory,
    updateCategory
);

router.delete("/:id", deleteCategory);

export default router;
