import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <img
                  src="/logo.png"
                  alt="Legal Notion"
                  className="w-full h-full object-cover scale-[2]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-xl font-bold leading-tight">
                  Legal Notion
                </span>
                <span className="text-[10px] uppercase tracking-[2.5px] leading-tight text-white/70">
                  The Notion of Legal Excellence
                </span>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Trusted legal counsel delivering exceptional results with
              integrity, precision, and unwavering commitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Blogs"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white/90 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-gold mb-4">
              Practice Areas
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Corporate Law</li>
              <li>Civil Litigation</li>
              <li>Intellectual Property</li>
              <li>Real Estate</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-gold mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <a
                  href="https://www.google.com/maps/search/Shree+Dhanlaxmi+Hanuman+Nagar+Wadarvadi+Pune+Maharashtra+411016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors inline-flex items-start gap-1.5"
                >
                  <span className="mt-0.5 shrink-0">📍</span>
                  <span>Shree Dhanlaxmi Hanuman Nagar, Wadarvadi, Pune, Maharashtra 411016</span>
                </a>
              </li>
              <li>info@legalnotion.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/75"
        >
          &copy; {new Date().getFullYear()} Legal Notion. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
