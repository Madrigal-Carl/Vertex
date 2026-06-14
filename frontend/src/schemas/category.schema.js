import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must not exceed 100 characters"),
});