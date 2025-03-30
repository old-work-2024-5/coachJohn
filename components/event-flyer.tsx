"use client"

import { X } from "lucide-react"
import Image from "next/image"

interface EventFlyerProps {
  flyerSrc: string
  eventTitle: string
  onClose: () => void
}

export default function EventFlyer({ flyerSrc, eventTitle, onClose }: EventFlyerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative z-10 bg-white rounded-xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg text-gray-900">{eventTitle}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close flyer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          <div className="relative aspect-[2/3] mx-auto">
            <Image src={flyerSrc || "/placeholder.svg"} alt={`${eventTitle} flyer`} fill className="object-contain" />
          </div>
        </div>

        <div className="p-4 border-t flex justify-between">
          <a
            href={flyerSrc}
            download
            target="_blank"
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            rel="noreferrer"
          >
            Download Flyer
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

