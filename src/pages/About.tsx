import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const team = [
  {
    name: "Sarah Mitchell",
    role: "Managing Partner",
    bio: "20+ years in corporate law and mergers.",
    initials: "SM",
  },
  {
    name: "James Richardson",
    role: "Senior Partner",
    bio: "Expert in civil litigation and dispute resolution.",
    initials: "JR",
  },
  {
    name: "Elena Torres",
    role: "Associate Partner",
    bio: "Specializes in IP and technology law.",
    initials: "ET",
  },
  {
    name: "Michael Chang",
    role: "Senior Associate",
    bio: "Real estate and property law specialist.",
    initials: "MC",
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
      <section className="pt-32 pb-20 bg-linear-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,81,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mt-4 mb-6"
          >
            About Legal Notion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/95 text-lg max-w-2xl mx-auto"
          >
            Founded on the principles of justice and dedication, we have been
            serving clients with distinction for over four years.
          </motion.p>
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
                Championing Justice,{" "}
                <span className="text-gold">Empowering Clients</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                At Legal Notion, we believe that access to quality legal
                representation is a fundamental right. Our team of dedicated
                attorneys combines deep legal knowledge with a compassionate,
                client-centered approach.
              </p>
              <p className="text-muted leading-relaxed">
                We leverage cutting-edge legal research and technology to deliver
                efficient, effective outcomes. Every case we take is treated
                with the gravity and focus it deserves.
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

      {/* Team */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Our People
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mt-3">
              Meet the Team
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-2xl hover:shadow-gold/10 border border-gray-100 hover:border-gold/20 transition-all duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center"
                >
                  <span className="text-gold font-heading font-bold text-xl">
                    {member.initials}
                  </span>
                </motion.div>
                <h3 className="font-heading font-semibold text-primary text-lg">
                  {member.name}
                </h3>
                <p className="text-gold text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
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
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Let's Talk About Your Case
              </h2>
              <p className="text-white/95 mb-8 max-w-lg mx-auto">
                Reach out for a confidential, no-obligation consultation with
                one of our experienced attorneys.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:info@legalnotion.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-lg"
                >
                  Email Us
                </motion.a>
                <motion.a
                  href="tel:+15551234567"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
                >
                  Call (555) 123-4567
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
