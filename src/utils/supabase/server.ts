// src/utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              // Server components can't directly set cookies
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true,
                sameSite: "lax"
              });
            } catch (error) {
              console.error("Server Component cookie set skipped", error);
            }
          });
        }
      },
      cookieEncoding: "base64url"
    }
  );
}