// src/lib/burroshipSupabase.js
//
// Supabase client for the Burroship project. Separate from any other
// Supabase clients in the app — Burroship has its own project.

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_BURROSHIP_SUPABASE_URL;
const anonKey = import.meta.env.VITE_BURROSHIP_SUPABASE_ANON_KEY;

export const burroshipSupabase = (url && anonKey)
  ? createClient(url, anonKey, {
      auth: { persistSession: false },
      realtime: { params: { eventsPerSecond: 10 } },
    })
  : null;

export const supabaseReady = !!burroshipSupabase;