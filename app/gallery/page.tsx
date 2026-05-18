"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Search, X, ChevronDown, ChevronRight, ChevronUp, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";

// This function would be used to import all images from a directory
// In a production environment, you would replace this with your actual image data
const getGalleryImages = () => {
  // New photos first
  const newPhotos = Array.from({ length: 13 }, (_, i) => ({
    id: 100 + i + 1,
    src: `/images/gallery/newPhotos${i + 1}.jpeg`,
    alt: `New photo ${i + 1}`,
    category: "New Arrivals",
  }));

  // Existing images
  const imageStart = 14; // Starting image number
  const imageEnd = 56; // Ending image number

  const images = Array.from({ length: imageEnd - imageStart + 1 }, (_, i) => ({
    id: i + 1,
    src: `/images/gallery/image${imageStart + i}.webp`,
    alt: `Gallery image ${imageStart + i}`,
    category:
      (imageStart + i) % 5 === 0
        ? "Community Events"
        : (imageStart + i) % 5 === 1
        ? "Youth Programs"
        : (imageStart + i) % 5 === 2
        ? "Sports Activities"
        : (imageStart + i) % 5 === 3
        ? "Leadership Training"
        : "Senior Programs",
  }));

  const communityDevFiles = [
    "img.jpeg",
    "img2.jpeg",
    "img3.jpeg",
    "image2 (1).jpeg",
    "image2 (2).jpeg",
    "image2 (3).jpeg",
    "image2 (4).jpeg",
    "image2 (5).jpeg",
    "image2 (6).jpeg",
    "image2 (7).jpeg",
    "image2 (8).jpeg",
    "image2 (9).jpeg",
    "image2 (10).jpeg",
    "image2 (11).jpeg",
    "image2 (12).jpeg",
    "image2 (13).jpeg",
    "image2 (14).jpeg",
    "image2 (15).jpeg",
    "image2 (16).jpeg",
    "image2 (17).jpeg",
    "image2 (18).jpeg",
    "image2 (19).jpeg",
    "image2 (20).jpeg",
    "image2 (21).jpeg",
  ];

  const youthLeadershipFiles = [
    "mainImage.jpg",
    "img.jpeg",
    "imgg (1).jpg",
    "imgg (2).jpg",
    "imgg (3).jpg",
    "imgg (4).jpg",
    "imgg (5).jpg",
    "imgg (6).jpg",
    "imgg (7).jpg",
    "imgg (8).jpg",
    "imgg (9).jpg",
    "imgg (10).jpg",
    "imgg (11).jpg",
    "imgg (12).jpg",
    "imgg (13).jpg",
    "imgg (14).jpg",
    "imgg (15).jpg",
    "imgg (16).jpg",
    "imgg (17).jpg",
    "imgg (18).jpg",
    "imgg (19).jpg",
    "imgg (20).jpg",
    "imgg (21).jpg",
    "imgg (22).jpg",
    "imgg (23).jpg",
    "imgg (24).jpg",
    "imgg (25).jpg",
  ];

  const foodAndDrinksFiles = [
    "img1.jpeg",
    "img2.jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.22 PM.jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.22 PM (1).jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.22 PM (2).jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.23 PM.jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.23 PM (1).jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.23 PM (2).jpeg",
    "WhatsApp Image 2026-05-14 at 10.51.23 PM (3).jpeg",
  ];

  const communityDevImages = communityDevFiles.map((file, index) => ({
    id: 1000 + index,
    src: encodeURI(`/communityDev/${file}`),
    alt: `Community development photo ${index + 1}`,
    category: "Community Development",
  }));

  const youthLeadershipImages = youthLeadershipFiles.map((file, index) => ({
    id: 2000 + index,
    src: encodeURI(`/youthLeadership/${file}`),
    alt: `Youth leadership photo ${index + 1}`,
    category: "Youth Leadership Development",
  }));

  const foodAndDrinksImages = foodAndDrinksFiles.map((file, index) => ({
    id: 3000 + index,
    src: encodeURI(`/FandN/${file}`),
    alt: `Food and drinks photo ${index + 1}`,
    category: "Food and Drinks",
  }));

  return [
    ...communityDevImages,
    ...foodAndDrinksImages,
    ...youthLeadershipImages,
    ...newPhotos,
    ...images,
  ];
};

export default function GalleryPage() {
  const router = useRouter()
  const [galleryImages, setGalleryImages] = useState(getGalleryImages())
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imagesPerPage = 12

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
    // Simulate loading images
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter images based on search term and category
  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch =
      searchTerm === "" ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = activeCategory === null || image.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = [...new Set(galleryImages.map((img) => img.category))]

  // Paginate images
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage)
  const currentImages = filteredImages.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)

  const openLightbox = (index: number) => {
    const imageIndex = filteredImages.findIndex((img) => img.id === currentImages[index].id)
    setCurrentImage(imageIndex)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxOpen) {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") closeLightbox()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown as any)
    return () => window.removeEventListener("keydown", handleKeyDown as any)
  }, [lightboxOpen, currentImage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, activeCategory])

  return (
    <div className="min-h-screen bg-white" onKeyDown={handleKeyDown}>
      {/* Removed custom header, global Header is now used */}
      <main className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="inline-flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">PHOTO GALLERY</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">Moments of Hope: Our Journey in Photos</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              className="flex md:hidden items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-md w-full justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filter by Category{" "}
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {/* Categories (Desktop) */}
            <div className="hidden md:flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Categories (Mobile) */}
          {isFilterOpen && (
            <div className="mt-4 flex flex-wrap gap-2 md:hidden">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Stats */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <div>
            Showing {currentImages.length} of {filteredImages.length} images
          </div>
          {totalPages > 1 && (
            <div>
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center"
              >
                <ImageIcon className="h-10 w-10 text-gray-300" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            {currentImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {currentImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg hover:opacity-90 transition-opacity transform hover:-translate-y-1 duration-300 shadow-md cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end">
                      <div className="p-2 sm:p-3">
                        <p className="text-white text-xs sm:text-sm font-medium">{image.alt}</p>
                        <p className="text-gray-300 text-xs mt-1">{image.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No images found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setActiveCategory(null)
                  }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Calculate which page numbers to show
                let pageNum = i + 1
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="flex items-center px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                    aria-label={`Page ${totalPages}`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Back to Top Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
            Back to Top
          </button>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center touch-none">
          <button
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <button
            className="absolute left-2 sm:left-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>

          <div className="relative h-[70vh] sm:h-[80vh] w-[90vw] sm:w-[80vw] max-w-5xl">
            <Image
              src={filteredImages[currentImage].src || "/placeholder.svg"}
              alt={filteredImages[currentImage].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 80vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 sm:p-4 text-center">
              <p className="text-sm sm:text-base">{filteredImages[currentImage].alt}</p>
              <p className="text-xs text-gray-300 mt-1">{filteredImages[currentImage].category}</p>
              <p className="text-xs text-gray-400 mt-1">
                Image {currentImage + 1} of {filteredImages.length}
              </p>
            </div>
          </div>

          <button
            className="absolute right-2 sm:right-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>
      )}

      <footer className="bg-gradient-to-r from-blue-900 to-red-900 text-white py-8">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Coach John Leadership & Community Engagement Initiative
          </p>
          <Link href="/" className="inline-block mt-2 text-gray-300 hover:text-white transition-colors">
            Return to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

