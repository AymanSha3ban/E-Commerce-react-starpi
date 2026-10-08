import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string('Title is required')
    .min(3, 'Title must be at least 3 characters'),

  description: z
    .string('Description is required')
    .min(10, 'Description must be at least 10 characters'),

  price: z
    .number('Price is required')
    .positive('Price must be a positive number'),

  stock: z
    .number('Stock is required')
    .int('Stock must be an integer')
    .nonnegative('Stock cannot be negative').optional(),

  thumbnail: z.object({
    url: z
      .string('Thumbnail URL is required')
      .url('Please enter a valid URL'),
  }),
});


export type ProductFormData = z.infer<typeof productSchema>;