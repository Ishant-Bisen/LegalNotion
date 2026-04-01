import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { createCandidate } from "../lib/api/candidates";
import { ApiError } from "../lib/api/client";
import { ApiLoaderOverlay } from "../components/ApiAnimatedLoader";

const currentYear = new Date().getFullYear();
const minPassoutYear = 1990;
const maxPassoutYear = currentYear + 6;

function isPdfFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return file.type === "application/pdf" || name.endsWith(".pdf");
}

export default function Careers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [passoutYear, setPassoutYear] = useState("");
  const [location, setLocation] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resume) {
      setMessage("Please attach your resume as a PDF.");
      setStatus("err");
      return;
    }
    if (!isPdfFile(resume)) {
      setMessage("Resume must be a PDF file.");
      setStatus("err");
      return;
    }
    const yearNum = Number.parseInt(passoutYear, 10);
    if (
      Number.isNaN(yearNum) ||
      yearNum < minPassoutYear ||
      yearNum > maxPassoutYear
    ) {
      setMessage(
        `Please enter a valid pass-out year (${minPassoutYear}–${maxPassoutYear}).`
      );
      setStatus("err");
      return;
    }
    setStatus("submitting");
    setMessage(null);
    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("email", email.trim());
    fd.append("college", college.trim());
    fd.append("passoutYear", String(yearNum));
    fd.append("location", location.trim());
    fd.append("resume", resume);
    try {
      await createCandidate(fd);
      setStatus("ok");
      setMessage("Application submitted successfully. We will be in touch.");
      setName("");
      setEmail("");
      setCollege("");
      setPassoutYear("");
      setLocation("");
      setResume(null);
      setFileInputKey((k) => k + 1);
    } catch (err) {
      setStatus("err");
      setMessage(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again later."
      );
    }
  }

  return (
    <PageTransition>
      <section className="pt-28 pb-12 bg-linear-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,81,0.08),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Join us
          </span>
          <h1 className="font-heading text-4xl font-bold text-white mt-3 mb-4">
            Careers at Legal Notion
          </h1>
          <div className="text-white/95 text-lg leading-relaxed max-w-2xl mx-auto space-y-3 text-pretty">
            <p>
              Bring your résumé and a short note that tells us what kind of
              problems you love to solve—whether that&apos;s strategy at the
              desk, advocacy in the room, or smarter ways to serve clients.
            </p>
            <p className="text-white/85 text-base">
              We read every application with care. If there&apos;s a real fit,
              you&apos;ll hear from us—no silent inbox, no endless holding
              pattern.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="relative max-w-xl mx-auto px-4 space-y-5 bg-white rounded-2xl border border-gray-100 shadow-lg p-8 overflow-hidden"
        >
          <ApiLoaderOverlay
            show={status === "submitting"}
            message="Sending your application…"
          />
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Full name *
            </label>
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              College *
            </label>
            <input
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. National Law University, Delhi"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Pass-out year *
            </label>
            <input
              type="number"
              required
              min={minPassoutYear}
              max={maxPassoutYear}
              step={1}
              value={passoutYear}
              onChange={(e) => setPassoutYear(e.target.value)}
              placeholder={String(currentYear)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
            <p className="text-xs text-muted mt-1">
              Expected year of graduation ({minPassoutYear}–{maxPassoutYear})
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Location *
            </label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              autoComplete="address-level2"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Resume * (PDF only)
            </label>
            <input
              key={fileInputKey}
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(e) => setResume(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-muted file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white"
            />
          </div>
          {message && (
            <p
              className={`text-sm rounded-lg px-3 py-2 ${
                status === "ok"
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          )}
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-full bg-primary text-white font-semibold text-sm disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit application"}
          </motion.button>
        </motion.form>
      </section>
    </PageTransition>
  );
}
