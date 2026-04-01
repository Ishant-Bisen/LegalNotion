import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import PageTransition from "../components/PageTransition";
import { whatsappChatUrl } from "../lib/whatsapp";
import FAQ from "../components/FAQ";
import ApiAnimatedLoader from "../components/ApiAnimatedLoader";
import { usePublicReviews } from "../hooks/usePublicReviews";
import type { ReviewUIModel } from "../lib/api/mappers";

const features = [
  {
    icon: "⚖️",
    title: "Expert Counsel",
    desc: "Our seasoned attorneys provide strategic legal advice tailored to your unique situation.",
  },
  {
    icon: "🛡️",
    title: "Proven Defense",
    desc: "A track record of successful outcomes in complex litigation and dispute resolution.",
  },
  {
    icon: "📋",
    title: "Full Compliance",
    desc: "Navigate regulatory landscapes with confidence through our compliance expertise.",
  },
  {
    icon: "💰",
    title: "Lowest Cost in India",
    desc: "Premium legal services at the most affordable rates in India — quality counsel without the heavy price tag.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function useCarouselColumns(): 1 | 2 | 3 {
  const [cols, setCols] = useState<1 | 2 | 3>(() => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  });
  useEffect(() => {
    const q = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCols(3);
      else if (w >= 768) setCols(2);
      else setCols(1);
    };
    q();
    window.addEventListener("resize", q);
    return () => window.removeEventListener("resize", q);
  }, []);
  return cols;
}

