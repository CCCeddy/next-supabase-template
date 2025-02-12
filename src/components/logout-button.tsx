// app/components/logout-button.tsx
"use client";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
    } else {
      router.refresh();
      router.push("/auth/login");
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
