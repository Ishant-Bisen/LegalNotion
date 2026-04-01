/** Indian mobile for wa.me (no + or spaces). */
export const WHATSAPP_E164 = "919009626333";

const DEFAULT_MESSAGE =
  "Hi Legal Notion! I'd like to connect with your team on WhatsApp.";

export function whatsappChatUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}
