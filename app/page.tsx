"use client";

import type React from "react";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react"; // Import the ChevronRight icon
import Header from "@/components/header";
import Footer from "@/components/footer";
import EventsBanner from "@/components/events-banner";
import {
  HeroSection,
  PartnersSection,
  AboutSection,
  ProgramsSection,
  ImpactSection,
  FandNSection,
  MediaSection,
  GallerySection,
  ContactSection,
} from "@/components/home-sections";
import { getFeaturedEvents } from "@/data/events";

export default function Home() {
  // Ensure the page starts at the top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    // Prevent default behavior immediately
    e.preventDefault();

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (section) {
        // Get the header height to offset the scroll position
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;

        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  };

  // Get featured events from our data file
  const featuredEvents = getFeaturedEvents();

  return (
    <div className="min-h-screen bg-white">
      {/* <Header scrollToSection={scrollToSection} /> Removed duplicate header */}
      <HeroSection scrollToSection={scrollToSection} />
      {featuredEvents.length > 0 && <EventsBanner events={featuredEvents} />}
      <AboutSection />
      <PartnersSection />
      <ProgramsSection />
      <ImpactSection />
      <FandNSection />
      {/* AWARDS & RECOGNITION Section */}
      <div id="awards-recognition" className="py-12 bg-gray-100">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">
          Awards & Recognition
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-6">
          We are proud to be recognized for our contributions to the community.
          Our achievements reflect the dedication and hard work of our team and
          supporters.
        </p>
        <div className="text-center">
          <a
            href="/awards"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <span className="mr-2">View Awards & Recognition</span>
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>
      </div>
      <MediaSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}