import { z } from "zod";

/**
 * Example schema demonstrating common Zod validation patterns
 *
 * Key features shown:
 * - String validation with min/max length
 * - Regular expression patterns
 * - Custom error messages
 * - Email validation
 * - Number validation with range checks
 */
export const userInfoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens",
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(13, "Must be at least 13 years old")
    .max(120, "Please enter a valid age"),
});

/**
 * Example of a more complex schema with nested objects and arrays
 *
 * Demonstrates:
 * - Nested object validation
 * - Array validation
 * - Optional fields
 * - Boolean fields
 */
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  details: z.object({
    description: z.string().optional(),
    inStock: z.boolean(),
    quantity: z.number().int().nonnegative(),
  }),
});

/**
 * Example of discriminated unions and transformations
 *
 * Shows how to:
 * - Handle different types of data with the same schema
 * - Use discriminated unions
 * - Add optional fields based on type
 */
export const messageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    content: z.string().min(1, "Message content is required"),
  }),
  z.object({
    type: z.literal("image"),
    url: z.string().url("Please enter a valid URL"),
    caption: z.string().optional(),
  }),
]);

// Export TypeScript types inferred from the schemas
export type UserInfo = z.infer<typeof userInfoSchema>;
export type Product = z.infer<typeof productSchema>;
export type Message = z.infer<typeof messageSchema>;
