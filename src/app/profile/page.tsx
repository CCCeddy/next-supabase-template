"use client";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div>Session: {JSON.stringify(user)}</div>
      <hr />
      {user ? (
        <p>
          {`Welcome ${user.email}`}
          <br />
          <button onClick={handleSignOut}>Sign out</button>
        </p>
      ) : (
        <>
          <p>Not logged in</p>
          <Link href="/auth/login">Sign In</Link>
          <br />
        </>
      )}
      <Link href="/">Home</Link>
    </div>
  );
}
