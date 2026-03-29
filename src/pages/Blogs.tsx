import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

interface Post {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const allPosts: Post[] = [
  {
    category: "Corporate",
    title: "Navigating Mergers & Acquisitions in 2026",
    excerpt:
      "Key legal considerations every business owner should know before entering an M&A transaction in today's evolving market landscape.",
    date: "Mar 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    tags: ["Corporate", "M&A", "Business"],
  },
  {
    category: "IP Law",
    title: "Protecting Your Brand in the Digital Age",
    excerpt:
      "How trademark and copyright laws are adapting to emerging technologies and online platforms globally.",
    date: "Mar 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["IP Law", "Trademark", "Technology"],
  },
  {
    category: "Employment",
    title: "Remote Work Policies: Legal Frameworks",
    excerpt:
      "Understanding the legal implications of remote and hybrid work arrangements for modern employers.",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
    tags: ["Employment", "Remote Work", "Compliance"],
  },
  {
    category: "Real Estate",
    title: "Commercial Lease Negotiations: A Guide",
    excerpt:
      "Essential clauses and strategies for negotiating favorable commercial lease agreements in India.",
    date: "Mar 5, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    tags: ["Real Estate", "Leasing", "Commercial"],
  },
  {
    category: "Litigation",
    title: "Alternative Dispute Resolution Benefits",
    excerpt:
      "Why mediation and arbitration are becoming the preferred methods for resolving business disputes.",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    tags: ["Litigation", "Arbitration", "Mediation"],
  },
  {
    category: "Family Law",
    title: "Estate Planning Essentials for Families",
    excerpt:
      "Protect your family's future with these critical estate planning steps and important considerations.",
    date: "Feb 22, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848e968838?w=600&h=400&fit=crop",
    tags: ["Family Law", "Estate", "Planning"],
  },
  {
    category: "Corporate",
    title: "Startup Legal Checklist: What Founders Need",
    excerpt:
      "A comprehensive legal checklist every startup founder should follow before launching their business.",
    date: "Feb 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    tags: ["Corporate", "Startup", "Business"],
  },
  {
    category: "IP Law",
    title: "Patent Filing Process Simplified",
    excerpt:
      "Step-by-step guide to filing a patent in India — timelines, costs, and common pitfalls to avoid.",
    date: "Feb 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&h=400&fit=crop",
    tags: ["IP Law", "Patent", "Innovation"],
  },
  {
    category: "Litigation",
    title: "Understanding Civil Court Procedures in India",
    excerpt:
      "A practical overview of the civil litigation process — from filing to final judgment in Indian courts.",
    date: "Feb 5, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=400&fit=crop",
    tags: ["Litigation", "Civil Law", "Court"],
  },
  {
    category: "Employment",
    title: "Employee Rights Under Indian Labour Laws",
    excerpt:
      "Key protections and benefits every employee in India is entitled to under current labour legislation.",
    date: "Jan 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    tags: ["Employment", "Labour Law", "Rights"],
  },
  {
    category: "Real Estate",
    title: "RERA: Protecting Home Buyers in India",
    excerpt:
      "How the Real Estate Regulatory Authority safeguards buyers and brings transparency to property deals.",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1582407947092-409862f68b9e?w=600&h=400&fit=crop",
    tags: ["Real Estate", "RERA", "Property"],
  },
  {
    category: "Family Law",
    title: "Child Custody Laws: What Parents Must Know",
    excerpt:
      "Navigating custody disputes in India — legal framework, types of custody, and best interests of the child.",
    date: "Jan 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&h=400&fit=crop",
    tags: ["Family Law", "Custody", "Children"],
  },
];

const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));

const categoryColors: Record<string, string> = {
  Corporate: "bg-orange-50 text-orange-800",
  "IP Law": "bg-amber-50 text-amber-800",
  Employment: "bg-yellow-50 text-yellow-800",
  "Real Estate": "bg-rose-50 text-rose-800",
  Litigation: "bg-red-50 text-red-800",
  "Family Law": "bg-stone-100 text-stone-700",
};

const POSTS_PER_PAGE = 6;

export default function Blogs() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = allPosts;
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
  }, [search, activeTag]);

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
      <section className="pt-32 pb-20 bg-linear-to-br from-primary via-secondary to-accent relative overflow-hidden">
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
                        {allPosts
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
                              key={post.title}
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
                        {allPosts.filter(
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

      {/* Featured Post */}
      <section className="pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="group grid md:grid-cols-2 gap-0 bg-linear-to-br from-primary to-accent rounded-3xl relative overflow-hidden cursor-pointer shadow-lg"
          >
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
                alt="Featured blog"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-primary/60 to-transparent md:hidden" />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold mb-4">
                Featured
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                The Future of Legal Tech: AI and Automation in Law Practice
              </h2>
              <p className="text-white/90 leading-relaxed mb-6 text-sm">
                Exploring how artificial intelligence is transforming legal
                research, contract analysis, and case prediction — and what it
                means for the future of legal services.
              </p>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span>Mar 25, 2026</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </div>
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
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
                Try a different search term or clear the filters.
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
                      key={post.title}
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
