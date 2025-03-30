"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, X } from "lucide-react";
import type { Event } from "@/data/events";

interface EventsBannerProps {
  events: Event[];
}

export default function EventsBanner({ events }: EventsBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || events.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-blue-600 to-red-500 text-white py-4 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 hidden sm:block" />
            <div>
              <h3 className="font-bold text-lg">Upcoming Events</h3>
              <p className="text-sm text-white/90">
                Don&apos;t miss out on our latest community activities
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {events.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
              >
                <p className="font-medium">{event.title}</p>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <span>{event.displayDate}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
                <Link
                  href="/events"
                  className="flex items-center gap-1 text-xs font-medium mt-1 hover:underline"
                >
                  View details <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

          {events.length > 2 && (
            <Link
              href="/events"
              className="text-sm font-medium bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full"
            >
              View all events
            </Link>
          )}
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Dismiss events banner"
      >
        <X className="h-4 w-4" />
      </button>
    </section>
  );
}
