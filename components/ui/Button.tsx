import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "gold" | "purple" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "gold",
  size = "md",
  href,
  onClick,
  className = "",
  withArrow = false,
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 relative group overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0624]";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm md:text-base px-6 py-2.5 gap-2",
    lg: "text-base md:text-lg px-8 py-3.5 gap-2.5",
  };

  const variantStyles = {
    gold: "bg-gradient-to-r from-[#FFC83D] via-[#FFE259] to-[#FFA751] text-[#26005F] font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] border border-amber-200/50",
    purple:
      "bg-gradient-to-r from-[#8500FF] via-[#A832FF] to-[#FF29D6] text-white shadow-lg shadow-purple-900/40 hover:shadow-brand-pink/50 hover:scale-[1.02] active:scale-[0.98] border border-white/20",
    outline:
      "bg-transparent text-white border border-white/30 hover:border-brand-pink hover:bg-white/10 active:scale-[0.98]",
    glass:
      "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/40 shadow-sm active:scale-[0.98]",
    ghost:
      "bg-transparent text-purple-200 hover:text-white hover:bg-white/5 active:scale-[0.98]",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
      )}
      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />
    </>
  );

  const classes = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

