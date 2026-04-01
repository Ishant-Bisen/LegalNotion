import { motion, AnimatePresence } from "framer-motion";

type ApiAnimatedLoaderProps = {
  message?: string;
  /** Tighter vertical padding for overlays */
  compact?: boolean;
};

/**
 * Heavily animated loader for API fetch/submit — brand greens + gold.
 */
export default function ApiAnimatedLoader({
  message = "Loading…",
  compact = false,
}: ApiAnimatedLoaderProps) {
  const orbitDots = [0, 1, 2, 3, 4, 5];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 ${compact ? "py-6" : "py-16 min-h-[280px]"}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Soft glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-75"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.7, 0.95, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer ring — clockwise */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold border-r-gold-light/80 shadow-[0_0_20px_rgba(224,133,48,0.25)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />

        {/* Mid ring — counter */}
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-transparent border-b-secondary border-l-primary/90"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner dashed pulse */}
        <motion.div
          className="absolute inset-6 rounded-full border border-dashed border-gold/50"
          animate={{ rotate: 360, scale: [1, 1.06, 1] }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Center core */}
        <motion.div
          className="relative z-10 w-11 h-11 rounded-full bg-linear-to-br from-gold via-gold-light to-accent shadow-lg"
          animate={{
            scale: [1, 1.12, 1],
            boxShadow: [
              "0 8px 24px rgba(27,63,49,0.25)",
              "0 12px 36px rgba(224,133,48,0.45)",
              "0 8px 24px rgba(27,63,49,0.25)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute z-10 w-11 h-11 rounded-full border-2 border-white/40"
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting dots */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          {orbitDots.map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary shadow-sm"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-50px)`,
              }}
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bouncing bars */}
      <div className="flex items-end gap-1.5 h-8">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-linear-to-t from-primary to-gold origin-bottom"
            initial={{ height: 8 }}
            animate={{
              height: [8, 28, 10, 24, 8],
              opacity: [0.5, 1, 0.6, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Label + shimmer line */}
      <div className="flex flex-col items-center gap-3 max-w-xs text-center">
        <motion.p
          className="text-sm font-semibold text-primary tracking-wide"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {message}
        </motion.p>
        <div className="h-1 w-48 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full w-1/3 rounded-full bg-linear-to-r from-transparent via-gold to-transparent"
            animate={{ x: ["-100%", "280%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

type ApiLoaderOverlayProps = {
  show: boolean;
  message?: string;
  className?: string;
};

/** Frosted overlay with centered loader — parent must be `relative`. */
export function ApiLoaderOverlay({
  show,
  message,
  className = "",
}: ApiLoaderOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`absolute inset-0 z-30 flex items-center justify-center rounded-[inherit] bg-white/80 backdrop-blur-md ${className}`}
        >
          <ApiAnimatedLoader message={message} compact />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
