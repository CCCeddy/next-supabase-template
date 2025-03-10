import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import {
  apiResponseSchema,
  createUserRequestSchema,
  paginationSchema,
  userResponseSchema,
} from "@/lib/schemas/api-schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createUserRequestSchema.parse(body);

    const response = apiResponseSchema(userResponseSchema).parse({
      success: true,
      data: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request data",
          details: error.errors,
        },
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Validate query parameters
    const { searchParams } = request.nextUrl;
    const validatedParams = paginationSchema.parse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sortBy: searchParams.get("sortBy"),
      order: searchParams.get("order"),
    });

    // Your database query logic here...

    const response = apiResponseSchema(z.array(userResponseSchema)).parse({
      success: true,
      data: [], // Your actual data here
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid query parameters",
          details: error.errors,
        },
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    }, { status: 500 });
  }
}
