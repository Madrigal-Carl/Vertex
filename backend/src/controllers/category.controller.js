import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getAllCategories();

  return res.json({
    categories,
  });
});

export const createCategoryController = asyncHandler(async (req, res) => {
  const category = await createCategory(req.body);

  return res.status(201).json({
    message: "Category created successfully",
    category,
  });
});

export const updateCategoryController = asyncHandler(async (req, res) => {
  const category = await updateCategory(req.params.id, req.body);

  return res.json({
    message: "Category updated successfully",
    category,
  });
});

export const deleteCategoryController = asyncHandler(async (req, res) => {
  await deleteCategory(req.params.id);

  return res.json({
    message: "Category deleted successfully",
  });
});