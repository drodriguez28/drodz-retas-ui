## Team Splitter

Run locally: `pnpm run dev`

## Netlify

- SPA redirects are configured in `netlify.toml`, so direct links like `/room/:id` load correctly.
- Current room storage uses browser `localStorage` only.
- This means room links do not sync data across different users/devices until a real database is connected.