// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Returns null when env vars are missing so the site still renders
// in local dev before you have a Supabase project provisioned.
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;
