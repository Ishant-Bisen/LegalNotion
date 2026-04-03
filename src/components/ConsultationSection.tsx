import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { submitConsultationRequest } from "../lib/api/consultation";
import { ApiError } from "../lib/api/client";

const fieldClass =
  "w-full min-h-11 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20 sm:min-h-10 sm:px-4 sm:text-sm";

/**
 * Free-consultation form. Tuned for mobile: readable type, 44px-ish taps, less visual noise.
 */
export default function ConsultationSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrMsg(null);
    setStatus("sending");
    try {
      await submitConsultationRequest({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
      });
    } catch (err) {
      setStatus("err");
      setErrMsg(
        err instanceof ApiError
          ? err.message
          : "We could not send this just now. Please email info@legalnotion.in."
      );
      return;
    }
    setStatus("ok");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return (
    <section
      id="consultation"
      className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f5f0e8_50%,#eef5f0_100%)] py-10 sm:scroll-mt-24 sm:bg-[linear-gradient(135deg,#fdf8f2_0%,#fef0e0_40%,#e8f5ee_100%)] sm:py-16 lg:py-20"
      aria-labelledby="consultation-heading"
    >
      <div className="pointer-events-none absolute top-0 right-0 hidden h-64 w-64 rounded-full bg-gold/5 blur-[100px] sm:block" />
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-56 w-56 rounded-full bg-primary/5 blur-[90px] sm:block" />

      <div className="relative mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-md ring-1 ring-black/[0.03] sm:rounded-3xl sm:p-0 sm:shadow-xl sm:shadow-primary/[0.06] sm:ring-0"
        >
          <div className="border-b border-gray-100 bg-linear-to-r from-primary/[0.04] to-gold/[0.06] px-4 py-5 sm:px-8 sm:py-7">
            <h2
              id="consultation-heading"
              className="font-heading text-center text-[1.35rem] font-bold leading-snug text-primary sm:text-[1.65rem]"
            >
              Free consultation
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-linear-to-r from-gold to-gold-light sm:mt-3.5" />
            <p className="mx-auto mt-3 max-w-[22rem] text-center text-[13px] leading-relaxed text-muted sm:mt-3.5 sm:max-w-none sm:text-sm">
              Tell us briefly what you need. We reply on business days.
            </p>
          </div>

          <div className="px-4 py-5 sm:px-8 sm:pb-8 sm:pt-6">
            {status === "ok" ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-primary/10 bg-primary/[0.06] px-4 py-5 text-center text-sm font-medium leading-relaxed text-primary"
              >
                Thanks - we&apos;ve received your request and will reply soon.
              </motion.p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3.5 sm:space-y-4">
                {errMsg && (
                  <p className="break-words rounded-xl border border-red-100 bg-red-50/95 px-3 py-2.5 text-xs leading-relaxed text-red-900 sm:text-sm">
                    {errMsg}{" "}
                    <a
                      href="mailto:info@legalnotion.in?subject=Free%20consultation"
                      className="font-semibold text-red-950 underline underline-offset-2"
                    >
                      Email us
                    </a>
                  </p>
                )}
                <div>
                  <label
                    htmlFor="consult-name"
                    className="mb-1.5 block text-[13px] font-medium text-primary sm:text-xs"
                  >
                    Name *
                  </label>
                  <input
                    id="consult-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                  <div className="min-w-0">
                    <label
                      htmlFor="consult-email"
                      className="mb-1.5 block text-[13px] font-medium text-primary sm:text-xs"
                    >
                      Email *
                    </label>
                    <input
                      id="consult-email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="min-w-0">
                    <label
                      htmlFor="consult-phone"
                      className="mb-1.5 block text-[13px] font-medium text-primary sm:text-xs"
                    >
                      Phone{" "}
                      <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input
                      id="consult-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="consult-msg"
                    className="mb-1.5 block text-[13px] font-medium text-primary sm:text-xs"
                  >
                    How can we help? *
                  </label>
                  <textarea
                    id="consult-msg"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="OPC setup, trademark, contract review…"
                    className={`${fieldClass} min-h-[7.5rem] resize-none py-3 sm:min-h-[6.5rem]`}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.99 }}
                  className="mt-1 flex min-h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-md transition-[box-shadow,opacity] hover:shadow-lg active:brightness-95 disabled:opacity-60 sm:min-h-11 sm:py-3.5"
                >
                  {status === "sending" ? "Sending…" : "Send request"}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
