import { apiGet } from "./client";
import type { BlogDto } from "./types";

function unwrapList(data: unknown): BlogDto[] {
  if (Array.isArray(data)) return data as BlogDto[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.blogs)) return o.blogs as BlogDto[];
    if (Array.isArray(o.data)) return o.data as BlogDto[];
    if (Array.isArray(o.items)) return o.items as BlogDto[];
  }
  return [];
}

/** GET /api/blogs - public list; omit credentials to avoid 401 from stray session cookies */
export async function fetchBlogs(): Promise<BlogDto[]> {
  const data = await apiGet<unknown>("/api/blogs", {
    credentials: "omit",
  });
  return unwrapList(data);
}
