import { useQuery } from "@tanstack/react-query";

import {
  getFeaturedProducts,
  getPopularProducts,
  getProductById,
  getProducts,
} from "@/services/product.service";

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });
};

export const usePopularProducts = () => {
  return useQuery({
    queryKey: ["popular-products"],
    queryFn: getPopularProducts,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProducts = ({ page, limit, category, search }) => {
  return useQuery({
    queryKey: ["products", page, limit, category, search],
    queryFn: () => getProducts({ page, limit, category, search }),
    keepPreviousData: true,
  });
};
