"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div>
      session: {JSON.stringify(session)}
      <hr />
      {session ? (
        <p>
          {session.user
            ? `Welcome ${session.user.name} (Role: ${session.user.role})`
            : null}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      ) : (
        <>
          <p>Not logged in</p>
          <Link href="/auth/signin">Sign In</Link>
          <br />
        </>
      )}
      <Link href="/">Home</Link>
    </div>
  );
}