function ReviewsCarousel({
  reviews,
  loading,
  error,
}: {
  reviews: ReviewUIModel[];
  loading: boolean;
  error: string | null;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const carouselCols = useCarouselColumns();

  const len = reviews.length;

  const goTo = useCallback(
    (index: number) => {
      if (len === 0) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current, len]
  );

  const next = useCallback(() => {
    if (len === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    if (len === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + len) % len);
  }, [len]);

  useEffect(() => {
    if (len === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, len]);

  const slideX = carouselCols === 1 ? 56 : carouselCols === 2 ? 120 : 300;
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? slideX : -slideX, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -slideX : slideX, opacity: 0 }),
  };

  const visibleReviews = useMemo(() => {
    if (len === 0) return [];
    const i = current % len;
    if (carouselCols >= 3) {
      return [
        reviews[i],
        reviews[(i + 1) % len],
        reviews[(i + 2) % len],
      ];
    }
    if (carouselCols >= 2) {
      return [reviews[i], reviews[(i + 1) % len]];
    }
    return [reviews[i]];
  }, [reviews, len, current, carouselCols]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-3">
            What Our Clients Say
          </h2>
          <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
            Real feedback from people we&apos;ve worked with — swipe through on
            your phone or use the dots below.
          </p>
        </motion.div>

        {loading && (
          <ApiAnimatedLoader message="Loading testimonials…" compact />
        )}

        {!loading && error && (
          <p className="text-center text-muted text-sm mb-8 max-w-md mx-auto">
            {error}{" "}
            <NavLink to="/reviews" className="text-gold font-medium underline">
              View reviews page
            </NavLink>
          </p>
        )}

        {!loading && !error && len === 0 && (
          <div className="text-center py-12 max-w-md mx-auto">
            <p className="text-muted text-sm mb-4">
              No published reviews yet. Share your experience with us.
            </p>
            <NavLink
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold"
            >
              Write a review
            </NavLink>
          </div>
        )}

        {!loading && len > 0 && (
          <>
            <div className="relative px-1 sm:px-0">
              <div className="overflow-hidden rounded-2xl sm:rounded-none">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
                  >
                    {visibleReviews.map((review, idx) => (
                      <div
                        key={`${review.id}-${idx}`}
                        className="group bg-white rounded-2xl p-5 sm:p-6 lg:p-7 border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/20 transition-all duration-500 flex flex-col"
                      >
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <span
                              key={s}
                              className={`text-lg ${s < review.rating ? "text-gold" : "text-gray-200"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        <p className="text-muted leading-relaxed text-sm flex-1 mb-6">
                          &ldquo;{review.text}&rdquo;
                        </p>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-heading font-bold text-sm">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-primary font-semibold text-sm">
                              {review.name}
                            </p>
                            <p className="text-muted text-xs">{review.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Arrows: desktop/tablet only — mobile uses dots + full-width cards */}
              <button
                type="button"
                onClick={prev}
                className="hidden md:flex absolute top-1/2 -left-1 lg:-left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="hidden md:flex absolute top-1/2 -right-1 lg:-right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
              >
                →
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center flex-wrap gap-2 mt-8 sm:mt-10 px-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-gold"
                      : "w-2.5 bg-gray-300 hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const HERO_STATS = [
  { value: "50+", label: "Cases handled" },
  { value: "10+", label: "Legal experts" },
  { value: "4+", label: "Years of experience" },
  { value: "6", label: "Practice areas" },
] as const;

export default function Home() {
  const { reviews, loading, error, stats } = usePublicReviews();

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-dvh md:min-h-screen flex items-center overflow-hidden bg-linear-to-br from-primary via-secondary to-accent">
        {/* Animated background — subtle ring on mobile so the hero doesn’t feel empty */}
        <div
          className="absolute top-24 -right-16 w-56 h-56 rounded-full border border-white/15 lg:hidden pointer-events-none"
          aria-hidden
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border-2 border-white/30 hidden lg:block"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full border-2 border-white/20 hidden lg:block"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,81,0.08),transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-7xl -translate-y-2 px-4 pt-20 pb-20 sm:-translate-y-2.5 sm:px-6 sm:pt-24 sm:pb-28 md:-translate-y-2 md:pt-20 md:pb-24 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-stretch md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="min-w-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-5 sm:mb-6 max-w-full"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
                <span className="text-gold text-xs sm:text-sm font-medium">
                  Trusted Legal Partners
                </span>
              </motion.div>

              <h1 className="font-heading text-[clamp(1.75rem,5.5vw,3.75rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] sm:leading-tight mb-4 sm:mb-6 max-w-xl md:max-w-none">
                Justice Served with{" "}
                <span className="text-gold-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
                  Excellence
                </span>
              </h1>

              <p className="text-white/95 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-10 max-w-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                We combine years of legal expertise with a modern,
                client-first approach. Your rights deserve nothing less than the
                finest representation.
              </p>

              <div
                className="grid w-full grid-cols-1 gap-3 max-md:mx-auto max-md:max-w-[min(100%,18.5rem)] sm:max-md:max-w-md md:mx-0 md:max-w-md sm:grid-cols-2 sm:gap-3.5 sm:items-stretch"
                role="group"
                aria-label="Primary actions"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-0 sm:min-h-13"
                >
                  <NavLink
                    to="/services"
                    className="group relative isolate flex h-full min-h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-br from-white via-white to-white/95 px-5 py-3.5 text-sm font-semibold text-primary shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/80 transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_44px_-8px_rgba(0,0,0,0.4)] hover:ring-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-[0.9375rem]"
                  >
                    <span className="relative z-10">Our Services</span>
                    <ArrowForwardRounded
                      className="relative z-10 shrink-0 text-primary/90 transition-transform duration-300 group-hover:translate-x-0.5"
                      sx={{ fontSize: 22 }}
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                  </NavLink>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-0 sm:min-h-13"
                >
                  <NavLink
                    to="/about"
                    className="group relative flex h-full min-h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-white/55 bg-white/12 px-5 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] hover:border-white/85 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-[0.9375rem]"
                  >
                    <AutoStoriesRounded
                      className="shrink-0 text-gold-light/95 transition-transform duration-300 group-hover:scale-110"
                      sx={{ fontSize: 22 }}
                      aria-hidden
                    />
                    <span>Learn More</span>
                  </NavLink>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats — full width on mobile (stacked), beside copy from md */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="min-w-0 w-full max-md:mx-auto max-md:max-w-[min(100%,18.5rem)] sm:max-md:max-w-md md:mx-0 md:max-w-none"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-gold/20 to-transparent rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl" />
                <div className="relative bg-white/12 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {HERO_STATS.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="text-center"
                      >
                        <motion.div
                          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-white/90 text-[11px] sm:text-xs md:text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] leading-snug">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — same animated “mouse” on mobile and desktop */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex justify-center pointer-events-none"
          aria-hidden
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/90 flex justify-center pt-2 shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-gold-light shadow-[0_0_6px_rgba(242,181,106,0.9)]"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-[linear-gradient(135deg,#fdf8f2_0%,#fef0e0_40%,#e8f5ee_100%)]">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14 lg:mb-16 max-w-2xl mx-auto"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-3">
              Legal Solutions You Can Trust
            </h2>
            <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
              Four pillars we lean on for every client — clear counsel, strong
              outcomes, and value that respects your budget.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-gray-100 shadow-md hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-gold/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                  {f.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">{f.desc}</p>

                <motion.div className="absolute bottom-0 left-8 right-8 h-0.5 bg-linear-to-r from-gold to-gold-light rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology-Driven Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-br from-dark via-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(224,133,48,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,181,106,0.08),transparent_50%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-[250px] h-[250px] rounded-full border border-white/5"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
            {/* Left — story + bullets; card stacks below on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="min-w-0"
            >
              <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest">
                Innovation Meets Law
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mt-3 mb-4 sm:mb-6 text-pretty">
                Powered by Latest Technology,{" "}
                <span className="text-gold-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
                  Driven by Results
                </span>
              </h2>
              <div className="max-w-xl mb-5 sm:mb-8 space-y-3 sm:space-y-3.5 text-white/92 text-xs min-[400px]:text-sm sm:text-base md:text-lg leading-relaxed text-pretty">
                <p>
                  At Legal Notion, we combine modern legal technology with
                  AI-assisted research so we can plan, document, and progress
                  matters efficiently — always with clear communication and sound
                  judgment.
                </p>
                <p>
                  Client relationships come first.{" "}
                  {stats.satisfactionPct !== null ? (
                    <>
                      Our published review data maps to a{" "}
                      <span className="text-gold-light font-semibold tabular-nums">
                        {stats.satisfactionPct}%
                      </span>{" "}
                      satisfaction index from real feedback.
                    </>
                  ) : (
                    <>
                      We aim for{" "}
                      <span className="text-gold-light font-semibold tabular-nums">
                        99%
                      </span>{" "}
                      client satisfaction across the clients we serve.
                    </>
                  )}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 lg:border-0 lg:bg-transparent lg:p-0">
                {[
                  {
                    icon: "🤖",
                    title: "AI-Powered Legal Research",
                    desc: "Our AI assistant analyzes thousands of case laws and statutes in seconds to build the strongest strategy for your case.",
                  },
                  {
                    icon: "📊",
                    title: "Real-Time Case Tracking",
                    desc: "Stay updated on your case progress 24/7 through our digital dashboard — transparency you can trust.",
                  },
                  {
                    icon: "🔒",
                    title: "Secure & Confidential",
                    desc: "Bank-grade encryption protects all your documents and communications. Your privacy is non-negotiable.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                    className="flex gap-2.5 min-[400px]:gap-3 sm:gap-4 items-start group"
                  >
                    <div className="w-10 h-10 min-[400px]:w-11 min-[400px]:h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-lg sm:text-xl shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h4 className="text-white font-semibold mb-1 text-xs min-[400px]:text-sm sm:text-base leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-white/88 text-xs sm:text-sm leading-relaxed text-pretty">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — satisfaction card (same side-by-side grid as hero on all breakpoints) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="min-w-0 w-full flex items-start lg:items-center justify-center lg:self-start"
            >
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-linear-to-br from-gold/20 to-gold-light/10 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl" />

                <div className="relative bg-white/12 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-10">
                  {/* Satisfaction meter */}
                  <div className="text-center mb-4 sm:mb-8">
                    <motion.div
                      className="font-heading text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-light drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    >
                      {stats.satisfactionPct !== null
                        ? `${stats.satisfactionPct}%`
                        : "99%"}
                    </motion.div>
                    <p className="text-white/90 text-[11px] min-[400px]:text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed px-1 text-pretty">
                      {stats.count > 0
                        ? "Derived from published client reviews"
                        : "Submit a review to build this score"}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="grid grid-cols-2 gap-2 min-[400px]:gap-3 sm:gap-4">
                    {[
                      { label: "Research", icon: "🧠", value: "Modern tools" },
                      { label: "Updates", icon: "📱", value: "Clear communication" },
                      { label: "Security", icon: "🛡️", value: "Confidential handling" },
                      { label: "Focus", icon: "⚡", value: "Efficient process" },
                    ].map((badge, i) => (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="bg-white/14 rounded-lg sm:rounded-xl p-2 min-[400px]:p-3 sm:p-4 text-center border border-white/15 hover:border-gold/30 transition-all duration-300"
                      >
                        <span className="text-lg min-[400px]:text-xl sm:text-2xl block mb-0.5 sm:mb-2">
                          {badge.icon}
                        </span>
                        <p className="text-white font-semibold text-[9px] min-[400px]:text-[10px] sm:text-sm leading-tight">
                          {badge.value}
                        </p>
                        <p className="text-white/80 text-[8px] min-[400px]:text-[9px] sm:text-xs mt-0.5 leading-tight">
                          {badge.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <motion.a
                    href={whatsappChatUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-4 sm:mt-8 inline-flex items-center justify-center gap-2 text-gold text-[11px] min-[400px]:text-xs sm:text-sm font-semibold text-center px-2 py-2 rounded-xl border border-gold/35 bg-gold/5 hover:bg-gold/10 hover:border-gold/50 transition-colors w-full max-w-sm mx-auto"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                      <svg
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="w-4 h-4"
                        aria-hidden
                      >
                        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.738 3.052 9.376L1.056 31.2l6.04-1.94A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.286 2.1-3.15 2.154-.796.05-1.54.376-5.186-1.1-4.396-1.776-7.178-6.27-7.398-6.562-.214-.29-1.76-2.352-1.76-4.486 0-2.134 1.114-3.186 1.51-3.62.39-.428.856-.536 1.142-.536.286 0 .57.004.82.014.264.012.618-.1.966.738.356.858 1.214 2.952 1.32 3.168.108.214.178.468.036.752-.142.29-.214.468-.428.72-.214.25-.45.558-.642.748-.214.214-.436.446-.188.876.25.428 1.108 1.828 2.38 2.962 1.634 1.458 3.012 1.91 3.44 2.124.428.214.678.178.928-.108.25-.286 1.07-1.248 1.356-1.676.286-.428.57-.356.964-.214.392.142 2.5 1.178 2.928 1.392.428.214.714.322.82.5.108.178.108 1.028-.284 2.128z" />
                      </svg>
                    </span>
                    <span className="leading-snug text-left">
                      Connect on WhatsApp
                      <span className="block font-normal text-white/80 text-[10px] sm:text-xs mt-0.5">
                        Tap to chat
                      </span>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <ReviewsCarousel
        reviews={reviews}
        loading={loading}
        error={error}
      />

      {/* FAQ Section */}
      <FAQ
        subtitle="Got Questions?"
        title="Frequently Asked Questions"
        items={[
          {
            question: "What types of legal services does Legal Notion offer?",
            answer:
              "We offer a comprehensive range of legal services including corporate law, civil litigation, intellectual property, real estate, family law, and employment law. Our team is equipped to handle everything from business formation to complex dispute resolution.",
          },
          {
            question: "How much do your legal services cost?",
            answer:
              "We pride ourselves on providing the lowest cost legal services in India without compromising on quality. We offer transparent pricing, flexible payment plans, and free initial consultations so you can understand the costs upfront.",
          },
          {
            question: "How do I schedule a consultation?",
            answer:
              "You can schedule a free consultation by clicking the 'Get in Touch' button, emailing us at info@legalnotion.com, or calling us directly at (555) 123-4567. We respond within 24 hours on business days.",
          },
          {
            question: "Do you handle cases across all of India?",
            answer:
              "Yes, Legal Notion serves clients across India. We have expertise in central and state-level legal frameworks and can represent you in courts and tribunals nationwide.",
          },
          {
            question: "How long does a typical case take to resolve?",
            answer:
              "Case timelines vary depending on complexity. Simple matters like contract drafting may take a few days, while litigation cases can take several months. During your consultation, we provide a realistic timeline based on your specific situation.",
          },
          {
            question: "What makes Legal Notion different from other law firms?",
            answer:
              "We combine experienced legal expertise with the most affordable rates in India, a client-first approach, and modern technology for efficient case management. Our 99% client satisfaction rate speaks for itself.",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,169,81,0.1),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center px-5 sm:px-6"
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
            Schedule a free consultation with our legal team today and take the
            first step towards resolving your legal matters.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <NavLink
              to="/about"
              className="inline-flex items-center gap-2 sm:gap-3 px-8 py-3.5 sm:px-10 sm:py-4 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow text-base sm:text-lg"
            >
              Free Consultation
              <span>→</span>
            </NavLink>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
