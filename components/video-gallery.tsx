"use client"

import { useState, useEffect } from "react"
import { Play, X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

interface Video {
  id: string
  title: string
  category: string
  description?: string
}

interface VideoGalleryProps {
  videos: Video[]
}

// Helper function to get the best available thumbnail
const getThumbnailUrl = async (videoId: string): Promise<string> => {
  const qualities = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`,
  ]

  // Try to load each quality until one works
  for (const url of qualities) {
    try {
      const response = await fetch(url, { method: "HEAD" })
      if (response.ok) {
        return url
      }
    } catch (e) {
      // Continue to next quality
    }
  }

  // If all fail, return the default as a last resort
  return `/placeholder.svg?height=720&width=1280`
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Load thumbnails for all videos
  useEffect(() => {
    const loadThumbnails = async () => {
      setLoading(true)
      const thumbnailPromises = videos.map(async (video) => {
        const url = await getThumbnailUrl(video.id)
        return { id: video.id, url }
      })

      const results = await Promise.all(thumbnailPromises)
      const thumbnailMap = results.reduce(
        (acc, { id, url }) => {
          acc[id] = url
          return acc
        },
        {} as Record<string, string>,
      )

      setThumbnails(thumbnailMap)
      setLoading(false)
    }

    loadThumbnails()
  }, [videos])

  const openVideo = (videoId: string) => {
    setActiveVideo(videoId)
    document.body.style.overflow = "hidden"
  }

  const closeVideo = () => {
    setActiveVideo(null)
    document.body.style.overflow = "auto"
  }

  // Group videos by category
  const categories = [...new Set(videos.map((video) => video.category))]
  const videosByCategory = videos.reduce(
    (acc, video) => {
      if (!acc[video.category]) {
        acc[video.category] = []
      }
      acc[video.category].push(video)
      return acc
    },
    {} as Record<string, Video[]>,
  )

  // Filter videos by active category or show all if no category is selected
  const filteredVideos = activeCategory ? videos.filter((video) => video.category === activeCategory) : videos

  return (
    <div className="w-full">
      {/* Category Tabs - Desktop */}
      <div className="hidden md:flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Videos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Dropdown - Mobile */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md text-gray-700"
        >
          <span>{activeCategory || "All Videos"}</span>
          {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isFilterOpen && (
          <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
            <button
              onClick={() => {
                setActiveCategory(null)
                setIsFilterOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm ${
                activeCategory === null ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
              }`}
            >
              All Videos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setIsFilterOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  activeCategory === category ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured Video */}
      {filteredVideos.length > 0 && (
        <div className="mb-8 md:mb-12">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-400">Loading thumbnail...</span>
              </div>
            ) : (
              <>
                <img
                  src={thumbnails[filteredVideos[0].id] || "/placeholder.svg?height=720&width=1280"}
                  alt={filteredVideos[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                  <button
                    onClick={() => openVideo(filteredVideos[0].id)}
                    className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-red-600 flex items-center justify-center mb-4 md:mb-6 transform transition-transform hover:scale-110"
                  >
                    <Play className="h-7 w-7 md:h-10 md:w-10 text-white fill-current ml-1" />
                  </button>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{filteredVideos[0].title}</h3>
                  {filteredVideos[0].description && (
                    <p className="text-gray-200 max-w-2xl text-sm md:text-base">{filteredVideos[0].description}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filteredVideos.slice(1).map((video) => (
          <div
            key={video.id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
          >
            {/* Thumbnail with gradient overlay */}
            <div className="aspect-video cursor-pointer overflow-hidden" onClick={() => openVideo(video.id)}>
              <div className="relative h-full w-full">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <>
                    <img
                      src={thumbnails[video.id] || "/placeholder.svg?height=720&width=1280"}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-red-600 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-6 w-6 md:h-8 md:w-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Video info */}
            <div className="p-3 md:p-4 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">{video.title}</h4>
              {video.description && (
                <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3">{video.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {video.category}
                </span>
                <button
                  onClick={() => openVideo(video.id)}
                  className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Watch <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="absolute inset-0 bg-opacity-70" onClick={closeVideo}></div>
          <button
            className="absolute top-4 right-4 text-white p-2 hover:text-gray-300 focus:outline-none z-10 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            onClick={closeVideo}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-5xl aspect-video relative z-10 rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

