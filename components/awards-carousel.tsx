"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample awards images - replace with your actual images
const awardsImages = [
  { id: 1, src: "/images/image15.webp", alt: "Award 1" },
  { id: 2, src: "/images/image16.webp", alt: "Award 2" },
]

export default function AwardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? awardsImages.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === awardsImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto py-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6">
        Awards & Recognition
      </h2>
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {awardsImages.map((image) => (
            <div
              key={image.id}
              className="min-w-full flex justify-center items-center bg-white p-4"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={250} // Uniform width
                height={150} // Uniform height
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}