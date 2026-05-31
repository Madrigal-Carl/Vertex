import { useQuery } from "@tanstack/react-query";

import {
  getFeaturedProducts,
  getPopularProducts,
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
