"use client";

import React, { useState, useEffect } from "react";

interface FuzzyTextProps {
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
  fuzzRange?: number;
  glitchMode?: boolean;
  glitchInterval?: number;
  glitchDuration?: number;
  className?: string;
  children: React.ReactNode;
}

export default function FuzzyText({
  baseIntensity = 0.2,
  hoverIntensity = 0.8,
  enableHover = true,
  fuzzRange = 20,
  glitchMode = true,
  glitchInterval = 4000,
  glitchDuration = 200,
  className = "",
  children,
}: FuzzyTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!glitchMode) return;
    
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, glitchDuration);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [glitchMode, glitchInterval, glitchDuration]);

  const currentIntensity = isHovered && enableHover ? hoverIntensity : baseIntensity;
  
  const glitchStyles: React.CSSProperties = isGlitching
    ? {
        textShadow: `
          -${fuzzRange}px 0px 0px rgba(255, 0, 0, 0.7),
          ${fuzzRange}px 0px 0px rgba(0, 255, 255, 0.7)
        `,
        transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
        opacity: Math.random() * 0.2 + 0.8,
      }
    : {
        textShadow: `
          0 0 ${currentIntensity * 10}px rgba(0, 0, 0, ${currentIntensity * 0.5}),
          0 0 ${currentIntensity * 20}px rgba(0, 0, 0, ${currentIntensity * 0.3})
        `,
        transition: "text-shadow 0.3s ease, transform 0.1s ease-in-out",
      };

  return (
    <div
      className={`inline-block w-full text-center relative focus:outline-none ${className}`}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
      style={{ userSelect: "none" }}
    >
      <div 
        className="font-black tracking-tighter text-9xl md:text-[12rem] lg:text-[16rem] leading-none"
        style={glitchStyles}
      >
        {children}
      </div>
      
      {isGlitching && (
        <>
          <div
            className="absolute top-0 left-0 w-full font-black tracking-tighter text-9xl md:text-[12rem] lg:text-[16rem] leading-none text-red-500 opacity-50 mix-blend-multiply"
            style={{ 
              transform: `translate(-${fuzzRange}px, ${Math.random() * 4 - 2}px)`,
              clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`
            }}
            aria-hidden="true"
          >
            {children}
          </div>
          <div
            className="absolute top-0 left-0 w-full font-black tracking-tighter text-9xl md:text-[12rem] lg:text-[16rem] leading-none text-cyan-500 opacity-50 mix-blend-screen"
            style={{ 
              transform: `translate(${fuzzRange}px, ${Math.random() * 4 - 2}px)`,
              clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`
            }}
            aria-hidden="true"
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
