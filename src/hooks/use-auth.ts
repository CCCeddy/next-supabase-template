// src/hooks/use-auth.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useAuth(initialUser: User | null = null) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    // Fetch current session on mount (if not already provided)
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    // Only fetch if no initial user is provided
    if (!initialUser) {
      fetchUser();
    }

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase, initialUser]);

  return { user };
}