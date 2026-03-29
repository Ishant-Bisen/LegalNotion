import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Blogs", path: "/blogs" },
  { label: "Reviews", path: "/reviews" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-primary" : "text-white";
  const subtitleColor = scrolled ? "text-muted" : "text-white/80";
  const iconColor = scrolled ? "#1b3f31" : "#ffffff";
  const pillBg = scrolled
    ? "bg-primary/5 border-gold/20"
    : "bg-white/10 border-white/20";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        } ${mobileOpen ? "max-md:opacity-20" : "max-md:opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-16 h-16 shrink-0 perspective-distant"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.div
                  className="relative w-full h-full transform-3d"
                  whileHover={{ rotateY: 180 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center backface-hidden">
                    <img
                      src="/logo.png"
                      alt="Legal Notion"
                      className="w-[280%] h-[280%] max-w-none object-contain translate-y-[5%] drop-shadow-md"
                    />
                  </div>

                  <div className="absolute inset-x-1.5 inset-y-2.5 rounded-md bg-linear-to-br from-gold to-gold-light shadow-md flex items-center justify-center transform-[rotateY(180deg)] backface-hidden">
                    <span className="font-heading text-2xl font-semibold text-primary">
                      L
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              <div className="flex flex-col justify-center">
                <span
                  className={`font-heading text-xl font-bold tracking-tight leading-tight group-hover:text-gold transition-colors duration-300 ${textColor}`}
                >
                  Legal Notion
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[3px] leading-tight ${subtitleColor}`}
                >
                  The Notion of Legal Excellence
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} className="relative">
                  {({ isActive }) => (
                    <motion.div
                      className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-gold"
                          : scrolled
                            ? "text-primary hover:text-primary"
                            : "text-white hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}

                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className={`absolute inset-0 ${pillBg} border rounded-full -z-10`}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "60%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  )}
                </NavLink>
              ))}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/about"
                  className="ml-4 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-accent transition-all duration-300"
                >
                  Get in Touch
                </NavLink>
              </motion.div>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <IconButton
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ color: iconColor, transition: "color 0.5s" }}
              >
                <motion.div
                  animate={{ rotate: mobileOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </IconButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-white shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full pt-6 px-6">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 pb-5 border-b border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Legal Notion"
                    className="w-[280%] h-[280%] max-w-none object-contain translate-y-[5%]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-heading text-lg font-bold leading-tight text-primary">
                    Legal Notion
                  </span>
                  <span className="text-[10px] uppercase tracking-[2.5px] leading-tight text-muted">
                    The Notion of Legal Excellence
                  </span>
                </div>
              </motion.div>

              <div className="mt-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 px-4 text-lg font-medium border-b border-gray-100 transition-all duration-300 ${
                        isActive
                          ? "text-gold border-gold/30 bg-gold/5"
                          : "text-primary hover:text-primary hover:pl-6 hover:bg-primary/5"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-8"
              >
                <NavLink
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-6 py-3 bg-primary text-white font-semibold rounded-full"
                >
                  Get in Touch
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
