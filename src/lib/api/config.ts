/** API origin: production default or VITE_API_URL. In dev, empty uses same-origin /api via Vite proxy. */
export function getApiBase(): string {
  const fromEnv = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return "";
  return "https://api.legalnotion.in";
}
