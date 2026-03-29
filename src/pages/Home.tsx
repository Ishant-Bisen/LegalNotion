import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import FAQ from "../components/FAQ";

const stats = [
  { value: "50+", label: "Cases Handled" },
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Legal Experts" },
  { value: "99%", label: "Client Satisfaction" },
];

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

const reviews = [
  {
    name: "Rajesh Mehta",
    role: "Business Owner",
    text: "Legal Notion handled our corporate restructuring flawlessly. Their attention to detail and strategic thinking saved us both time and money.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Startup Founder",
    text: "From IP registration to contract drafting, they guided us through every legal hurdle. Truly a partner you can rely on for the long term.",
    rating: 5,
  },
  {
    name: "Amit Kapoor",
    role: "Real Estate Developer",
    text: "Their real estate team is exceptional. They closed a complex multi-party deal that other firms couldn't. Highly recommend their expertise.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "HR Director",
    text: "We engaged them for employment law compliance and were impressed by how thorough and proactive they were. Outstanding service throughout.",
    rating: 4,
  },
  {
    name: "Vikram Singh",
    role: "Tech Entrepreneur",
    text: "Legal Notion's IP team protected our innovations at every stage. Their knowledge of technology law is unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Ananya Desai",
    role: "Family Client",
    text: "During a difficult family matter, they showed both legal brilliance and genuine compassion. I felt supported and well-represented at all times.",
    rating: 5,
  },
];

function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = reviews.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  const visibleReviews = [
    reviews[current],
    reviews[(current + 1) % totalPages],
    reviews[(current + 2) % totalPages],
  ];

  return (
    <section className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visibleReviews.map((review) => (
                  <div
                    key={review.name}
                    className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/20 transition-all duration-500 flex flex-col"
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

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-2 sm:-left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-2 sm:-right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
          >
            →
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-gold"
                  : "w-2.5 bg-gray-300 hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-primary via-secondary to-accent">
        {/* Animated background elements */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-gold text-sm font-medium">
                  Trusted Legal Partners
                </span>
              </motion.div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Justice Served with{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-gold-light">
                  Excellence
                </span>
              </h1>

              <p className="text-white/95 text-lg leading-relaxed mb-10 max-w-lg">
                We combine years of legal expertise with a modern,
                client-first approach. Your rights deserve nothing less than the
                finest representation.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <NavLink
                    to="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Our Services
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </NavLink>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <NavLink
                    to="/about"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
                  >
                    Learn More
                  </NavLink>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-gold/20 to-transparent rounded-3xl blur-3xl" />
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10">
                  <div className="grid grid-cols-2 gap-8">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="text-center"
                      >
                        <motion.div
                          className="font-heading text-4xl font-bold text-white mb-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-white/80 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-dark"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden bg-[linear-gradient(135deg,#fdf8f2_0%,#fef0e0_40%,#e8f5ee_100%)]">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3">
              Legal Solutions You Can Trust
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
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
      <section className="py-24 bg-linear-to-br from-dark via-primary to-secondary relative overflow-hidden">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Innovation Meets Law
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
                Powered by Latest Technology,{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-gold-light">
                  Driven by Results
                </span>
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-8">
                At Legal Notion, we leverage cutting-edge technology and
                AI-powered tools to research, strategize, and resolve your legal
                matters faster and more efficiently — all while ensuring complete
                client satisfaction at every step.
              </p>

              <div className="space-y-5">
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
                    className="flex gap-4 items-start group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Animated Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-linear-to-br from-gold/20 to-gold-light/10 rounded-3xl blur-3xl" />

                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10">
                  {/* Satisfaction meter */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="font-heading text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gold to-gold-light"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    >
                      99%
                    </motion.div>
                    <p className="text-white/80 text-sm mt-2">
                      Client Satisfaction Rate
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "AI Research", icon: "🧠", value: "10x Faster" },
                      { label: "Case Tracking", icon: "📱", value: "24/7 Live" },
                      { label: "Data Security", icon: "🛡️", value: "256-bit SSL" },
                      { label: "Resolution", icon: "⚡", value: "50% Quicker" },
                    ].map((badge, i) => (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="bg-white/10 rounded-xl p-4 text-center border border-white/5 hover:border-gold/20 transition-all duration-300"
                      >
                        <span className="text-2xl block mb-2">{badge.icon}</span>
                        <p className="text-white font-semibold text-sm">
                          {badge.value}
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">
                          {badge.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom CTA strip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex items-center justify-center gap-2 text-gold text-sm font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AI Assistant Active — Try it now
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <ReviewsCarousel />

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
      <section className="py-24 bg-linear-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,169,81,0.1),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center px-4"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-white/95 text-lg mb-10">
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
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg"
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
