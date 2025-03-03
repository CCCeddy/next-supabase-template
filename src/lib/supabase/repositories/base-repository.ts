import { DatabaseService, DbResponse } from "../db-client";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type TableName = keyof Database["public"]["Tables"];
type Row<T extends TableName> = Database["public"]["Tables"][T]["Row"];

export class BaseRepository<T extends TableName> {
  protected readonly tableName: T;
  protected readonly db: DatabaseService;

  constructor(tableName: T) {
    this.tableName = tableName;
    this.db = new DatabaseService();
  }

  // Add a protected method for common query building
  protected createBaseQuery(client: SupabaseClient<Database>) {
    return client.from(this.tableName).select("*") as any;
  }

  protected async findOne<R extends Row<T> & { id: number }>(
    id: number,
  ): Promise<DbResponse<R>> {
    return this.db.query<R>(async (client) => {
      const { data, error } = await this.createBaseQuery(client)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as R;
    });
  }

  protected async findMany<R extends Row<T>>(params?: {
    limit?: number;
    offset?: number;
    orderBy?: string;
    filter?: Record<string, any>;
  }): Promise<DbResponse<R[]>> {
    return this.db.query<R[]>(async (client) => {
      let query = this.createBaseQuery(client);

      if (params?.filter) {
        Object.entries(params.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (params?.orderBy) {
        query = query.order(params.orderBy);
      }

      if (params?.limit) {
        query = query.limit(params.limit);
      }

      if (params?.offset) {
        query = query.range(
          params.offset,
          params.offset + (params.limit || 10) - 1,
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as unknown as R[];
    });
  }
}
