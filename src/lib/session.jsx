// src/lib/session.jsx
//
// One shared auth session for the whole app, so the gate, the slide out login panel,
// the top nav and the mobile bottom nav all agree on who is signed in. Wrap the app
// once in SessionProvider, then any component reads useSession(). onAuthStateChange
// keeps it live: sign in from the gate and the nav flips to your avatar instantly,
// sign out from the nav and the gate returns to the login.
//
// signInWithUsername is the single login path: no @ means resolve the username to its
// email through the email_for_username RPC, then signInWithPassword. This is why both
// the gate and the panel behave identically. Harden the RPC to a server side resolver
// before public signup (see the migration note).

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { burroshipSupabase, supabaseReady } from "./burroshipSupabase";

const SessionContext = createContext({
  user: null,
  profile: null,
  loading: true,
  ready: false,
  signInWithUsername: async () => ({ error: "no provider" }),
  signOut: async () => {},
});

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (u) => {
    if (!u) { setProfile(null); return; }
    try {
      const { data } = await burroshipSupabase
        .from("profiles")
        .select("username, display_name, avatar_url")
        .eq("id", u.id)
        .single();
      setProfile(data || { display_name: u.user_metadata?.display_name || u.email });
    } catch (e) {
      setProfile({ display_name: u.user_metadata?.display_name || u.email });
    }
  }, []);

  useEffect(() => {
    if (!supabaseReady) { setLoading(false); return; }
    let active = true;
    burroshipSupabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const u = data.session?.user || null;
      setUser(u);
      loadProfile(u);
      setLoading(false);
    });
    const { data: sub } = burroshipSupabase.auth.onAuthStateChange((_evt, session) => {
      const u = session?.user || null;
      setUser(u);
      loadProfile(u);
    });
    return () => { active = false; sub?.subscription?.unsubscribe?.(); };
  }, [loadProfile]);

  const signInWithUsername = useCallback(async (username, password) => {
    if (!supabaseReady) return { error: "warming up" };
    const raw = (username || "").trim();
    let email = raw;
    if (!raw.includes("@")) {
      const { data, error } = await burroshipSupabase.rpc("email_for_username", { uname: raw });
      if (error) return { error: "tower" };
      if (!data) return { error: "unknown" };
      email = data;
    }
    const { error } = await burroshipSupabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    try { await burroshipSupabase.auth.signOut(); } catch (e) { /* already gone */ }
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(user);
  }, [loadProfile, user]);

  const value = useMemo(
    () => ({ user, profile, loading, ready: supabaseReady, signInWithUsername, signOut, refreshProfile }),
    [user, profile, loading, signInWithUsername, signOut, refreshProfile]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}

/* A person is anonymous by username, so pick the best short label + a single initial
 * for the avatar chip. Shared by the nav and the bottom nav. */
export function accountLabel(profile, user) {
  const name = profile?.display_name || profile?.username || user?.email || "aboard";
  return String(name);
}

export function accountInitial(profile, user) {
  const label = accountLabel(profile, user).trim();
  return (label[0] || "•").toUpperCase();
}
