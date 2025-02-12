// src/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth|api|healthcheck).*)"
  ]
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Create middleware-specific client
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        }
      },
      cookieEncoding: "base64url"
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect unauthenticated users
  if (!user && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Update tokens in cookies
  if (session?.access_token) {
    response.cookies.set("sb-access-token", session.access_token, {
      path: "/",
      secure: true,
      sameSite: "lax"
    });
  }

  if (session?.refresh_token) {
    response.cookies.set("sb-refresh-token", session.refresh_token, {
      path: "/",
      secure: true,
      sameSite: "lax"
    });
  }

  return response;
}