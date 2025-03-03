import { createClient } from "@/utils/supabase/server";
import { InstrumentsService } from "@/services/instruments-service";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditInstrumentPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // At this point TypeScript knows user is not null
  const service = new InstrumentsService(supabase);
  const { data: instruments } = await service.listUserInstruments(user.id);
  const instrument = instruments?.find((i) => i.id === parseInt(params.id));

  if (!instrument) {
    redirect("/instruments");
  }

  async function updateInstrument(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    if (!name) {
      return; // or handle the error appropriately
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const service = new InstrumentsService(supabase);
    await service.updateInstrument(parseInt(params.id), name, user.id);
    redirect("/instruments");
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link
        href="/instruments"
        className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Instruments</span>
      </Link>

      <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Instrument</h1>

        <form action={updateInstrument} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Instrument Name
            </label>
            <Input
              id="name"
              name="name"
              defaultValue={instrument.name}
              className="max-w-md"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/instruments">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
