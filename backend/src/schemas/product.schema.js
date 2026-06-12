import { z } from "zod";

const imageSchema = z.object({
    url: z.url("Image URL is invalid"),
    isPrimary: z.boolean().optional(),
});

const variantSchema = z.object({
    sku: z.string().trim().min(1, "SKU is required"),

    attributes: z.record(z.string(), z.string()).default({}),

    price: z.number().positive("Price must be greater than 0"),

    discount: z
        .number()
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot exceed 100")
        .optional(),
});

export const createProductSchema = z
    .object({
        categoryId: z.string().min(1, "Category is required"),

        name: z
            .string()
            .trim()
            .min(2, "Product name must be at least 2 characters")
            .max(100, "Product name cannot exceed 100 characters"),

        description: z
            .string()
            .trim()
            .min(1, "Description is required"),

        images: z.array(imageSchema).min(1, "At least one image is required"),

        variants: z.array(variantSchema).min(1, "At least one variant is required"),
    })
    .superRefine((data, ctx) => {
        const primaryImages = data.images.filter(
            (img) => img.isPrimary === true
        );

        if (primaryImages.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["images"],
                message: "At least one image must be set as primary",
            });
        }

        if (primaryImages.length > 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["images"],
                message: "Only one image can be marked as primary",
            });
        }
    });