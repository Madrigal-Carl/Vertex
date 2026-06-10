import mongoose from "mongoose";

import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import Inventory from "../models/inventory.model.js";
import Variant from "../models/variant.model.js";
import Category from "../models/category.model.js";

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

const getMinVariantPrice = async (productId) => {
  const result = await Variant.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $sort: {
        price: 1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        price: 1,
        discount: 1,
      },
    },
  ]);

  return (
    result[0] || {
      price: 0,
      discount: 0,
    }
  );
};

const enrichProduct = async (product) => {
  const [stats, minPrice] = await Promise.all([
    getRatingStats(product._id),
    getMinVariantPrice(product._id),
  ]);

  return {
    ...product.toObject(),

    price: minPrice.price,
    discount: minPrice.discount,
    averageRating: Number(
      stats.averageRating?.toFixed(1) || 0,
    ),
    reviewCount: stats.reviewCount || 0,
  };
};

export const getAllProducts = async ({ page, limit, category, search }) => {
  const filter = {};

  if (category) {
    const categoryDoc = await Category.findOne({
      name: { $regex: new RegExp(`^${category}$`, "i") },
    });

    if (categoryDoc) {
      filter.categoryId = categoryDoc._id;
    } else {
      filter.categoryId = null;
    }
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),
  ]);

  const enriched = await Promise.all(products.map(enrichProduct));

  return {
    products: enriched,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id).populate("categoryId", "name");

  if (!product) {
    throw new Error("Product not found");
  }

  const [reviews, stats, variants] = await Promise.all([
    Review.find({
      targetType: "product",
      targetId: product._id,
    })
      .populate("userId", "fullname")
      .sort({ createdAt: -1 }),

    getRatingStats(product._id),

    Variant.findByProductWithStock(product._id),
  ]);

  return {
    ...product.toObject(),
    variants,
    averageRating: Number(stats.averageRating?.toFixed(1) || 0),
    reviewCount: stats.reviewCount || 0,
    reviews,
  };
};

export const getFeaturedProductsService = async () => {
  const topDiscountedProducts = await Variant.aggregate([
    {
      $match: {
        discount: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$productId",
        maxDiscount: { $max: "$discount" },
      },
    },
    {
      $sort: {
        maxDiscount: -1,
      },
    },
    {
      $limit: 4,
    },
  ]);

  const productIds = topDiscountedProducts.map(
    (item) => item._id,
  );

  const products = await Product.find({
    _id: { $in: productIds },
  }).populate("categoryId", "name");

  const enriched = await Promise.all(
    products.map(enrichProduct),
  );

  return productIds
    .map((id) =>
      enriched.find(
        (product) =>
          product._id.toString() === id.toString(),
      ),
    )
    .filter(Boolean);
};

export const getPopularProductsService = async () => {
  const popularProducts = await Inventory.aggregate([
    {
      $match: {
        status: "sold",
      },
    },
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
    {
      $group: {
        _id: "$variant.productId",
        soldCount: { $sum: 1 },
      },
    },
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

  // enrich all products (NOW CONSISTENT WITH FEATURED)
  const enriched = await Promise.all(products.map(enrichProduct));

  // attach soldCount
  const enrichedWithSales = enriched.map((product) => {
    const match = popularProducts.find(
      (p) => p._id.toString() === product._id.toString(),
    );

    return {
      ...product,
      soldCount: match?.soldCount || 0,
    };
  });

  // preserve order from aggregation
  return productIds
    .map((id) =>
      enrichedWithSales.find((p) => p._id.toString() === id.toString()),
    )
    .filter(Boolean);
};
