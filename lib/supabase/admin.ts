import { createClient } from "@supabase/supabase-js";

/**
 * Admin client — usa service_role key.
 * Só usar em server-side (API routes, Server Actions).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
