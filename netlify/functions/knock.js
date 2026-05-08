// netlify/functions/knock.js
// Validates the riddle answer server-side and logs attempts to
// Supabase. Implemented in a future batch. Stub returns a 503.

export const handler = async () => {
  return {
    statusCode: 503,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: false,
      message: "Knock endpoint not yet implemented",
    }),
  };
};
