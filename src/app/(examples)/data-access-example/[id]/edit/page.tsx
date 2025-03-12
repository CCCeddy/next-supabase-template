import { createClient } from '@/utils/supabase/server';
import { InstrumentsService } from '@/services/instruments-service';
import { redirect } from 'next/navigation';
import EditInstrumentForm from './EditInstrumentsForm';

export default async function Page(rawProps: any) {
  // Update the type definition to reflect that params (and searchParams) are promises
  const { params, searchParams } = rawProps as {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  };

  // Await the resolution of the params promise
  const resolvedParams = await params;
  // If you need searchParams, you can await them too:
  // const resolvedSearchParams = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const service = new InstrumentsService(supabase);
  const { data: instruments } = await service.listUserInstruments(user.id);
  const instrument = instruments?.find((i) => i.id === parseInt(resolvedParams.id));

  if (!instrument) {
    redirect('/data-access-example');
  }

  return <EditInstrumentForm instrument={instrument} instrumentId={resolvedParams.id} />;
}
