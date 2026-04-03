/**
 * API **origin** only (scheme + host, optional port). The app then calls paths like `/api/reviews`.
 *
 * **`/health` is not the API “base”.** [`/health`](https://api.legalnotion.in/health) is a separate
 * check endpoint on the same server. Reviews/blogs/candidates use their own routes on that host
 * (e.g. `GET/POST …/api/reviews`). Do not set `VITE_API_URL` to a `/health` URL.
 *
 * - **Dev:** leave `VITE_API_URL` unset → `/api/...` is proxied by Vite to the real API.
 * - **Production:** unset → `https://api.legalnotion.in`. Never use your Cloudflare Pages URL here.
 *
 * Normalization: trailing `/api`, `/health`, or `/` on `VITE_API_URL` is stripped so you do not get
 * broken URLs like `…/health/api/reviews` or `…/api/api/reviews` (404).
 */
export function getApiBase(): string {
  let fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) {
    fromEnv = fromEnv.replace(/\/+$/, "");
    if (fromEnv.endsWith("/health")) {
      fromEnv = fromEnv.replace(/\/health$/i, "").replace(/\/+$/, "");
    }
    if (fromEnv.endsWith("/api")) {
      fromEnv = fromEnv.replace(/\/api$/, "").replace(/\/+$/, "");
    }
    return fromEnv;
  }
  if (import.meta.env.DEV) return "";
  return "https://api.legalnotion.in";
}
