import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { fetchBlogs } from "../lib/api/blogs";
import { mapBlogToCard, type BlogCardModel } from "../lib/api/mappers";
import {
  formatBlogsListError,
  shouldTreatPublicListAsEmpty,
} from "../lib/api/reviewsLoad";
import ApiAnimatedLoader from "../components/ApiAnimatedLoader";

const categoryColors: Record<string, string> = {
  Corporate: "bg-orange-50 text-orange-800",
  "IP Law": "bg-amber-50 text-amber-800",
  "Business Incorporation (Pvt Ltd, LLP, OPC)": "bg-emerald-50 text-emerald-900",
  "Compliance & Regulatory Support": "bg-sky-50 text-sky-900",
  "Contract Drafting & Review": "bg-violet-50 text-violet-900",
  "Intellectual Property (Trademarks & Copyrights)": "bg-amber-50 text-amber-900",
  "Fundraising & Due Diligence": "bg-teal-50 text-teal-900",
  "Data Protection": "bg-indigo-50 text-indigo-900",
  Compliance: "bg-sky-50 text-sky-900",
  Contracts: "bg-violet-50 text-violet-900",
  Fundraising: "bg-teal-50 text-teal-900",
  Litigation: "bg-red-50 text-red-800",
};

const POSTS_PER_PAGE = 6;

export default function Blogs() {
  const [posts, setPosts] = useState<BlogCardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const raw = await fetchBlogs();
        if (cancelled) return;
        const mapped = raw.map(mapBlogToCard).filter((p) => p.title);
        setPosts(mapped);
      } catch (e) {
        if (!cancelled) {
          setPosts([]);
          if (shouldTreatPublicListAsEmpty(e)) {
            setLoadError(null);
          } else {
            setLoadError(formatBlogsListError(e));
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))),
    [posts]
  );

  /** Featured uses posts[0]; list shows the rest (or nothing if only one article). */
  const postsForList = useMemo(() => {
    if (posts.length <= 1) return [];
    return posts.slice(1);
  }, [posts]);

  const filtered = useMemo(() => {
    let result = postsForList;
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [postsForList, search, activeTag]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-linear-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,81,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            Insights & Updates
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4 mb-6"
          >
            Legal Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/95 text-lg max-w-2xl mx-auto"
          >
            Stay informed with expert analysis, legal news, and practical
            guides from our attorneys.
          </motion.p>
        </div>
      </section>

      {/* Search & Tags */}
      <section className="py-6 border-b border-gray-100 sticky top-20 z-30 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div
              className="group relative flex-1 w-full sm:max-w-lg"
            >
              <span className="absolute left-4 top-[14px] text-muted text-sm z-10">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search blogs by title, topic, or tag..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm bg-light"
              />

              {/* Smart dropdown on hover / focus-within */}
              <div className="absolute left-0 right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-40">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-h-80 overflow-y-auto">
                  {/* Matching tags */}
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                    {search.trim() ? "Matching tags" : "Filter by tag"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(search.trim()
                      ? allTags.filter((t) =>
                          t.toLowerCase().includes(search.toLowerCase())
                        )
                      : allTags
                    ).length > 0 ? (
                      (search.trim()
                        ? allTags.filter((t) =>
                            t.toLowerCase().includes(search.toLowerCase())
                          )
                        : allTags
                      ).map((tag) => (
                        <motion.button
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTagClick(tag)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                            activeTag === tag
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-primary border-gray-200 hover:border-gold hover:text-gold"
                          }`}
                        >
                          {tag}
                        </motion.button>
                      ))
                    ) : (
                      <p className="text-muted text-xs">No matching tags</p>
                    )}
                  </div>

                  {/* Matching blog titles when searching */}
                  {search.trim() && (
                    <>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-4 mb-2">
                        Matching blogs
                      </p>
                      <div className="flex flex-col gap-1">
                        {posts
                          .filter(
                            (p) =>
                              p.title.toLowerCase().includes(search.toLowerCase()) ||
                              p.category.toLowerCase().includes(search.toLowerCase()) ||
                              p.tags.some((t) =>
                                t.toLowerCase().includes(search.toLowerCase())
                              )
                          )
                          .slice(0, 5)
                          .map((post) => (
                            <button
                              key={post.id || post.title}
                              onClick={() => {
                                setSearch(post.title);
                                setPage(1);
                              }}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-light transition-colors"
                            >
                              <img
                                src={post.image}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-primary truncate">
                                  {post.title}
                                </p>
                                <p className="text-xs text-muted">
                                  {post.category} • {post.readTime}
                                </p>
                              </div>
                            </button>
                          ))}
                        {posts.filter(
                          (p) =>
                            p.title.toLowerCase().includes(search.toLowerCase()) ||
                            p.category.toLowerCase().includes(search.toLowerCase()) ||
                            p.tags.some((t) =>
                              t.toLowerCase().includes(search.toLowerCase())
                            )
                        ).length === 0 && (
                          <p className="text-muted text-xs px-3 py-2">
                            No matching blogs
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activeTag && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {activeTag}
                  <button
                    onClick={() => { setActiveTag(null); setPage(1); }}
                    className="hover:text-gold"
                  >
                    ✕
                  </button>
                </span>
              )}
              {(search || activeTag) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveTag(null);
                    setPage(1);
                  }}
                  className="text-sm text-gold font-medium hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {loadError && (
        <div className="bg-amber-50 border-b border-amber-100 text-amber-900 text-center text-sm py-3 px-4">
          {loadError}
        </div>
      )}

      {/* Featured Post - first item from API */}
      {!loading && posts.length > 0 && (
        <section className="pt-16 pb-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group grid md:grid-cols-2 gap-0 bg-linear-to-br from-primary to-accent rounded-3xl relative overflow-hidden shadow-lg"
            >
              <div className="relative h-64 md:h-auto">
                <img
                  src={posts[0].image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-primary/60 to-transparent md:hidden" />
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold mb-4">
                  Featured
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                  {posts[0].title}
                </h2>
                <p className="text-white/90 leading-relaxed mb-6 text-sm line-clamp-4">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span>{posts[0].date}</span>
                  <span>•</span>
                  <span>{posts[0].readTime}</span>
                </div>
              </div>
              <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <ApiAnimatedLoader message="Fetching articles…" />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-4xl mb-4">📭</p>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                No blogs found
              </h3>
              <p className="text-muted text-sm">
                {posts.length === 0
                  ? "No articles are available yet."
                  : "Try a different search term or clear the filters."}
              </p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTag}-${search}-${page}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {paged.map((post, i) => (
                    <motion.article
                      key={post.id || post.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 cursor-pointer overflow-hidden relative flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                        <span
                          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                            categoryColors[post.category] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-muted text-xs mb-3">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="font-heading text-lg font-semibold text-primary mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary/5 text-primary/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <motion.span
                          className="text-gold text-sm font-medium flex items-center gap-1 mt-auto"
                          whileHover={{ x: 4 }}
                        >
                          Read article
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                            }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </div>

                      <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                        page === i + 1
                          ? "bg-primary text-white shadow-lg"
                          : "border border-gray-200 text-primary hover:bg-primary/5"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Stay Updated
            </span>
            <h2 className="font-heading text-3xl font-bold text-primary mt-3 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted mb-8">
              Get the latest legal insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-accent transition-all text-sm"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
