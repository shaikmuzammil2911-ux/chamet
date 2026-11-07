"use client";

import React, { useEffect, useState, useRef } from "react";

interface TypewriterNumberProps {
  value: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number; // total animation duration in ms
}

export const TypewriterNumber: React.FC<TypewriterNumberProps> = ({
  value,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1800,
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Extract numeric part vs non-numeric
          const match = value.match(/^([\d,.]+)(.*)$/);

          if (match) {
            const rawNumber = parseFloat(match[1].replace(/,/g, ""));
            const remainingSuffix = match[2] || "";
            const isDecimal = match[1].includes(".");
            const decimalPlaces = isDecimal
              ? match[1].split(".")[1].length
              : 0;

            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Smooth ease-out quad
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentNumber = rawNumber * easeOut;

              const formatted = isDecimal
                ? currentNumber.toFixed(decimalPlaces)
                : Math.floor(currentNumber).toString();

              setDisplayValue(`${formatted}${remainingSuffix}`);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(animate);
          } else {
            // Text typewriter effect (e.g. "Millions", "Global")
            let currentIndex = 0;
            const textToType = value;
            const charDelay = Math.max(50, Math.floor(duration / textToType.length));

            const interval = setInterval(() => {
              currentIndex++;
              setDisplayValue(textToType.substring(0, currentIndex));
              if (currentIndex >= textToType.length) {
                clearInterval(interval);
              }
            }, charDelay);
          }
        }
      },
      { threshold: 0.15 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {hasAnimated ? displayValue : "0"}
      {suffix}
    </span>
  );
};
