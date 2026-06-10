import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAllCategories,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../services/category.service.js";

export const getCategories = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    paginate = "true",
  } = req.query;

  const result = await getAllCategories({
    page: Number(page),
    limit: Number(limit),
    search,
    paginate: paginate === "true",
  });

  return res.json(result);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await createCategoryService(req.body);

  return res.status(201).json({
    message: "Category created successfully",
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await updateCategoryService(req.params.id, req.body);

  return res.json({
    message: "Category updated successfully",
    category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await deleteCategoryService(req.params.id);

  return res.json({
    message: "Category deleted successfully",
  });
});