"use client";

import AwardsCarousel from "@/components/awards-carousel";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow py-12">
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-8">
          Awards & Recognition
        </h1>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Explore the awards and recognition we have received for our dedication
          and contributions to the community.
        </p>
        <div className="max-w-5xl mx-auto">
          <AwardsCarousel />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}