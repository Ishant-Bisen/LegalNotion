import { apiPost } from "./client";

/** POST /api/candidates (multipart form-data) */
export async function createCandidate(formData: FormData): Promise<unknown> {
  return apiPost("/api/candidates", formData);
}
