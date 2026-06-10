import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const getAllCategories = async ({
  page,
  limit,
  search,
  paginate,
}) => {
  const filter = {};

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  let query = Category.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "categoryId",
        as: "products",
      },
    },
    {
      $addFields: {
        productCount: { $size: "$products" },
      },
    },
    {
      $project: {
        products: 0,
      },
    },
    {
      $sort: { name: 1 },
    },
  ]);

  if (paginate) {
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
  }

  const categories = await query;

  if (!paginate) {
    return {
      categories,
      pagination: null,
    };
  }

  const total = await Category.countDocuments(filter);

  return {
    categories,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
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