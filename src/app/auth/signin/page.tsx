"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { Button } from "@/components/ui/button"; // ShadCn component

export default function SignInPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-4">
      session: {JSON.stringify(session)}
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Sign in with GitHub
      </button>
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign in with Google
      </button>
      <Link href={"/"}>Home</Link>
      <button onClick={() => signOut()}>Sign out</button>
      <br />
      <Link href={"/profile"}>Profile</Link>
      {session && (
        <div>
          <p>Welcome, {session.user?.name}!</p>
        </div>
      )}
    </div>
  );
}
