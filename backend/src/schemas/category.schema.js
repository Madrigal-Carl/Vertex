import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string({
            required_error: "Category name is required",
        })
        .trim()
        .min(1, "Category name is required")
        .max(100, "Category name must not exceed 100 characters"),
});