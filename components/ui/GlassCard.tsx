import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  glowColor?: "purple" | "pink" | "blue" | "gold";
  gradientBorder?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glowOnHover = true,
  glowColor = "purple",
  gradientBorder = true,
  onClick,
}) => {
  const glowClasses = {
    purple: "hover:shadow-[0_0_35px_-5px_rgba(133,0,255,0.45)] hover:border-brand-purple/60",
    pink: "hover:shadow-[0_0_35px_-5px_rgba(255,41,214,0.45)] hover:border-brand-pink/60",
    blue: "hover:shadow-[0_0_35px_-5px_rgba(23,107,255,0.45)] hover:border-brand-blue/60",
    gold: "hover:shadow-[0_0_35px_-5px_rgba(255,200,61,0.45)] hover:border-brand-gold/60",
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl md:rounded-3xl
        bg-gradient-to-b from-white/[0.08] to-white/[0.02]
        backdrop-blur-xl
        border ${
          gradientBorder
            ? "border-white/10"
            : "border-white/5"
        }
        transition-all duration-300
        ${glowOnHover ? glowClasses[glowColor] : ""}
        ${onClick ? "cursor-pointer active:scale-[0.99]" : ""}
        ${className}
      `}
    >
      {/* Subtle top inner highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-t-2xl" />
      {children}
    </div>
  );
};

