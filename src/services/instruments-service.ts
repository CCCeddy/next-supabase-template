import { InstrumentsRepository } from "@/lib/supabase/repositories/instruments-repository";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export class InstrumentsService {
  private repository: InstrumentsRepository;

  constructor(client?: SupabaseClient<Database>) {
    this.repository = new InstrumentsRepository(client);
  }

  async listUserInstruments(userId: string, page = 1, pageSize = 10) {
    return this.repository.listUserInstruments(userId, {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: "name",
    });
  }

  async createInstrument(name: string, userId: string) {
    if (!name.trim()) {
      return {
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: "Instrument name cannot be empty",
        },
      };
    }

    return this.repository.createInstrument(name.trim(), userId);
  }

  async updateInstrument(id: number, name: string, userId: string) {
    if (!name.trim()) {
      return {
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: "Instrument name cannot be empty",
        },
      };
    }

    return this.repository.updateInstrument(id, name.trim(), userId);
  }

  async deleteInstrument(id: number, userId: string) {
    return this.repository.deleteInstrument(id, userId);
  }
}
