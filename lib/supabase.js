// Browser client helper — digunakan oleh halaman admin (Client Components)
// Menggunakan pattern @supabase/ssr createBrowserClient

import { createClient as createBrowserClient } from "@/utils/supabase/client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes("placeholder") &&
  !supabaseKey.includes("placeholder")
);

// Lazy singleton
let _supabase = null;
export function getSupabaseClient() {
  if (!_supabase) {
    _supabase = createBrowserClient();
  }
  return _supabase;
}

// Named export for backward compatibility
export const supabase = getSupabaseClient();
