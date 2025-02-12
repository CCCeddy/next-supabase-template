// app/auth/callback/route.ts
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("OAuth callback error:", error);
      // Optionally, redirect to an error page or display a message.
      return NextResponse.redirect(`${requestUrl.origin}/auth/error`);
    }
  }

  // Redirect to the dashboard or home page after processing the callback.
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
