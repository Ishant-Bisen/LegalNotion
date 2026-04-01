import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import PageTransition from "../components/PageTransition";

/** Themes from our founding story — used below the hero. */
const storyPillars = [
  {
    title: "Simple, not intimidating",
    desc: "Legal support shouldn’t feel complicated, slow, or scary—especially when you’re building something new.",
  },
  {
    title: "Built for how founders work",
    desc: "We saw teams lose hours on compliance, get unclear advice, or skip steps—not from lack of care, but because the system wasn’t built for them.",
  },
  {
    title: "So we changed the model",
    desc: "Clear guidance, practical processes, and counsel that respects your pace—from first incorporation to scale.",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Integrity",
    desc: "We uphold the highest ethical standards in every case we handle.",
  },
  {
    icon: "🤝",
    title: "Client First",
    desc: "Your goals and interests are at the center of everything we do.",
  },
  {
    icon: "💎",
    title: "Excellence",
    desc: "We pursue superior results through meticulous preparation and expertise.",
  },
  {
    icon: "🔒",
    title: "Confidentiality",
    desc: "Your information is safeguarded with the utmost discretion.",
  },
];

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-linear-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,81,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4 mb-8 max-w-4xl mx-auto text-pretty leading-tight"
          >
            We simplify legal for those building the future
          </motion.h1>
          <div className="max-w-3xl mx-auto space-y-6 text-left sm:text-center">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/95 text-lg sm:text-xl leading-relaxed text-pretty"
            >
              LegalNotion was started with a simple belief—legal support
              shouldn&apos;t feel complicated, slow, or intimidating, especially
              for startups.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white/90 text-base sm:text-lg leading-relaxed text-pretty"
            >
              We saw founders spending countless hours trying to understand
              compliance, struggling with unclear legal advice, or avoiding
              important legal steps altogether. Not because they didn&apos;t
              care—but because the system wasn&apos;t built for them.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-white text-lg sm:text-xl font-semibold leading-relaxed text-pretty"
            >
              So, we decided to change that.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story pillars — same narrative, scannable on the page */}
      <section className="py-20 sm:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Why we&apos;re here
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mt-3 text-pretty">
              The same belief runs through everything we do at LegalNotion
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {storyPillars.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-md hover:border-gold/25 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-heading font-semibold text-primary text-lg mb-3">
                  {block.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed text-pretty">
                  {block.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3 mb-6">
                Legal that fits{" "}
                <span className="text-gold">how you build</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                When we said we&apos;d change how legal feels for founders, we
                meant it: today LegalNotion focuses on clear guidance, practical
                processes, and counsel that respects your pace—whether you&apos;re
                incorporating, fundraising, or scaling.
              </p>
              <p className="text-muted leading-relaxed">
                We combine sound legal judgment with modern tools so compliance
                and contracts don&apos;t slow you down. Every engagement is built
                around transparency, responsiveness, and outcomes you can act on.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-md hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h4 className="font-heading font-semibold text-primary mb-1 text-sm">
                    {v.title}
                  </h4>
                  <p className="text-muted text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* People & careers — no placeholder bios; real profiles can be added when available */}
      <section className="py-24 bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Our People
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3 mb-6">
              Work With Us
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              LegalNotion is built by advocates and operators who care about
              startups and growing businesses—not just filings on a shelf. We
              are always interested in hearing from talented legal professionals
              who share that mindset.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <NavLink
                  to="/careers"
                  className="inline-flex px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  Apply on Careers
                </NavLink>
              </motion.div>
              <motion.a
                href="mailto:info@legalnotion.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
              >
                Email us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-primary to-accent rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,169,81,0.15),transparent_60%)]" />
            <div className="relative">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4 text-pretty">
                Let&apos;s talk about what you&apos;re building
              </h2>
              <p className="text-white/95 mb-8 max-w-lg mx-auto leading-relaxed text-pretty">
                Whether you&apos;re at idea stage or scaling, we&apos;re here to
                make legal straightforward—not a bottleneck. Reach out for a
                confidential, no-obligation conversation.
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="mailto:info@legalnotion.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-lg"
                >
                  Email Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
