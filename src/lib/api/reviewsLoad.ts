import { ApiError } from "./client";

const MAX_ERROR_MSG = 400;

/**
 * Public list GETs (blogs, reviews) sometimes return 401/403 when the route
 * misbehaves with cookies or auth. Treat as "empty list" so the UI stays calm.
 */
export function shouldTreatPublicListAsEmpty(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;
  if (error.status === 401 || error.status === 403) return true;
  const m = error.message.trim().toLowerCase();
  return (
    m === "unauthorized" ||
    m === "forbidden" ||
    m.includes("unauthorized") ||
    m.includes("forbidden")
  );
}

/** @deprecated Use shouldTreatPublicListAsEmpty — same implementation */
export const shouldTreatReviewsListAsEmpty = shouldTreatPublicListAsEmpty;

function clampMessage(msg: string): string {
  const t = msg.trim();
  if (!t) return "";
  return t.length <= MAX_ERROR_MSG ? t : `${t.slice(0, MAX_ERROR_MSG)}…`;
}

function formatPublicListError(error: unknown, resource: string): string {
  if (shouldTreatPublicListAsEmpty(error)) return "";
  if (error instanceof ApiError) {
    if (error.status >= 500) {
      return `We couldn’t load ${resource} just now. Please try again in a moment.`;
    }
    return (
      clampMessage(error.message) || `Could not load ${resource}.`
    );
  }
  return `Could not load ${resource}.`;
}

export function formatReviewsListError(error: unknown): string {
  return formatPublicListError(error, "reviews");
}

export function formatBlogsListError(error: unknown): string {
  return formatPublicListError(error, "blog posts");
}
