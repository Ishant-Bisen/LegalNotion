import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import FAQ from "../components/FAQ";

const services = [
  {
    icon: "🏢",
    title: "Business Incorporation (Pvt Ltd, LLP, OPC)",
    desc: "End-to-end setup for private limited companies, LLPs, and one-person companies — from name approval to ROC filings and post-incorporation compliance.",
    areas: ["Pvt Ltd incorporation", "LLP registration", "OPC & conversions"],
  },
  {
    icon: "⚖️",
    title: "Compliance & Regulatory Support",
    desc: "Ongoing regulatory filings, statutory registers, board documentation, and liaison with authorities so your entity stays audit-ready.",
    areas: ["ROC & MCA filings", "Secretarial compliance", "Regulatory advisory"],
  },
  {
    icon: "📄",
    title: "Contract Drafting & Review",
    desc: "Clear, enforceable agreements tailored to your deals — from founder arrangements to vendor and customer contracts.",
    areas: ["Commercial agreements", "NDAs & MSAs", "Employment & ESOP docs"],
  },
  {
    icon: "💡",
    title: "Intellectual Property (Trademarks & Copyrights)",
    desc: "Protection and enforcement for your brand and creative work across India, including filings, oppositions, and licensing.",
    areas: ["Trademark search & filing", "Copyright registration", "Licensing & assignments"],
  },
  {
    icon: "📈",
    title: "Fundraising & Due Diligence",
    desc: "Support through investment rounds: data room prep, term sheet review, cap table hygiene, and investor due diligence.",
    areas: ["Seed to Series A", "DD checklists", "SHA & SAFE review"],
  },
  {
    icon: "🔐",
    title: "Data Protection",
    desc: "Privacy policies, data processing agreements, and alignment with India’s data protection framework for products and internal processes.",
    areas: ["Privacy notices", "DPA / vendor terms", "DPDP readiness"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-linear-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,169,81,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            Our Expertise
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4 mb-6"
          >
            Practice Areas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/95 text-lg max-w-2xl mx-auto"
          >
            Corporate and regulatory support for founders and growing businesses —
            from incorporation to fundraising and data compliance.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(200,169,81,0.12)",
                }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-gold/20 transition-colors"
                  >
                    {s.icon}
                  </motion.div>

                  <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                    {s.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-5">
                    {s.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {s.areas.map((area) => (
                      <span
                        key={area}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Our Process
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3">
              How We Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Free initial case assessment" },
              { step: "02", title: "Strategy", desc: "Custom legal strategy development" },
              { step: "03", title: "Execution", desc: "Documents, filings, and negotiations" },
              { step: "04", title: "Resolution", desc: "Clear handover and ongoing support" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-linear-to-br from-gold to-gold-light text-primary font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold/20"
                >
                  {item.step}
                </motion.div>
                <h3 className="font-heading font-semibold text-primary text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <FAQ
        subtitle="Service FAQs"
        title="Questions About Our Services"
        items={[
          {
            question: "How do I know which legal service I need?",
            answer:
              "Start with a free consultation. We’ll map your stage — incorporation, contracts, compliance, IP, fundraising, or privacy — and recommend a focused plan.",
          },
          {
            question: "Do you work with startups and small businesses?",
            answer:
              "Yes. Our practice is built around founders and growing companies: entity setup, day-to-day contracts, regulatory upkeep, and investor readiness.",
          },
          {
            question: "What is your approach to intellectual property protection?",
            answer:
              "We focus on trademarks and copyrights that matter for your product and brand: clearance, filing, prosecution basics, and practical licensing or assignment clauses in your agreements.",
          },
          {
            question: "Do you offer ongoing legal retainer services?",
            answer:
              "Yes, we offer flexible retainer packages for businesses that need continuous support — contract reviews, compliance touchpoints, and priority access for fundraising or regulatory questions.",
          },
          {
            question: "How do you keep your service costs so low?",
            answer:
              "We leverage modern legal technology for research and case management, maintain a lean operational structure, and believe quality legal services should be accessible to all. This allows us to offer competitive rates in India.",
          },
          {
            question: "What happens after I engage your services?",
            answer:
              "After the initial consultation, we assign a dedicated attorney to your matter, share a clear scope and timeline, and keep you updated as filings and documents progress.",
          },
        ]}
      />
    </PageTransition>
  );
}
