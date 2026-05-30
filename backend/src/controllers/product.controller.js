import {
  getAllProducts,
  getFeaturedProductsService,
  getPopularProductsService,
  getProductById,
} from "../services/product.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await getAllProducts();

  return res.json({ products });
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await getFeaturedProductsService();

  return res.json({ products });
});

export const getPopularProducts = asyncHandler(async (req, res) => {
  const products = await getPopularProductsService();

  return res.json({ products });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);

  return res.json({ product });
});
