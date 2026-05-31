import Category from "../models/category.model.js";

export const getAllCategories = async () => {
  const categories = await Category.find().sort({ name: 1 });

  return categories;
};
