import { apiGet, apiPost } from "./client";
import type { ReviewDto } from "./types";

function unwrapList(data: unknown): ReviewDto[] {
  if (Array.isArray(data)) return data as ReviewDto[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.reviews)) return o.reviews as ReviewDto[];
    if (Array.isArray(o.data)) return o.data as ReviewDto[];
    if (Array.isArray(o.items)) return o.items as ReviewDto[];
  }
  return [];
}

/** GET /api/reviews - public list; omit credentials to avoid accidental 401 from session cookies */
export async function fetchReviews(): Promise<ReviewDto[]> {
  const data = await apiGet<unknown>("/api/reviews", {
    credentials: "omit",
  });
  return unwrapList(data);
}

export type CreateReviewPayload = {
  name: string;
  role?: string;
  text: string;
  rating: number;
  service?: string;
};

/**
 * POST /api/reviews - public create; omit credentials (same as fetchReviews)
 * so cross-origin requests from Pages work without cookie/CORS issues.
 */
export async function createReview(
  body: CreateReviewPayload
): Promise<unknown> {
  return apiPost("/api/reviews", body, { credentials: "omit" });
}
