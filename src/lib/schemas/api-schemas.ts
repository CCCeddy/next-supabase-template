import { z } from "zod";

/**
 * API Request/Response Schema Examples
 *
 * These schemas demonstrate how to:
 * - Validate API request payloads
 * - Type API response data
 * - Handle different response structures
 * - Validate query parameters
 */

// Common API response wrapper
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().nullable(),
    timestamp: z.string().datetime().optional(),
  });

// Fix the type definition
export type ApiResponse<T> = z.infer<
  ReturnType<typeof apiResponseSchema<z.ZodType<T>>>
>;

// Query parameters validation
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

// Search parameters
export const searchParamsSchema = z.object({
  query: z.string().min(1),
  filters: z.record(z.string()).optional(),
  ...paginationSchema.shape,
});

// Example user API schemas
export const createUserRequestSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  role: z.enum(["user", "admin"]).default("user"),
  metadata: z.record(z.unknown()).optional(),
});

export const updateUserRequestSchema = createUserRequestSchema.partial();

export const userResponseSchema = createUserRequestSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Example error response
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

// Usage with generics for type-safe API responses
export type PaginationParams = z.infer<typeof paginationSchema>;
export type SearchParams = z.infer<typeof searchParamsSchema>;
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
