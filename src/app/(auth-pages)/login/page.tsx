"use client";

import { Button } from "@/components/ui/button";
import { login, signInWithOAuth, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
      <Button onClick={() => signInWithOAuth("google")}>
        Sign in with Google
      </Button>
    </form>
  );
}
