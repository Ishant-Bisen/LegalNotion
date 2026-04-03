import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  FileText,
  Gem,
  Handshake,
  Lock,
  Tag,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { PATHS } from "../routes/paths";

const heroChips = [
  { label: "Startups & SMEs", sub: "who we serve" },
  { label: "India-wide", sub: "remote-friendly" },
  { label: "Corporate & IP", sub: "our focus" },
];

const atAGlance = [
  {
    title: "Who we are",
    text: "Legal Notion is a practice built for founders: registration, compliance, contracts, and trademarks without the usual friction.",
  },
  {
    title: "What we do",
    text: "Pvt Ltd, LLP, OPC setup, ROC filings, trademark filing, agreements, and fundraising-ready documentation.",
  },
  {
    title: "How we work",
    text: "Clear scopes, plain language, and tools that keep you moving - email, WhatsApp, and structured follow-through.",
  },
];

const storyPillars = [
  {
    title: "Simple, not scary",
    desc: "Legal steps explained in plain terms so you always know what comes next.",
    accent: "01",
  },
  {
    title: "Built for founders",
    desc: "Processes that match how startups actually operate - not slow, generic checklists.",
    accent: "02",
  },
  {
    title: "Outcomes you can use",
    desc: "Filings, contracts, and advice you can hand to banks, investors, or regulators.",
    accent: "03",
  },
];

const missionBullets: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Zap,
    title: "Speed with care",
    text: "We move quickly without cutting corners on substance.",
  },
  {
    icon: ClipboardList,
    title: "Transparent scope",
    text: "You see what we will do, what it costs, and what you need to provide.",
  },
  {
    icon: Handshake,
    title: "Long-term partners",
    text: "Many clients grow with us from first incorporation to scale.",
  },
];

const values: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Target,
    title: "Integrity",
    desc: "Straight talk and ethical practice.",
  },
  {
    icon: Users,
    title: "Client first",
    desc: "Your goals drive every engagement.",
  },
  {
    icon: Gem,
    title: "Excellence",
    desc: "Thorough work on the details that matter.",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    desc: "Your information stays protected.",
  },
];

const focusStrip: { icon: LucideIcon; label: string; to: string }[] = [
  { icon: Building2, label: "Incorporation", to: PATHS.legalServices },
  { icon: Tag, label: "Trademarks", to: PATHS.legalServices },
  { icon: ClipboardList, label: "Compliance", to: PATHS.legalServices },
  { icon: FileText, label: "Contracts", to: PATHS.legalServices },
  { icon: TrendingUp, label: "Fundraising docs", to: PATHS.legalServices },
];

