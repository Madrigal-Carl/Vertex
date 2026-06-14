import { z } from "zod";

export const imageSchema = z.object({
    url: z.string().url(),
    publicId: z.string(),
    isPrimary: z.boolean().optional(),
});

export const variantSchema = z.object({
    sku: z.string().min(1),
    attributes: z.record(z.string(), z.string()).default({}),
    price: z.number().positive(),
    discount: z.number().min(0).max(100).optional(),
});

export const productFormSchema = z.object({
    categoryId: z.string().min(1),
    name: z.string().min(2),
    description: z.string().min(1),

    images: z.array(imageSchema).min(1, "At least one image is required"),
    variants: z.array(variantSchema).min(1, "At least one variant is required"),
});