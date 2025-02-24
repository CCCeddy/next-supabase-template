// src/app/page.tsx
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ThemeToggle } from "@/components/ThemeToggle";
import LogoutButton from "@/components/logout-button";

// This is a server component so we use the Supabase server client.
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center 
      justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20
      font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
        <Link href="/weird-link">Weird link</Link>
        <LogoutButton />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
