export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Format: "YYYY-MM-DD" for sorting purposes
  displayDate: string; // Format: "July 15-20, 2024" for display
  time: string;
  location: string;
  registrationUrl?: string;
  featured: boolean; // Whether to show in the featured events banner
  active: boolean; // Whether the event is active and should be displayed
  flyerImage?: string; // Path to the flyer image, relative to /public
  endDate?: string; // Optional end date for multi-day events (YYYY-MM-DD)
}

// This is your events database - add new events here
export const events: Event[] = [
  {
    id: "summer-basketball-2024",
    title: "Summer Basketball Camp",
    description: "Join us for a week of basketball skills development, teamwork, and fun! Open to youth ages 8-14.",
    date: "2024-07-15",
    displayDate: "July 15-20, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "West Hill Community Center",
    registrationUrl: "https://forms.gle/t8za3k7G4SXzQgqaA",
    featured: true,
    active: true,
    flyerImage: "/flyers/summer-basketball-camp-2024.jpg",
    endDate: "2024-07-20"
  },
  {
    id: "leadership-workshop-2024",
    title: "Community Leadership Workshop",
    description: "A one-day intensive workshop focusing on community leadership skills, problem-solving, and project planning.",
    date: "2024-08-05",
    displayDate: "August 5, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Scarborough Town Centre",
    registrationUrl: "https://forms.gle/t8za3k7G4SXzQgqaA",
    featured: true,
    active: true,
    flyerImage: "/flyers/leadership-workshop-2024.jpg"
  },
  {
    id: "community-festival-2024",
    title: "Community Festival",
    description: "Join us for a day of celebration, connection, and fun as we come together to honor the diversity and strength of our community.",
    date: "2024-09-10",
    displayDate: "September 10, 2024",
    time: "11:00 AM - 6:00 PM",
    location: "West Hill Community Park",
    registrationUrl: "https://forms.gle/t8za3k7G4SXzQgqaA",
    featured: false,
    active: true,
    flyerImage: "/flyers/community-festival-2024.jpg"
  },
  {
    id: "seniors-program-ongoing",
    title: "Seniors Engagement Program",
    description: "Weekly sessions designed to enrich the lives of seniors through activities that promote physical health, mental well-being, and social connection.",
    date: "2024-06-04", // First session date
    displayDate: "Tuesdays & Thursdays",
    time: "10:00 AM - 12:00 PM",
    location: "West Hill Community Center, Room 103",
    registrationUrl: "https://forms.gle/t8za3k7G4SXzQgqaA",
    featured: false,
    active: true,
    flyerImage: "/flyers/seniors-program-2024.jpg"
  }
];

// Helper functions to work with events
export function getActiveEvents() {
  const now = new Date();
  return events
    .filter(event => event.active)
    .filter(event => {
      // If event has an end date, check if it's in the past
      if (event.endDate) {
        return new Date(event.endDate) >= now;
      }
      // Otherwise check if the event date is in the past
      return new Date(event.date) >= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getFeaturedEvents() {
  return getActiveEvents().filter(event => event.featured);
}

export function getEventById(id: string) {
  return events.find(event => event.id === id);
}

