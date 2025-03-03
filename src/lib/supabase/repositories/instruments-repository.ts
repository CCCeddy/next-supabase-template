import { BaseRepository } from "./base-repository";
import type { Database } from "@/types/supabase";
import { DbResponse } from "../db-client";
import { SupabaseClient } from "@supabase/supabase-js";

type Instrument = Database["public"]["Tables"]["instruments"]["Row"];

export class InstrumentsRepository extends BaseRepository<"instruments"> {
  constructor() {
    super("instruments");
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
