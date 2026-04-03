import { apiPost } from "./client";

export type ConsultationPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

/** POST /api/consultations — omit credentials for cross-origin Pages builds */
export async function submitConsultationRequest(
  body: ConsultationPayload
): Promise<unknown> {
  return apiPost("/api/consultations", body, { credentials: "omit" });
}