/** Subtle 3D tilt on hover (CSS + motion). */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springConfig = { stiffness: 260, damping: 28 };
  const rx = useSpring(
    useTransform(my, [0, 1], [7, -7]),
    springConfig
  );
  const ry = useSpring(
    useTransform(mx, [0, 1], [-10, 10]),
    springConfig
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className={`perspective-distant ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
        }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <PageTransition>
      {/* Hero - short, scannable */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary via-secondary to-accent pt-28 pb-12 sm:pb-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,81,0.12),transparent_55%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-24 -top-16 hidden h-[min(420px,50vw)] w-[min(420px,50vw)] rounded-full border border-white/10 lg:block"
          aria-hidden
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-widest text-gold"
          >
            About Legal Notion
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-heading mt-4 text-[clamp(1.85rem,5vw,3rem)] font-bold leading-tight text-white text-pretty"
          >
            Legal support that keeps pace with how you build
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            Company setup, trademarks, compliance, and contracts - structured
            for startups and growing businesses across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {heroChips.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-left shadow-sm backdrop-blur-md"
              >
                <p className="font-heading text-sm font-semibold text-white">
                  {c.label}
                </p>
                <p className="text-xs text-white/65">{c.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* At a glance - 3 tight cards (animate on mount so this band is never “empty”) */}
      <section className="border-b border-gray-100 bg-[linear-gradient(180deg,#fdf8f2_0%,#fff_45%)] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-5 md:grid-cols-3"
          >
            {atAGlance.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story pillars - 3D tilt on desktop */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-center md:mb-11"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Why we exist
            </span>
            <h2 className="font-heading mt-3 text-2xl font-bold text-primary sm:text-3xl text-pretty">
              Three ideas behind everything we do
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {storyPillars.map((block, i) => (
              <TiltCard key={block.title} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.45 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex h-full flex-col rounded-2xl border border-gray-100 bg-linear-to-br from-white to-[#faf8f5] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/10 sm:p-8"
                >
                  <span className="font-heading text-3xl font-bold text-gold/35">
                    {block.accent}
                  </span>
                  <h3 className="font-heading mt-2 text-lg font-semibold text-primary">
                    {block.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {block.desc}
                  </p>
                  <div className="mt-4 h-1 w-12 rounded-full bg-linear-to-r from-gold to-gold-light" />
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + values - asymmetric, short copy */}
      <section className="bg-linear-to-b from-primary/3 to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-gold">
                Mission
              </span>
              <h2 className="font-heading mt-3 text-2xl font-bold text-primary sm:text-3xl text-pretty">
                Make legal{" "}
                <span className="text-gold">actionable</span>, not abstract
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                We turn registrations, filings, and agreements into clear next
                steps - so you spend less time decoding jargon and more time
                building.
              </p>
              <ul className="mt-8 space-y-4">
                {missionBullets.map((b) => {
                  const MissionIcon = b.icon;
                  return (
                    <li key={b.title} className="flex gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10"
                        aria-hidden
                      >
                        <MissionIcon
                          className="h-5 w-5 text-gold"
                          strokeWidth={1.65}
                          aria-hidden
                        />
                      </span>
                      <div>
                        <p className="font-heading text-sm font-semibold text-primary">
                          {b.title}
                        </p>
                        <p className="text-sm text-muted leading-snug">{b.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {values.map((v, i) => {
                const ValueIcon = v.icon;
                return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                >
                  <ValueIcon
                    className="h-6 w-6 text-gold"
                    strokeWidth={1.65}
                    aria-hidden
                  />
                  <h4 className="font-heading mt-2 text-sm font-semibold text-primary">
                    {v.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {v.desc}
                  </p>
                </motion.div>
              );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services snapshot strip */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-gold">
                Practice snapshot
              </span>
              <h2 className="font-heading mt-2 text-xl font-bold text-primary sm:text-2xl">
                Where we help most
              </h2>
            </div>
            <NavLink
              to={PATHS.legalServices}
              className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
            >
              View all services →
            </NavLink>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {focusStrip.map((f) => {
              const FocusIcon = f.icon;
              return (
              <motion.div key={f.label} variants={fadeUp}>
                <NavLink
                  to={f.to}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition-all hover:border-gold/40 hover:shadow-md"
                >
                  <FocusIcon
                    className="h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {f.label}
                </NavLink>
              </motion.div>
            );
            })}
          </motion.div>
        </div>
      </section>

      {/* People / Careers - one tight band */}
      <section className="bg-light py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Team
            </span>
            <h2 className="font-heading mt-3 text-2xl font-bold text-primary sm:text-3xl">
              Want to work with us?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
              We hire and collaborate with people who care about startups and
              clear, practical law.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <NavLink
                  to={PATHS.careers}
                  className="inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
                >
                  Careers
                </NavLink>
              </motion.div>
              <motion.a
                href="mailto:info@legalnotion.in"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex rounded-full border-2 border-primary px-8 py-3 font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-accent p-10 text-center sm:p-14"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,169,81,0.18),transparent_50%)]" />
            <div className="relative">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl text-pretty">
                Tell us what you&apos;re building
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                Idea stage or scaling - we&apos;ll help you sort the legal
                pieces without the runaround.
              </p>
              <motion.a
                href="mailto:info@legalnotion.in"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 font-semibold text-primary shadow-lg"
              >
                Get in touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
