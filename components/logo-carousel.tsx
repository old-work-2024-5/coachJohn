"use client";

import type React from "react";

import { useRef, useState } from "react";
import Image from "next/image";

interface LogoCarouselProps {
  logos: {
    src: string;
    alt: string;
  }[];
  speed?: number; // Speed in seconds for one complete loop
}

export default function LogoCarousel({
  logos = [],
  speed = 30,
}: LogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // If no logos, don't render anything
  if (logos.length === 0) {
    return null;
  }

  // Create enough copies to ensure a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  // Mouse events for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setIsAutoScrolling(false); // Pause auto-scrolling
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);

    // Change cursor style
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Reset cursor style
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    // Resume auto-scrolling after a short delay
    setTimeout(() => setIsAutoScrolling(true), 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    // Prevent default behavior to avoid text selection during drag
    e.preventDefault();

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setIsAutoScrolling(false); // Pause auto-scrolling
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Resume auto-scrolling after a short delay
    setTimeout(() => setIsAutoScrolling(true), 1000);
  };

  return (
    <div className="w-full">
      {/* Logo container with overflow */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-hide cursor-grab"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* This is the actual scrolling content */}
        <div
          className={`flex items-center justify-center gap-12 px-12 ${
            isAutoScrolling ? "animate-marquee" : ""
          }`}
          style={{
            width: "max-content",
            animationDuration: `${speed}s`,
            animationPlayState: isAutoScrolling ? "running" : "paused",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="flex-shrink-0 h-20 w-auto flex items-center justify-center px-6 transition-all duration-500 transform hover:scale-110 md:h-24"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width={140}
                  height={70}
                  className="max-h-full w-auto object-contain"
                  draggable="false" // Prevent image dragging to improve UX
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
