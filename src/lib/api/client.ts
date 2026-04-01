import { getApiBase } from "./config";

/**
 * HTTP client for Legal Notion API.
 *
 * - **credentials:** defaults to `"include"` (cookies). Public read endpoints
 *   that must not send cookies should pass `credentials: "omit"` in the init
 *   (see `fetchReviews`, `fetchBlogs`) to avoid spurious 401s.
 * - **Errors:** Throws `ApiError` with `status` and parsed `body`; UI should
 *   show `message` only, never `JSON.stringify(body)` (may contain internals).
 */
export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function joinUrl(path: string): string {
  const base = getApiBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers: initHeaders, credentials, ...rest } = options;
  const headers = new Headers(initHeaders);

  if (body !== undefined && body !== null && !(body instanceof FormData)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const fetchBody =
    body === undefined || body === null
      ? undefined
      : body instanceof FormData
        ? body
        : JSON.stringify(body);

  const res = await fetch(joinUrl(path), {
    ...rest,
    headers,
    body: fetchBody,
    credentials: credentials ?? "include",
  });

  const text = await res.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    const msg =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed &&
      typeof (parsed as { message: unknown }).message === "string"
        ? (parsed as { message: string }).message
        : typeof parsed === "object" &&
            parsed !== null &&
            "error" in parsed &&
            typeof (parsed as { error: unknown }).error === "string"
          ? (parsed as { error: string }).error
          : res.statusText || `HTTP ${res.status}`;
    throw new ApiError(msg, res.status, parsed);
  }

  return parsed as T;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "GET" });
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  init?: Omit<RequestOptions, "body" | "method">
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "POST", body });
}
