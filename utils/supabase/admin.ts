import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Bypasses RLS — never import this file from a Client Component.
// Used only inside Server Actions / Route Handlers.
export const createAdminClient = () => {
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createSupabaseClient(supabaseUrl!, serviceRoleKey, {
    auth: { persistSession: false },
  });
};
