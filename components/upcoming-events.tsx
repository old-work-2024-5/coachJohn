"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ExternalLink, FileText } from 'lucide-react'
import EventFlyer from "./event-flyer"
import type { Event } from "@/lib/events"

interface UpcomingEventsProps {
  events: Event[]
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const [activeFlyer, setActiveFlyer] = useState<{src: string, title: string} | null>(null)
  
  if (events.length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center mb-6">
        <div className="h-10 w-1 bg-gradient-to-b from-blue-600 to-red-500 mr-3"></div>
        <h3 className="text-xl font-bold text-blue-700">UPCOMING EVENTS</h3>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {event.image && (
              <div className="h-48 relative">
                <Image 
                  src={event.image || "/placeholder.svg"} 
                  alt={event.title} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  New Event
                </div>
              </div>
            )}
            
            <div className="p-4">
              <h4 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {event.flyerSrc && (
                  <button
                    onClick={() => setActiveFlyer({src: event.flyerSrc!, title: event.title})}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex-1"
                  >
                    <FileText className="h-4 w-4" /> View Flyer
                  </button>
                )}
                
                {event.registrationUrl && (
                  <Link
                    href={event.registrationUrl}
                    className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-red-600 transition-colors flex-1 justify-center"
                  >
                    Register <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Flyer Modal */}
      {activeFlyer && (
        <EventFlyer 
          flyerSrc={activeFlyer.src} 
          eventTitle={activeFlyer.title} 
          onClose={() => setActiveFlyer(null)} 
        />
      )}
    </div>
  )
}

