import mongoose from "mongoose";

import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

const getRatingStats = async (productId) => {
  const stats = await Review.aggregate([
    {
      $match: {
        targetType: "product",
        targetId: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$targetId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  return stats[0] || { averageRating: 0, reviewCount: 0 };
};

const enrichProduct = async (product) => {
  const stats = await getRatingStats(product._id);

  return {
    ...product.toObject(),
    averageRating: Number(stats.averageRating?.toFixed(1) || 0),
    reviewCount: stats.reviewCount || 0,
  };
};

export const getAllProducts = async () => {
  const products = await Product.find()
    .populate("categoryId", "name")
    .sort({ createdAt: -1 });

  return Promise.all(products.map(enrichProduct));
};

export const getFeaturedProductsService = async () => {
  const products = await Product.find({
    discount: { $gt: 0 },
  })
    .populate("categoryId", "name")
    .sort({ createdAt: -1 })
    .limit(4);

  return Promise.all(products.map(enrichProduct));
};

export const getPopularProductsService = async () => {
  const popularProducts = await Review.aggregate([
    {
      $match: {
        targetType: "product",
      },
    },
    {
      $group: {
        _id: "$targetId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        reviewCount: -1,
        averageRating: -1,
      },
    },
    {
      $limit: 4,
    },
  ]);

  const productIds = popularProducts.map((item) => item._id);

  const products = await Product.find({
    _id: { $in: productIds },
  }).populate("categoryId", "name");

  const enrichedProducts = await Promise.all(
    products.map(async (product) => {
      const stats = popularProducts.find(
        (item) => item._id.toString() === product._id.toString(),
      );

      return {
        ...product.toObject(),
        averageRating: Number((stats?.averageRating || 0).toFixed(1)),
        reviewCount: stats?.reviewCount || 0,
      };
    }),
  );

  // Preserve aggregate order
  return productIds
    .map((id) =>
      enrichedProducts.find(
        (product) => product._id.toString() === id.toString(),
      ),
    )
    .filter(Boolean);
};

export const getProductById = async (id) => {
  const product = await Product.findById(id).populate("categoryId", "name");

  if (!product) {
    throw new Error("Product not found");
  }

  const reviews = await Review.find({
    targetType: "product",
    targetId: product._id,
  })
    .populate("userId", "fullname")
    .sort({ createdAt: -1 });

  const stats = await getRatingStats(product._id);

  return {
    ...product.toObject(),
    reviews,
    averageRating: Number(stats.averageRating?.toFixed(1) || 0),
    reviewCount: stats.reviewCount || 0,
  };
};
