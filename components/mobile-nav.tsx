"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToSection = (id: string) => {
    setIsOpen(false)

    // Use setTimeout to ensure the mobile menu is closed before scrolling
    setTimeout(() => {
      const section = document.getElementById(id)
      if (section) {
        // Get the header height to offset the scroll position
        const headerHeight = document.querySelector("header")?.offsetHeight || 0

        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  const handleGalleryClick = () => {
    setIsOpen(false)
    router.push("/gallery")
  }

  const handleEventsClick = () => {
    setIsOpen(false)
    router.push("/events")
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-6 p-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("programs")}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              Programs
            </button>
            <button
              onClick={handleEventsClick}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              Our Impact
            </button>
            <button
              onClick={() => scrollToSection("media")}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              Media
            </button>
            <button
              onClick={handleGalleryClick}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-lg font-medium hover:text-blue-600 transition-colors w-full text-center"
            >
              Contact
            </button>
            <Link
              href="https://forms.gle/t8za3k7G4SXzQgqaA"
              target="_blank"
              className="bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:from-blue-700 hover:to-red-600 transition-colors mt-4 w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

