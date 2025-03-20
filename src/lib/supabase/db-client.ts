import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export type DbResult<T> = T;
export type DbError = { code: string; message: string; details?: string };
export type DbResponse<T> = {
  data: T | null;
  error: DbError | null;
};

export class DatabaseService {
  private client: SupabaseClient<Database> | null;

  constructor(client?: SupabaseClient<Database>) {
    this.client = client || createClient();
  }

  async query<T>(
    operation: (client: SupabaseClient<Database>) => Promise<T>,
  ): Promise<DbResponse<T>> {
    if (!this.client) {
      return {
        data: null,
        error: {
          code: "NO_CLIENT",
          message: "Supabase client not initialized",
          details:
            "Database operations are not available without Supabase configuration",
        },
      };
    }

    try {
      const result = await operation(this.client);
      return { data: result, error: null };
    } catch (error) {
      console.error("Database operation failed:", error);
      return {
        data: null,
        error: {
          code: "DB_ERROR",
          message: "Database operation failed",
          details: error instanceof Error ? error.message : undefined,
        },
      };
    }
  }
}
