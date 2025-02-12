// app/actions/logout.ts
"use server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    redirect("/error");
  }

  redirect("/auth/login");
}