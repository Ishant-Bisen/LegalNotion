import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "Common Questions",
  items,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-[linear-gradient(135deg,#fdf8f2_0%,#fef0e0_40%,#e8f5ee_100%)]">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold-light/8 blur-[80px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {subtitle}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3 mb-5 leading-snug">
              {title}
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Can't find what you're looking for? Reach out to us directly and
              we'll be happy to help.
            </p>
            <motion.a
              href="mailto:info@legalnotion.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Contact Us <span>→</span>
            </motion.a>
          </motion.div>

          {/* Accordion */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`rounded-2xl border overflow-hidden transition-all duration-400 ${
                    isOpen
                      ? "bg-white shadow-xl shadow-gold/8 border-gold/25"
                      : "bg-white/70 shadow-md border-white/80 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-xs font-bold mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-linear-to-br from-gold to-gold-light text-primary shadow-sm"
                          : "bg-primary/8 text-primary/50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-heading font-semibold text-[15px] leading-snug flex-1 transition-colors duration-300 ${
                        isOpen ? "text-primary" : "text-primary/85"
                      }`}
                    >
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`text-lg shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 font-medium ${
                        isOpen
                          ? "bg-linear-to-br from-gold to-gold-light text-primary shadow-sm"
                          : "bg-primary/8 text-primary/40"
                      }`}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pl-17">
                          <div className="w-10 h-[3px] bg-linear-to-r from-gold to-gold-light rounded-full mb-3" />
                          <p className="text-muted leading-relaxed text-sm">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
