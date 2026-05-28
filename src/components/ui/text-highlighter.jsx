"use client";

import { useEffect, useState, useRef } from "react";

export function TextHighlighter({
  type = "highlight", // "highlight" | "underline"
  color = "#3b82f6", // Default blue highlight
  duration = 0.8, // Duration in seconds
  delay = 0.2, // Delay in seconds
  children
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const animationStyle = isVisible
    ? {
        strokeDashoffset: 0,
        transition: `stroke-dashoffset ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
      }
    : {
        strokeDashoffset: 100
      };

  return (
    <span
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-block",
        whiteSpace: "nowrap"
      }}
    >
      {/* SVG Background Layer */}
      {type === "underline" && (
        <svg
          viewBox="0 0 100 15"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: 0,
            bottom: "-4px",
            width: "100%",
            height: "12px",
            pointerEvents: "none",
            overflow: "visible",
            zIndex: 1
          }}
        >
          {/* Double overlapping hand-drawn wavy lines */}
          <path
            d="M 2 6 C 30 9, 65 3, 98 8"
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="100"
            style={animationStyle}
          />
          <path
            d="M 5 10 C 35 12, 60 7, 95 9"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="100"
            style={{
              ...animationStyle,
              transitionDelay: `${delay + 0.12}s`
            }}
          />
        </svg>
      )}

      {type === "highlight" && (
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: "-2%",
            top: "10%",
            width: "104%",
            height: "85%",
            pointerEvents: "none",
            overflow: "visible",
            zIndex: 0 // Sits behind the text layer
          }}
        >
          {/* Thick hand-drawn style marker stroke */}
          <path
            d="M 2 10 C 35 7, 65 13, 98 10"
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            opacity="0.35"
            style={animationStyle}
          />
        </svg>
      )}

      {/* The Text Content */}
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
    </span>
  );
}
