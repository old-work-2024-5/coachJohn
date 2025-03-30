"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/mobile-nav";

interface HeaderProps {
  scrollToSection?: (id: string) => (e: React.MouseEvent) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  const pathname = usePathname(); // Get the current path

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Image - Replace with your actual logo */}
          <div className="relative h-14 w-52">
            <Image src="/logo.webp" alt="Coach John Logo" fill className="object-contain" priority />
            {/* Fallback text in case image fails to load */}
            <span className="sr-only">COACH JOHN</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {/* Links to sections */}
          <Link
            href={pathname === "/" ? "#about" : "/#about"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            onClick={pathname === "/" && scrollToSection ? scrollToSection("about") : undefined}
          >
            About
          </Link>
          <Link
            href={pathname === "/" ? "#programs" : "/#programs"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            onClick={pathname === "/" && scrollToSection ? scrollToSection("programs") : undefined}
          >
            Programs
          </Link>
          <Link href="/events" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Events
          </Link>
          <Link
            href={pathname === "/" ? "#impact" : "/#impact"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            onClick={pathname === "/" && scrollToSection ? scrollToSection("impact") : undefined}
          >
            Our Impact
          </Link>
          <Link
            href={pathname === "/" ? "#media" : "/#media"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            onClick={pathname === "/" && scrollToSection ? scrollToSection("media") : undefined}
          >
            Media
          </Link>
          <Link
            href={pathname === "/" ? "#gallery" : "/#gallery"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            onClick={pathname === "/" && scrollToSection ? scrollToSection("gallery") : undefined}
          >
            Gallery
          </Link>
          <Link
            href={pathname === "/" ? "#contact" : "/#contact"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            onClick={pathname === "/" && scrollToSection ? scrollToSection("contact") : undefined}
          >
            Contact
          </Link>
          <Link
            href="https://forms.gle/t8za3k7G4SXzQgqaA"
            target="_blank"
            className="bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-red-600 transition-colors"
          >
            Register
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}