"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Calendar, Clock, MapPin, Download, ExternalLink } from "lucide-react"
import { getActiveEvents, type Event } from "@/data/events"
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading events data
    setIsLoading(true)
    const activeEvents = getActiveEvents()
    setEvents(activeEvents)

    if (activeEvents.length > 0) {
      setSelectedEvent(activeEvents[0])
    }

    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Removed custom header, global Header is now used */}
      <main className="container px-4 py-8 md:px-6 md:py-12 flex-grow">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="inline-flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">UPCOMING EVENTS</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">Join us for these exciting community activities</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No upcoming events at this time.</p>
            <p className="text-gray-500 mt-2">Please check back soon for new events!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Event List Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="font-bold text-lg mb-4 text-gray-900">All Events</h2>
                <div className="space-y-2">
                  {events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedEvent?.id === event.id
                          ? "bg-gradient-to-r from-blue-600 to-red-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm opacity-80">{event.displayDate}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Details and Flyer */}
            <div className="md:col-span-2">
              {selectedEvent && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Event Details */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
                    <p className="text-gray-700 mb-6">{selectedEvent.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Date</p>
                          <p className="text-gray-700">{selectedEvent.displayDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Time</p>
                          <p className="text-gray-700">{selectedEvent.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">Location</p>
                          <p className="text-gray-700">{selectedEvent.location}</p>
                        </div>
                      </div>
                    </div>

                    {selectedEvent.registrationUrl && (
                      <Link
                        href={selectedEvent.registrationUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-3 rounded-md font-medium hover:from-blue-700 hover:to-red-600 transition-colors w-full justify-center"
                      >
                        Register Now <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>

                  {/* Event Flyer */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Event Flyer</h3>

                    {selectedEvent.flyerImage ? (
                      <div className="space-y-4">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={selectedEvent.flyerImage || "/placeholder.svg"}
                            alt={`${selectedEvent.title} flyer`}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <a
                          href={selectedEvent.flyerImage}
                          download
                          target="_blank"
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors w-full justify-center"
                          rel="noreferrer"
                        >
                          Download Flyer <Download className="h-4 w-4" />
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
                        <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                        <p>No flyer available for this event.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-blue-900 to-red-900 text-white py-8 mt-auto">
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

