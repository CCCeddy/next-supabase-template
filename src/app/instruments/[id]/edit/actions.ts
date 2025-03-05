"use server";

import { createClient } from "@/utils/supabase/server";
import { InstrumentsService } from "@/services/instruments-service";
import { redirect } from "next/navigation";

export async function updateInstrument(formData: FormData) {
  const instrumentId = formData.get("instrumentId") as string;
  const name = formData.get("name") as string;

  if (!name || !instrumentId) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const service = new InstrumentsService(supabase);
  await service.updateInstrument(parseInt(instrumentId), name, user.id);
  redirect("/instruments");
}
