"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react"

// Sample gallery images - replace with your actual images
const galleryImages = [
  { id: 101, src: "/images/gallery/newPhotos1.jpeg", alt: "New photo 1" },
  { id: 102, src: "/images/gallery/newPhotos2.jpeg", alt: "New photo 2" },
  { id: 103, src: "/images/gallery/newPhotos3.jpeg", alt: "New photo 3" },
  { id: 104, src: "/images/gallery/newPhotos4.jpeg", alt: "New photo 4" },
  { id: 105, src: "/images/gallery/newPhotos5.jpeg", alt: "New photo 5" },
  { id: 106, src: "/images/gallery/newPhotos6.jpeg", alt: "New photo 6" },
  { id: 107, src: "/images/gallery/newPhotos7.jpeg", alt: "New photo 7" },
  { id: 108, src: "/images/gallery/newPhotos8.jpeg", alt: "New photo 8" },
  { id: 109, src: "/images/gallery/newPhotos9.jpeg", alt: "New photo 9" },
  { id: 110, src: "/images/gallery/newPhotos10.jpeg", alt: "New photo 10" },
  { id: 111, src: "/images/gallery/newPhotos11.jpeg", alt: "New photo 11" },
  { id: 112, src: "/images/gallery/newPhotos12.jpeg", alt: "New photo 12" },
  { id: 113, src: "/images/gallery/newPhotos13.jpeg", alt: "New photo 13" },
  { id: 1, src: "/images/community2.webp", alt: "Community event" },
  { id: 2, src: "/images/youth-program.webp", alt: "Youth program" },
  { id: 3, src: "/images/sports.webp", alt: "Sports activity" },
  { id: 4, src: "/images/leadership.webp", alt: "Leadership training" },
  { id: 5, src: "/images/seniors-program.webp", alt: "Seniors program" },
  { id: 6, src: "/images/community.webp", alt: "Community gathering" },
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center"
            >
              <ImageIcon className="h-8 w-8 text-gray-300" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.slice(0, 6).map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity transform hover:-translate-y-1 duration-300 shadow-md"
              onClick={() => openLightbox(index)}
            >
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white p-3 text-xs sm:text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <button
            className="absolute left-2 sm:left-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>

          <div className="relative h-[70vh] sm:h-[80vh] w-[90vw] sm:w-[80vw] max-w-5xl">
            <Image
              src={galleryImages[currentImage].src || "/placeholder.svg"}
              alt={galleryImages[currentImage].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 80vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 sm:p-4 text-center">
              <p className="text-sm sm:text-base">{galleryImages[currentImage].alt}</p>
            </div>
          </div>

          <button
            className="absolute right-2 sm:right-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>
      )}
    </div>
  )
}

