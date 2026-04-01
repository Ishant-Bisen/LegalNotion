import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappChatUrl } from "../lib/whatsapp";

const href = whatsappChatUrl();

export default function WhatsAppConnect() {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setShowTip(true), 800);
    const hide = window.setTimeout(() => setShowTip(false), 5200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-19 right-6 z-50 bg-white shadow-lg rounded-lg px-3 py-2 pointer-events-none max-w-[200px]"
          >
            <p className="text-xs font-medium text-gray-800 leading-snug">
              Connect on WhatsApp — we&apos;re one tap away
            </p>
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white shadow-sm rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Connect on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.738 3.052 9.376L1.056 31.2l6.04-1.94A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.286 2.1-3.15 2.154-.796.05-1.54.376-5.186-1.1-4.396-1.776-7.178-6.27-7.398-6.562-.214-.29-1.76-2.352-1.76-4.486 0-2.134 1.114-3.186 1.51-3.62.39-.428.856-.536 1.142-.536.286 0 .57.004.82.014.264.012.618-.1.966.738.356.858 1.214 2.952 1.32 3.168.108.214.178.468.036.752-.142.29-.214.468-.428.72-.214.25-.45.558-.642.748-.214.214-.436.446-.188.876.25.428 1.108 1.828 2.38 2.962 1.634 1.458 3.012 1.91 3.44 2.124.428.214.678.178.928-.108.25-.286 1.07-1.248 1.356-1.676.286-.428.57-.356.964-.214.392.142 2.5 1.178 2.928 1.392.428.214.714.322.82.5.108.178.108 1.028-.284 2.128z" />
        </svg>
      </motion.a>
    </>
  );
}
