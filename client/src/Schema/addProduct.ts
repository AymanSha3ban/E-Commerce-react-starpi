import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .positive("Price must be a positive number"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
});

export type ProductFormData = z.infer<typeof productSchema>;