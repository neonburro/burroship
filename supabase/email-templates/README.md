# burroship auth email templates

Branded HTML for the Burroship Supabase auth emails. Blue-gray card, dark header band
with the wordmark, one sky blue action button, in the ship voice. Table based with
inline styles so they render in Outlook, Gmail and Apple Mail. No external images and
no webfonts, Rubik is named first and falls back to Helvetica so nothing breaks when a
client strips fonts.

## Where each one goes

Supabase Dashboard for the Burroship project, then Authentication > Email Templates.
Paste the full file into the message body and set the subject shown.

| file | template | suggested subject | variable |
|---|---|---|---|
| `confirm-signup.html` | Confirm signup | confirm you want aboard | `{{ .ConfirmationURL }}` |
| `invite.html` | Invite user | you have been called aboard | `{{ .ConfirmationURL }}` |
| `magic-link.html` | Magic Link | your way in | `{{ .ConfirmationURL }}` |
| `reset-password.html` | Reset Password | reset your key | `{{ .ConfirmationURL }}` |
| `change-email.html` | Change Email Address | confirm your new address | `{{ .ConfirmationURL }}` |
| `reauthentication.html` | Reauthentication | confirm it is you | `{{ .Token }}` |

## Palette used

Match these to `src/styles/index.css` if the theme moves.

- ground `#CFD9E6`, card `#DFE7F0`, border `#CBD4E1`
- header black `#0B0C0E`, ink `#0D131B`, muted `#46525F`, faint `#78838F`
- accent `#2E9BE6`, accent deep `#1668A8`

## Connecting Supabase (why these are not sending yet)

The app already has a client at `src/lib/burroshipSupabase.js` pointed at the Burroship
project, but it is dormant until two env vars are set. It is NOT the studio project, this
is the Burroship's own Supabase.

Set these in Netlify (Site settings > Environment variables) for the Burroship site AND in
a local `.env` for dev. The anon key is the publishable browser key, safe to expose, but
do not paste the service_role key anywhere in the frontend.

```
VITE_BURROSHIP_SUPABASE_URL
VITE_BURROSHIP_SUPABASE_ANON_KEY
```

Both come from the Burroship project in the Supabase dashboard under Project Settings >
API. After adding them, trigger a Netlify redeploy so the build picks them up.

## Related, not built yet

- `access_requests` table for the contact page form (name, email, phone, address,
  discord, socials jsonb, note, created_at). Once the table plus the env vars exist the
  contact form at `/contact/` will store requests, and a notify function can email the
  crew.
- A login notification, admin plus a funny client side one, fires when someone enters the
  bridge. Copy is drafted, wiring waits on auth being live.
