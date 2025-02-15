//app/auth/login/page.tsx
"use client";

import React, { useState } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  // mode: "signin" or "signup"
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);

  // Handles both sign in and sign up.
  const handleAuth = async (formData: FormData) => {
    setIsLoading(true);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (mode === "signup") {
      // Confirm password field exists in signup mode.
      const confirmPassword = formData.get("confirmPassword") as string;
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        setIsLoading(false);
        return;
      }
    }

    let error;
    if (mode === "signin") {
      ({ error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }));
    } else {
      ({ error } = await supabase.auth.signUp({ email, password }));
    }

    if (error) {
      console.error(`${mode} error:`, error);
      alert(error.message || "An error occurred");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    if (mode === "signin") {
      router.refresh();
      router.push("/dashboard");
    } else {
      // For sign up, you may want to display instructions for email confirmation.
      alert(
        "Sign up successful! Please check your email to confirm your account."
      );
    }
  };

  // Form submission event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleAuth(formData);
  };

  // OAuth sign in
  const handleOAuth = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            title="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            title="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm px-3 py-2"
          />
        </div>

        {mode === "signup" && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              title="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full rounded border-gray-300 shadow-sm px-3 py-2"
            />
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? "Please wait..."
            : mode === "signin"
            ? "Sign In"
            : "Sign Up"}
        </Button>
      </form>

      <div className="mt-4">
        <p className="text-sm">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() =>
              setMode((prevMode) =>
                prevMode === "signin" ? "signup" : "signin"
              )
            }
            className="text-blue-500 hover:underline ml-1 font-medium"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 w-full max-w-sm">
        <Button
          variant="outline"
          onClick={() => handleOAuth("google")}
          className="w-full"
        >
          Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOAuth("github")}
          className="w-full"
        >
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
}
