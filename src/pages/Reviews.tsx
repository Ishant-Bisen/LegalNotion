import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { fetchReviews, createReview } from "../lib/api/reviews";
import { mapReviewToUI, buildCreateReviewPayload } from "../lib/api/mappers";
import { ApiError } from "../lib/api/client";
import {
  formatReviewsListError,
  shouldTreatReviewsListAsEmpty,
} from "../lib/api/reviewsLoad";
import ApiAnimatedLoader, {
  ApiLoaderOverlay,
} from "../components/ApiAnimatedLoader";

interface Reply {
  id: number;
  name: string;
  text: string;
  date: string;
}

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  service: string;
  replies: Reply[];
}

const SERVICES = [
  "All",
  "Business Incorporation (Pvt Ltd, LLP, OPC)",
  "Compliance & Regulatory Support",
  "Contract Drafting & Review",
  "Intellectual Property (Trademarks & Copyrights)",
  "Fundraising & Due Diligence",
  "Data Protection",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function StarRating({
  rating,
  onRate,
  interactive = false,
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`text-xl transition-colors duration-200 ${
            interactive ? "cursor-pointer" : "cursor-default"
          } ${
            star <= (hover || rating) ? "text-gold" : "text-gray-200"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ReviewsListEmptyState({ onWrite }: { onWrite: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-gray-100/80 bg-linear-to-br from-slate-50/90 via-white to-[#fdf8f2] px-6 py-14 sm:px-10 sm:py-20 text-center shadow-[0_20px_60px_-24px_rgba(15,60,90,0.12)]"
    >
      <div
        className="pointer-events-none absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <div className="mb-7 flex justify-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="text-2xl sm:text-3xl text-gold/40"
              initial={{ opacity: 0, y: 12, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.06 * i,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              aria-hidden
            >
              ★
            </motion.span>
          ))}
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
          Your story can go first
        </h3>
        <p className="text-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10">
          There aren&apos;t any public reviews here yet. When clients share feedback, it
          will show up for everyone. Take a minute to tell others about your experience
          with Legal Notion.
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onWrite}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-gold to-gold-light text-white font-semibold text-sm shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 transition-shadow"
        >
          <span aria-hidden>✍️</span>
          Write a review
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"latest" | "highest" | "lowest">("latest");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const REVIEWS_PER_PAGE = 6;

  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formService, setFormService] = useState("");
  const [formRating, setFormRating] = useState(0);
  const [formText, setFormText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const loadReviews = useCallback(async () => {
    try {
      setReviewsError(null);
      const raw = await fetchReviews();
      setReviews(raw.map(mapReviewToUI));
    } catch (e) {
      setReviews([]);
      if (shouldTreatReviewsListAsEmpty(e)) {
        setReviewsError(null);
      } else {
        setReviewsError(formatReviewsListError(e));
      }
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortBy]);

  const filteredReviews = useMemo(() => {
    let result =
      activeFilter === "All"
        ? [...reviews]
        : reviews.filter((r) => r.service === activeFilter);

    if (sortBy === "latest") result.sort((a, b) => b.date.localeCompare(a.date));
    else if (sortBy === "highest") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => a.rating - b.rating);

    return result;
  }, [reviews, activeFilter, sortBy]);

  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach((r) => dist[r.rating - 1]++);
    return dist;
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formText || !formRating || !formService) return;
    setSubmitError(null);
    setReviewSubmitting(true);
    try {
      await createReview(
        buildCreateReviewPayload({
          name: formName,
          role: formRole,
          service: formService,
          rating: formRating,
          text: formText,
        })
      );
    } catch (err) {
      setSubmitError(
        err instanceof ApiError ? err.message : "Could not submit review."
      );
      setReviewSubmitting(false);
      return;
    }
    setReviewSubmitting(false);
    setFormName("");
    setFormRole("");
    setFormService("");
    setFormRating(0);
    setFormText("");
    setSubmitted(true);
    void loadReviews();
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };


  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-linear-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,133,48,0.12),transparent_60%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-white/10"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Client Feedback
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
              What People Say About Us
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Real reviews from real clients. Your feedback helps us improve and
              serve you better.
            </p>
          </motion.div>

          {/* Rating Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-8 min-h-[200px]"
          >
            {reviewsLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-gold"
                      animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <p className="text-white/80 text-sm font-medium tracking-wide">
                  Syncing reviews…
                </p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-2 sm:py-4 px-2">
                <div className="flex justify-center gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * s }}
                      className="text-2xl sm:text-3xl text-gold/50"
                      aria-hidden
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="font-heading text-xl sm:text-2xl font-semibold text-white mb-2">
                  Ratings will appear here
                </p>
                <p className="text-white/75 text-sm max-w-md mx-auto leading-relaxed">
                  We don&apos;t show a score until real clients have shared feedback. Be
                  the first to help others choose with confidence.
                </p>
              </div>
            ) : (
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              {/* Left — Overall Rating */}
              <div className="text-center sm:text-left">
                <div className="font-heading text-6xl font-bold text-white">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex gap-1 mt-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`text-xl ${s <= Math.round(averageRating) ? "text-gold" : "text-white/30"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-sm mt-2">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {/* Right — Rating Bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingDistribution[star - 1];
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-white/80 text-sm w-4">{star}</span>
                      <span className="text-gold text-sm">★</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + star * 0.1 }}
                          className="h-full bg-linear-to-r from-gold to-gold-light rounded-full"
                        />
                      </div>
                      <span className="text-white/60 text-xs w-6 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviewsLoading ? (
            <ApiAnimatedLoader message="Loading reviews…" />
          ) : (
            <>
          {reviewsError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-rose-100/80 bg-linear-to-r from-rose-50/95 via-white to-amber-50/50 px-5 py-4 shadow-sm"
            >
              <p className="text-sm text-rose-900/85 leading-relaxed max-w-2xl">
                {reviewsError}
              </p>
              <button
                type="button"
                onClick={() => {
                  setReviewsLoading(true);
                  void loadReviews();
                }}
                className="shrink-0 rounded-full border border-rose-200/90 bg-white px-5 py-2.5 text-sm font-semibold text-rose-900 shadow-sm hover:bg-rose-50/80 transition-colors"
              >
                Try again
              </button>
            </motion.div>
          )}

          {reviews.length > 0 ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                    activeFilter === s
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-muted border-gray-200 hover:border-gold/40 hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "latest" | "highest" | "lowest")
                }
                className="px-4 py-2 rounded-full border border-gray-200 text-sm text-primary bg-white outline-none focus:border-gold/50 cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-linear-to-r from-gold to-gold-light text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow text-sm whitespace-nowrap"
              >
                ✍️ Write a Review
              </motion.button>
            </div>
          </div>
          ) : (
            <div className="mb-12">
              <ReviewsListEmptyState onWrite={() => setShowForm(true)} />
            </div>
          )}

          {/* Review Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden mb-12"
              >
                <div className="relative rounded-2xl border border-gray-100 shadow-lg overflow-hidden bg-[linear-gradient(135deg,#fdf8f2_0%,#fef0e0_40%,#e8f5ee_100%)]">
                  <ApiLoaderOverlay
                    show={reviewSubmitting}
                    message="Posting your review…"
                  />
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-gold/5 blur-[80px]" />
                  <div className="absolute bottom-0 left-0 w-[180px] h-[180px] rounded-full bg-primary/5 blur-[60px]" />

                  <div className="relative p-8">
                    <h3 className="font-heading text-2xl font-bold text-primary mb-6">
                      Share Your Experience
                    </h3>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                      >
                        <span className="text-5xl block mb-4">🎉</span>
                        <h4 className="font-heading text-xl font-semibold text-primary mb-2">
                          Thank You for Your Review!
                        </h4>
                        <p className="text-muted">
                          Your feedback helps us serve you better.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {submitError && (
                          <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
                            {submitError}
                          </p>
                        )}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1.5">
                              Your Name *
                            </label>
                            <input
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1.5">
                              Your Role / Title
                            </label>
                            <input
                              value={formRole}
                              onChange={(e) => setFormRole(e.target.value)}
                              placeholder="Business Owner"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1.5">
                              Service Used *
                            </label>
                            <select
                              required
                              value={formService}
                              onChange={(e) => setFormService(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                            >
                              <option value="">Select a service</option>
                              {SERVICES.filter((s) => s !== "All").map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1.5">
                              Your Rating *
                            </label>
                            <StarRating
                              rating={formRating}
                              onRate={setFormRating}
                              interactive
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-primary mb-1.5">
                            Your Review *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={formText}
                            onChange={(e) => setFormText(e.target.value)}
                            placeholder="Tell us about your experience with Legal Notion..."
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all resize-none"
                          />
                        </div>

                        <div className="flex items-center gap-4">
                          <motion.button
                            type="submit"
                            disabled={reviewSubmitting}
                            whileHover={{ scale: reviewSubmitting ? 1 : 1.03 }}
                            whileTap={{ scale: reviewSubmitting ? 1 : 0.97 }}
                            className="px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-60"
                          >
                            {reviewSubmitting ? "Submitting…" : "Submit Review"}
                          </motion.button>
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-6 py-3 text-muted text-sm font-medium hover:text-primary transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {reviews.length > 0 && (
          <>
          {/* Reviews Grid */}
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6 items-start"
          >
            {paginatedReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/20 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <span className="text-white font-heading font-bold text-sm">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-primary font-semibold">{review.name}</p>
                      <p className="text-muted text-xs">{review.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted bg-gray-50 px-3 py-1 rounded-full">
                    {formatDate(review.date)}
                  </span>
                </div>

                <StarRating rating={review.rating} />

                <p className="text-muted leading-relaxed text-sm mt-4 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {review.service}
                  </span>
                  {review.replies.length > 0 && (
                    <button
                      onClick={() =>
                        setReplyingTo(replyingTo === review.id ? null : review.id)
                      }
                      className="text-xs font-medium text-muted hover:text-primary transition-colors flex items-center gap-1"
                    >
                      💬 {replyingTo === review.id ? "Hide" : "View Replies"}
                      <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                        {review.replies.length}
                      </span>
                    </button>
                  )}
                </div>

                {/* Replies Panel — hidden by default, scrollable */}
                <AnimatePresence>
                  {replyingTo === review.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="bg-gray-50/80 rounded-xl border border-gray-100 p-4">
                        <div className="max-h-48 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                          {review.replies.map((reply) => {
                            const isTeam = reply.name === "Legal Notion Team";
                            const initials = reply.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2);
                            return (
                              <motion.div
                                key={reply.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`pl-3 border-l-2 ${isTeam ? "border-gold/30" : "border-primary/20"}`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                      isTeam
                                        ? "bg-linear-to-br from-gold to-gold-light"
                                        : "bg-linear-to-br from-primary to-secondary"
                                    }`}
                                  >
                                    <span className="text-white text-[8px] font-bold">
                                      {initials}
                                    </span>
                                  </div>
                                  <span className="text-[11px] font-semibold text-primary">
                                    {reply.name}
                                  </span>
                                  {isTeam && (
                                    <span className="text-[8px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">
                                      TEAM
                                    </span>
                                  )}
                                  <span className="text-[10px] text-muted ml-auto">
                                    {formatDate(reply.date)}
                                  </span>
                                </div>
                                <p className="text-muted text-[11px] leading-relaxed">
                                  {reply.text}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {filteredReviews.length === 0 && reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50"
            >
              <span className="text-4xl block mb-4" aria-hidden>
                📭
              </span>
              <p className="text-muted text-lg font-medium">
                No reviews in this category yet.
              </p>
              <p className="text-muted text-sm mt-2 max-w-sm mx-auto">
                Try another filter or check back soon.
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? "bg-primary text-white shadow-md"
                      : "border border-gray-200 text-muted hover:border-gold/40 hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>

              <span className="ml-4 text-sm text-muted">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
          </>
          )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(224,133,48,0.1),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center px-4"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Had a Great Experience?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Your review helps others find trusted legal services. Share your
            story and help us grow.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => setShowForm(true), 500);
            }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg"
          >
            ✍️ Write Your Review
            <span>→</span>
          </motion.button>
        </motion.div>
      </section>
    </PageTransition>
  );
}
