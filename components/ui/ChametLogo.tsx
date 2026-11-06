import React from "react";
import Link from "next/link";

interface ChametLogoProps {
  size?: "sm" | "md" | "lg";
  showCompanyName?: boolean;
  className?: string;
}

export const ChametLogo: React.FC<ChametLogoProps> = ({
  size = "md",
  showCompanyName = true,
  className = "",
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-purple/50 rounded-lg p-1 transition-all ${className}`}
      aria-label="ManaVerse Technologies Pvt. Ltd. - Chamet Home"
    >
      {/* Chamet Creature Icon Badge */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#8500FF] via-[#FF29D6] to-[#176BFF] p-0.5 shadow-lg shadow-purple-900/40 group-hover:shadow-brand-pink/50 group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full bg-[#1A0938] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-transparent" />
          
          {/* Chamet Signature Icon SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-4/5 h-4/5 text-white fill-current filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Rounded Octopus/Mascot shape */}
            <path
              d="M50 12 C30 12, 18 27, 18 48 C18 59, 21 68, 25 76 C28 82, 32 86, 38 86 C42 86, 45 82, 47 77 C48 74, 52 74, 53 77 C55 82, 58 86, 62 86 C68 86, 72 82, 75 76 C79 68, 82 59, 82 48 C82 27, 70 12, 50 12 Z"
              fill="white"
            />
            {/* Center Circle Cutout (Chamet Eye) */}
            <circle cx="50" cy="46" r="16" fill="#8500FF" />
            <circle cx="50" cy="46" r="8" fill="white" />
          </svg>
        </div>
      </div>

      {/* Brand Text & Company Divider */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 leading-tight">
        <span
          className={`font-extrabold tracking-tight text-white group-hover:text-brand-pink transition-colors font-sans ${textSizes[size]}`}
        >
          Chamet
        </span>

        {showCompanyName && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block w-[1px] h-6 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-purple-200/90 group-hover:text-white transition-colors">
                ManaVerse
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-purple-300/60 uppercase tracking-widest -mt-0.5">
                Technologies Pvt. Ltd.
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
