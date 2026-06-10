import express from "express";
import {
    getCategories,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
} from "../controllers/category.controller.js";
import { validateCategory } from "../validators/category.validator.js";

const router = express.Router();

router.get("/", getCategories);

router.post(
    "/",
    validateCategory,
    createCategoryController
);

router.put(
    "/:id",
    validateCategory,
    updateCategoryController
);

router.delete("/:id", deleteCategoryController);

export default router;
