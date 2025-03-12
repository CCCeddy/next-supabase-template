'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { updateInstrument } from './actions';

type EditInstrumentFormProps = {
  instrument: {
    id: number;
    name: string;
    // Add any other instrument properties you need
  };
  instrumentId: string;
};

export default function EditInstrumentForm({ instrument, instrumentId }: EditInstrumentFormProps) {
  return (
    <div className="mx-auto p-4">
      <Link
        href="/data-access-example"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Data Access Example</span>
      </Link>

      <div className="rounded-lg bg-card p-6 text-card-foreground shadow">
        <h1 className="mb-6 text-2xl font-bold">Edit Instrument</h1>

        <form action={updateInstrument} className="space-y-4">
          <input type="hidden" name="instrumentId" value={instrumentId} />
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Instrument Name
            </label>
            <Input id="name" name="name" defaultValue={instrument.name} className="max-w-md" />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/data-access-example">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
