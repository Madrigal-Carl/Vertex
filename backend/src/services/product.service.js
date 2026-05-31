import mongoose from "mongoose";

import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import Inventory from "../models/inventory.model.js";
import Variant from "../models/variant.model.js";

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

export const getFeaturedProductsService = async () => {
  const products = await Product.find({
    discount: { $gt: 0 },
  })
    .populate("categoryId", "name")
    .sort({ discount: -1 })
    .limit(4);

  return Promise.all(products.map(enrichProduct));
};

export const getPopularProductsService = async () => {
  const popularProducts = await Inventory.aggregate([
    {
      $match: {
        status: "sold",
      },
    },

    // Join variants
    {
      $lookup: {
        from: "variants",
        localField: "variantId",
        foreignField: "_id",
        as: "variant",
      },
    },

    {
      $unwind: "$variant",
    },

    // Group by productId
    {
      $group: {
        _id: "$variant.productId",
        soldCount: { $sum: 1 },
      },
    },

    // Most sold first
    {
      $sort: {
        soldCount: -1,
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
      const stats = await getRatingStats(product._id);

      const soldData = popularProducts.find(
        (item) => item._id.toString() === product._id.toString(),
      );

      return {
        ...product.toObject(),
        soldCount: soldData?.soldCount || 0,
        averageRating: Number(stats.averageRating?.toFixed(1) || 0),
        reviewCount: stats.reviewCount || 0,
      };
    }),
  );

  // preserve aggregate order
  return productIds
    .map((id) =>
      enrichedProducts.find(
        (product) => product._id.toString() === id.toString(),
      ),
    )
    .filter(Boolean);
};
