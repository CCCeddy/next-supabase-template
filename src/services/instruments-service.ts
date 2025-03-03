import { InstrumentsRepository } from "@/lib/supabase/repositories/instruments-repository";

export class InstrumentsService {
  private repository = new InstrumentsRepository();

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
}
