import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  FileText,
  Lightbulb,
  Scale,
  Shield,
  TrendingUp,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import FAQ from "../components/FAQ";

const services: {
  icon: LucideIcon;
  title: string;
  desc: string;
  areas: string[];
}[] = [
  {
    icon: Building2,
    title: "Business Incorporation (Pvt Ltd, LLP, OPC)",
    desc: "End-to-end setup for private limited companies, LLPs, and one-person companies - from name approval to ROC filings and post-incorporation compliance.",
    areas: ["Pvt Ltd incorporation", "LLP registration", "OPC & conversions"],
  },
  {
    icon: Scale,
    title: "Compliance & Regulatory Support",
    desc: "Ongoing regulatory filings, statutory registers, board documentation, and liaison with authorities so your entity stays audit-ready.",
    areas: ["ROC & MCA filings", "Secretarial compliance", "Regulatory advisory"],
  },
  {
    icon: FileText,
    title: "Contract Drafting & Review",
    desc: "Clear, enforceable agreements tailored to your deals - from founder arrangements to vendor and customer contracts.",
    areas: ["Commercial agreements", "NDAs & MSAs", "Employment & ESOP docs"],
  },
  {
    icon: Lightbulb,
    title: "Intellectual Property (Trademarks & Copyrights)",
    desc: "Protection and enforcement for your brand and creative work across India, including filings, oppositions, and licensing.",
    areas: ["Trademark search & filing", "Copyright registration", "Licensing & assignments"],
  },
  {
    icon: TrendingUp,
    title: "Fundraising & Due Diligence",
    desc: "Support through investment rounds: data room prep, term sheet review, cap table hygiene, and investor due diligence.",
    areas: ["Seed to Series A", "DD checklists", "SHA & SAFE review"],
  },
  {
    icon: Shield,
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
            Corporate and regulatory support for founders and growing businesses  - 
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
            {services.map((s) => {
              const ServiceIcon = s.icon;
              return (
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
                    className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors"
                  >
                    <ServiceIcon
                      className="h-8 w-8 text-gold"
                      strokeWidth={1.65}
                      aria-hidden
                    />
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
            );
            })}
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
            question: "How do I know which service I need first?",
            answer:
              "Tell us your stage: idea-only, incorporating, already operating, raising funds, or scaling compliance. We’ll prioritise - usually entity setup (Pvt Ltd / LLP / OPC), then contracts and GST/compliance basics, then trademark if you’re building a brand. One conversation maps the sequence.",
          },
          {
            question: "Do you handle company registration and trademarks together?",
            answer:
              "Yes. Incorporation (name approval, MoA/AoA, PAN, opening compliance) and trademark search, filing, and basic copyright work are core offerings. We often run them in parallel once the company name and brand direction are clear.",
          },
          {
            question: "Do you work with startups and SMEs across India?",
            answer:
              "Yes. Founders and small teams are our main focus: incorporation, ROC filings, contracts, Startup India / MSME-related documentation where relevant, and investor-ready paperwork - not a court-first litigation practice.",
          },
          {
            question: "How do you approach IP (trademarks and copyrights)?",
            answer:
              "We focus on what protects your go-to-market: trademark clearance and filing, class strategy, and copyright for assets that need it. Agreements can include licensing or assignment language so your deals stay clean.",
          },
          {
            question: "Do you offer retainers for ongoing compliance and contracts?",
            answer:
              "Yes - flexible retainers for regular contract reviews, compliance touchpoints, board/secretarial documentation, and priority support around fundraising or regulatory questions.",
          },
          {
            question: "How can I contact you?",
            answer:
              "Email info@legalnotion.in, use Get in Touch / About on the site, or WhatsApp via our on-site link. We respond on email and WhatsApp on business days.",
          },
        ]}
      />
    </PageTransition>
  );
}
