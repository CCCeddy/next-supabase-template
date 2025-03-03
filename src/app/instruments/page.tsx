import { createClient } from "@/utils/supabase/server";
import { InstrumentsService } from "@/services/instruments-service";
import type { Database } from "@/types/supabase";
import { redirect } from "next/navigation";
import CreateInstrumentForm from "./CreateInstrumentForm";
import { Suspense } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

type Instrument = Database["public"]["Tables"]["instruments"]["Row"];

export default async function InstrumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const service = new InstrumentsService();
  const { data: instruments, error } = await service.listUserInstruments(
    user.id,
    1,
    10
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      {/* Auth State Card */}
      <div className="mb-8 bg-card text-card-foreground p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">Authentication Demo</h1>
        <div className="bg-secondary/20 p-4 rounded-md mb-4">
          <h2 className="font-semibold mb-2">
            🔐 Current Authentication State:
          </h2>
          <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
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
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">My Instruments</h2>
        <div className="mb-6 bg-secondary/20 p-4 rounded-md">
          <h3 className="font-semibold mb-2">
            🛡️ Row Level Security (RLS) Demo:
          </h3>
          <p className="text-muted-foreground">
            This section demonstrates Supabase RLS in action:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-2">
            <li>Only your instruments are visible (filtered by user_id)</li>
            <li>Database-level security prevents unauthorized access</li>
            <li>Try opening in another browser with different account</li>
          </ul>
        </div>

        {error ? (
          <div className="p-4 text-destructive bg-destructive/20 rounded">
            Error: {error.message}
          </div>
        ) : (
          <>
            <Suspense
              fallback={
                <div className="text-muted-foreground">
                  Loading instruments...
                </div>
              }
            >
              {instruments && instruments.length > 0 ? (
                <div className="space-y-2">
                  {instruments.map((instrument) => (
                    <div
                      key={instrument.id}
                      className="p-3 border rounded hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>{instrument.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Created:{" "}
                        {new Date(instrument.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No instruments found. Create your first one!
                </p>
              )}
            </Suspense>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold mb-4">Add New Instrument</h3>
              <CreateInstrumentForm userId={user.id} />
            </div>
          </>
        )}
      </div>

      {/* Implementation Guide Card */}
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Implementation Guide</h2>
        <div className="prose prose-sm dark:prose-invert">
          <h3 className="text-lg font-semibold">Key Files to Review:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <code className="bg-muted px-1 rounded">
                supabase/migrations/*_create_instruments.sql
              </code>{" "}
              - Base table structure
            </li>
            <li>
              <code className="bg-muted px-1 rounded">
                supabase/migrations/*_add_auth_to_instruments.sql
              </code>{" "}
              - RLS policies
            </li>
            <li>
              <code className="bg-muted px-1 rounded">
                src/lib/supabase/repositories/instruments-repository.ts
              </code>{" "}
              - Data access
            </li>
            <li>
              <code className="bg-muted px-1 rounded">
                src/services/instruments-service.ts
              </code>{" "}
              - Business logic
            </li>
            <li>
              <code className="bg-muted px-1 rounded">
                src/app/instruments/page.tsx
              </code>{" "}
              - UI and auth flow
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
