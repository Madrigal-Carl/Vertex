import Category from "../models/category.model.js";

export const getAllCategories = async () => {
  const categories = await Category.find().sort({ name: 1 });

  return categories;
};

export const createCategory = async (data) => {
  const existingCategory = await Category.findOne({
    name: data.name,
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    name: data.name,
  });
};

export const updateCategory = async (id, data) => {
  const existingCategory = await Category.findOne({
    name: data.name,
    _id: { $ne: id },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: data.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};