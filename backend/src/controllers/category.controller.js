import { asyncHandler } from "../utils/asyncHandler.js";
import { getAllCategories } from "../services/category.service.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getAllCategories();

  return res.json({
    categories,
  });
});
