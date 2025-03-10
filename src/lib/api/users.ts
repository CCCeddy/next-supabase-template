import { z } from "zod";
import {
  type ApiResponse,
  apiResponseSchema,
  type UserResponse,
  userResponseSchema,
} from "@/lib/schemas/api-schemas";

export async function getUser(id: string): Promise<ApiResponse<UserResponse>> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();

  return apiResponseSchema(userResponseSchema).parse(data);
}

export async function getUsers(): Promise<ApiResponse<UserResponse[]>> {
  const response = await fetch("/api/users");
  const data = await response.json();

  return apiResponseSchema(z.array(userResponseSchema)).parse(data);
}
