"use server";

import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/server-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";

type TableNames = keyof Database["public"]["Tables"];

export async function deleteUser() {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    return { error: "User not found" };
  }

  try {
    const tables: TableNames[] = ["instruments"];

    for (const table of tables) {
      const { error: deleteError } = await adminClient
        .from(table)
        .delete()
        .eq("user_id", user.id);

      if (deleteError) {
        return { error: `Failed to delete ${table}: ${deleteError.message}` };
      }
    }

    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(
      user.id,
    );

    if (deleteUserError) {
      return { error: `Failed to delete user: ${deleteUserError.message}` };
    }

    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error
        ? error.message
        : "An unexpected error occurred",
    };
  }
}
