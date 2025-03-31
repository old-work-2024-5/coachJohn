"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

interface VideoFeatureProps {
  videoId: string
  title: string
  description: string
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

export default function VideoFeature({ videoId, title, description }: VideoFeatureProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Load the best available thumbnail
  useEffect(() => {
    const loadThumbnail = async () => {
      setLoading(true)
      const url = await getThumbnailUrl(videoId)
      setThumbnailUrl(url)
      setLoading(false)
    }

    loadThumbnail()
  }, [videoId])

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      {!isPlaying ? (
        <div className="relative aspect-video">
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400">Loading thumbnail...</span>
            </div>
          ) : (
            <>
              <Image
                src={thumbnailUrl || `/placeholder.svg?height=720&width=1280`}
                alt={title}
                className="w-full h-full object-cover"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="h-20 w-20 rounded-full bg-red-600 flex items-center justify-center mb-6 transform transition-transform hover:scale-110"
                >
                  <Play className="h-10 w-10 text-white fill-current ml-1" />
                </button>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-200">{description}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  )
}

