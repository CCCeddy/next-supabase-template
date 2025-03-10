// src/app/page.tsx
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { ThemeToggle } from '@/components/ThemeToggle';
import LogoutButton from '@/components/logout-button';

// This is a server component so we use the Supabase server client.
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <ThemeToggle />
        {/* If a session exists on the server, show the profile link */}
        {user ? (
          <>
            <Link href="/profile">Profile</Link> {JSON.stringify(user)}
          </>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
        <Link href="/playground">Playground</Link>
        <Link href="/instruments">Data Access Demo</Link>
        <Link href="/error-examples">Error Examples</Link>
        <Link href="/zod">Zod Validation Example</Link>
        <Link href="/weird-link">Weird link</Link>
        <LogoutButton />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
    </div>
  );
}
