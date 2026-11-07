"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalBackdropProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  badge?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  isOpen,
  onClose,
  title,
  badge,
  children,
  maxWidth = "2xl",
}) => {
  // Lock body scroll when modal is open and strictly restore on close/unmount
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow || "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0318]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className={`
              relative w-full ${maxWidthClasses[maxWidth]}
              bg-gradient-to-b from-[#1C0A38] to-[#120426]
              border border-purple-500/30 rounded-2xl md:rounded-3xl
              shadow-2xl shadow-purple-950/80
              p-5 sm:p-7 md:p-8
              z-10 max-h-[92vh] overflow-y-auto
              focus:outline-none
            `}
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF29D6] to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5 pb-3 border-b border-white/10">
              <div>
                {badge && (
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-bold rounded-full bg-brand-purple/30 text-purple-200 border border-brand-purple/50">
                    {badge}
                  </span>
                )}
                {title && (
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {title}
                  </h3>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 -mr-1 -mt-1 text-purple-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="relative">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
