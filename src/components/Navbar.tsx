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
  { label: "Careers", path: "/careers" },
];

/** Mobile drawer: main links (Careers is a dedicated CTA below). */
const mobileMenuLinks = navItems.filter((item) => item.path !== "/careers");

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-primary" : "text-white";
  const subtitleColor = scrolled ? "text-muted" : "text-white/95";
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
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        } ${mobileOpen ? "max-md:opacity-20" : "max-md:opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-0 items-center justify-between gap-2.5 sm:gap-3 md:gap-6 lg:gap-8 min-w-0 py-1.5 sm:py-2">
            {/* Logo — compact bar; zoom keeps mark visible in smaller frame */}
            <NavLink
              to="/"
              className="flex items-center gap-2 sm:gap-2.5 group min-w-0 flex-1 pr-1 md:flex-none md:min-w-0 md:shrink md:pr-3 lg:pr-5"
            >
              <motion.div
                className="h-14 w-14 shrink-0 perspective-distant sm:h-15 sm:w-15"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.div
                  className="relative h-full w-full transform-3d"
                  whileHover={{ rotateY: 180 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl flex items-center justify-center backface-hidden">
                    <img
                      src="/logo.png"
                      alt="Legal Notion"
                      className="w-[220%] h-[220%] max-w-none object-contain translate-y-[4%] drop-shadow-md"
                    />
                  </div>

                  <div className="absolute inset-1.5 sm:inset-2 rounded-md bg-linear-to-br from-gold to-gold-light shadow-md flex items-center justify-center transform-[rotateY(180deg)] backface-hidden">
                    <span className="font-heading text-lg font-semibold text-primary sm:text-xl">
                      L
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              <div className="flex min-w-0 flex-col justify-center">
                <span
                  className={`font-heading text-base font-bold tracking-tight leading-tight group-hover:text-gold transition-colors duration-300 truncate sm:text-lg ${textColor}`}
                >
                  Legal Notion
                </span>
                <span
                  className={`text-[8px] uppercase leading-snug wrap-break-word max-w-42 tracking-[1.5px] sm:max-w-48 sm:text-[9px] sm:tracking-[2px] md:max-w-44 lg:max-w-52 md:text-[10px] md:tracking-[3px] xl:max-w-[18rem] 2xl:max-w-none ${subtitleColor}`}
                >
                  The Notion of Legal Excellence
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden shrink-0 md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} className="relative">
                  {({ isActive }) => (
                    <motion.div
                      className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 lg:px-4 ${
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
                  className="ml-2 px-4 py-2 text-[13px] font-semibold text-white bg-primary rounded-full shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg lg:ml-3 lg:px-5 lg:text-sm"
                >
                  Get in Touch
                </NavLink>
              </motion.div>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden shrink-0 ml-1">
              <IconButton
                size="small"
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
            <div className="flex flex-col h-full min-h-0 px-5 pt-5">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex shrink-0 items-center gap-2.5 border-b border-gray-100 pb-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src="/logo.png"
                    alt="Legal Notion"
                    className="w-[220%] h-[220%] max-w-none object-contain translate-y-[4%]"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center">
                  <span className="font-heading text-base font-bold leading-tight text-primary">
                    Legal Notion
                  </span>
                  <span className="text-[9px] uppercase leading-tight tracking-[2px] text-muted">
                    The Notion of Legal Excellence
                  </span>
                </div>
              </motion.div>

              <nav
                className="mt-4 flex-1 min-h-0 overflow-y-auto overscroll-contain -mx-2 px-2"
                aria-label="Mobile"
              >
                {mobileMenuLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-3.5 px-4 text-lg font-medium border-b border-gray-100 transition-all duration-300 ${
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
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="shrink-0 mt-4 pt-4 border-t border-gray-100 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-3"
              >
                <NavLink
                  to="/careers"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block text-center px-6 py-3 border-2 font-semibold rounded-full transition-colors ${
                      isActive
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-primary text-primary hover:bg-primary/5"
                    }`
                  }
                >
                  Careers
                </NavLink>
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
