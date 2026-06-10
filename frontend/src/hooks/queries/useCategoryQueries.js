import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategories,
  createCategory,
} from "@/services/category.service";

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: getAllCategories,
  });
};

export const useCategories = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["categories", { page, limit, search }],
    queryFn: () => getCategories({ page, limit, search }),
    keepPreviousData: true,
  });
};

export const useCreateCategory = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      onSuccess?.(...args);
    },
  });
};
