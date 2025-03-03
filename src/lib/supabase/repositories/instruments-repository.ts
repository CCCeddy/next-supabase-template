import { BaseRepository } from "./base-repository";
import type { Database } from "@/types/supabase";
import { DbResponse } from "../db-client";
import { SupabaseClient } from "@supabase/supabase-js";

type Instrument = Database["public"]["Tables"]["instruments"]["Row"];

export class InstrumentsRepository extends BaseRepository<"instruments"> {
  constructor(client?: SupabaseClient<Database>) {
    super("instruments", client);
  }

  async createInstrument(
    name: string,
    userId: string,
  ): Promise<DbResponse<Instrument>> {
    return this.db.query<Instrument>(
      async (client: SupabaseClient<Database>) => {
        const { data, error } = await client
          .from(this.tableName)
          .insert({ name, user_id: userId })
          .select()
          .single();

        if (error) throw error;
        return data;
      },
    );
  }

  async updateInstrument(
    id: number,
    name: string,
    userId: string,
  ): Promise<DbResponse<Instrument>> {
    return this.db.query<Instrument>(
      async (client: SupabaseClient<Database>) => {
        const { data, error } = await client
          .from(this.tableName)
          .update({ name, updated_at: new Date().toISOString() })
          .eq("id", id)
          .eq("user_id", userId) // Extra security check
          .select()
          .single();

        if (error) throw error;
        return data;
      },
    );
  }

  async deleteInstrument(
    id: number,
    userId: string,
  ): Promise<DbResponse<Instrument>> {
    return this.db.query<Instrument>(
      async (client: SupabaseClient<Database>) => {
        const { data, error } = await client
          .from(this.tableName)
          .delete()
          .eq("id", id)
          .eq("user_id", userId) // Extra security check
          .select()
          .single();

        if (error) throw error;
        return data;
      },
    );
  }

  async listUserInstruments(
    userId: string,
    params?: {
      limit?: number;
      offset?: number;
      orderBy?: string;
    },
  ): Promise<DbResponse<Instrument[]>> {
    return this.findMany<Instrument>({
      ...params,
      filter: { user_id: userId },
    });
  }
}
