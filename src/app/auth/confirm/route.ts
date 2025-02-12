import { createSupabaseServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.verifyOtp({
    type: "email",
    token_hash: searchParams.get("token_hash")!,
    email: searchParams.get("email")!
  });

  return error
    ? NextResponse.redirect("/auth/error")
    : NextResponse.redirect("/dashboard");
}