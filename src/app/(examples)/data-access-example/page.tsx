import { createClient } from '@/utils/supabase/server';
import { InstrumentsService } from '@/services/instruments-service';
import type { Database } from '@/types/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import CreateInstrumentForm from './CreateInstrumentForm';
import { Suspense } from 'react';
import Link from 'next/link';
import { Home, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Instrument = Database['public']['Tables']['instruments']['Row'];

export default async function InstrumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const service = new InstrumentsService(supabase);
  const { data: instruments, error } = await service.listUserInstruments(user.id, 1, 10);

  return (
    <div className="mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Data Access Example</h1>

      {/* Auth State Card */}
      <div className="mb-8 rounded-lg bg-card p-6 text-card-foreground shadow">
        <h1 className="mb-2 text-2xl font-bold">Authentication Demo</h1>
        <div className="mb-4 rounded-md bg-secondary/20 p-4">
          <h2 className="mb-2 font-semibold">🔐 Current Authentication State:</h2>
          <pre className="overflow-x-auto rounded bg-muted p-2 text-sm">
            {JSON.stringify(
              {
                userId: user.id,
                email: user.email,
                lastSignIn: user.last_sign_in_at,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      {/* Instruments Card */}
      <div className="mb-8 rounded-lg bg-card p-6 text-card-foreground shadow">
        <h2 className="mb-4 text-xl font-bold">My Instruments</h2>
        <div className="mb-6 rounded-md bg-secondary/20 p-4">
          <h3 className="mb-2 font-semibold">🛡️ Row Level Security (RLS) Demo:</h3>
          <p className="text-muted-foreground">This section demonstrates Supabase RLS in action:</p>
          <ul className="mt-2 list-inside list-disc text-muted-foreground">
            <li>Only your instruments are visible (filtered by user_id)</li>
            <li>Database-level security prevents unauthorized access</li>
            <li>Try opening in another browser with different account</li>
          </ul>
        </div>

        {error ? (
          <div className="rounded bg-destructive/20 p-4 text-destructive">
            Error: {error.message}
          </div>
        ) : (
          <>
            <Suspense
              fallback={<div className="text-muted-foreground">Loading instruments...</div>}
            >
              {instruments && instruments.length > 0 ? (
                <div className="space-y-2">
                  {instruments.map((instrument) => (
                    <div
                      key={instrument.id}
                      className="flex items-center justify-between rounded border p-3 hover:bg-accent/50"
                    >
                      <span>{instrument.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Created: {new Date(instrument.created_at).toLocaleDateString()}
                        </span>
                        <form
                          action={async () => {
                            'use server';
                            const supabase = await createClient();
                            const service = new InstrumentsService(supabase);
                            await service.deleteInstrument(instrument.id, user.id);
                            revalidatePath('/data-access-example');
                          }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            title="Delete instrument"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </form>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="Edit instrument"
                          asChild
                        >
                          <Link href={`/data-access-example/${instrument.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-muted-foreground">
                  No instruments found. Create your first one!
                </p>
              )}
            </Suspense>

            <div className="mt-6 border-t border-border pt-6">
              <h3 className="mb-4 font-semibold">Add New Instrument</h3>
              <CreateInstrumentForm userId={user.id} />
            </div>
          </>
        )}
      </div>

      {/* Implementation Guide Card */}
      <div className="rounded-lg bg-card p-6 text-card-foreground shadow">
        <h2 className="mb-4 text-xl font-bold">Implementation Guide</h2>
        <div className="prose prose-sm dark:prose-invert">
          <h3 className="text-lg font-semibold">Key Files to Review:</h3>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-1">
                supabase/migrations/*_create_instruments.sql
              </code>{' '}
              - Base table structure
            </li>
            <li>
              <code className="rounded bg-muted px-1">
                supabase/migrations/*_add_auth_to_instruments.sql
              </code>{' '}
              - RLS policies
            </li>
            <li>
              <code className="rounded bg-muted px-1">
                src/lib/supabase/repositories/instruments-repository.ts
              </code>{' '}
              - Data access
            </li>
            <li>
              <code className="rounded bg-muted px-1">src/services/instruments-service.ts</code> -
              Business logic
            </li>
            <li>
              <code className="rounded bg-muted px-1">src/app/data-access-example/page.tsx</code> -
              UI and auth flow
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
