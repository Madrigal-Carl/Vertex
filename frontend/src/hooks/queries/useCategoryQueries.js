import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
} from "@/services/category.service";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
