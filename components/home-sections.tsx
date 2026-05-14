"use client";

import type React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import VideoFeature from "@/components/video-feature";
import LogoCarousel from "@/components/logo-carousel";
import VideoGallery from "@/components/video-gallery";
import Gallery from "@/components/gallery";

// Consolidated all separate section components into a single file

export function HeroSection({
  scrollToSection,
}: {
  scrollToSection: (id: string) => (e: React.MouseEvent) => void;
}) {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-700 to-red-500 text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero-bg.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container relative z-10 px-4 md:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
          Coach John Leadership & Community Engagement Initiative
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
          Delivering enriching experiences to foster a vibrant, positive
          community for all.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://forms.gle/t8za3k7G4SXzQgqaA"
            target="_blank"
            className="bg-white text-blue-700 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Register for a Program
          </Link>
          <Link
            href="#contact"
            className="border border-white text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-white/10 transition-colors"
            onClick={scrollToSection("contact")}
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" onClick={scrollToSection("about")}>
          <ChevronDown className="h-8 w-8 text-white" />
        </Link>
      </div>
    </section>
  );
}

export function PartnersSection() {
  // Partner logos are now properly referenced from the partners directory
  const partnerLogos = [
    { src: "/images/partners/partner2-logo.webp", alt: "Partner 2" },
    { src: "/images/partners/partner3-logo.webp", alt: "Partner 3" },
    { src: "/images/partners/partner1-logo.webp", alt: "Partner 1" },
    { src: "/images/partners/partner4-logo.webp", alt: "Partner 4" },
    { src: "/images/partners/partner5-logo.webp", alt: "Partner 5" },
    { src: "/images/partners/partner6-logo.webp", alt: "Partner 6" },
    { src: "/images/partners/partner7-logo.webp", alt: "Partner 7" },
    { src: "/images/partners/partner8-logo.webp", alt: "Partner 8" },
    { src: "/images/partners/partner9-logo.webp", alt: "Partner 9" },
    { src: "/images/partners/partner10-logo.webp", alt: "Partner 10" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-red-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            OUR PARTNERS
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Collaborating with these amazing organizations to create positive
            change in our community
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <LogoCarousel logos={partnerLogos} speed={30} />
        </div>

        <div className="text-center">
          <p className="text-gray-600 italic">
            Together, we can achieve more than any of us could accomplish alone.
          </p>
          <div className="mt-6">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  const headerHeight =
                    document.querySelector("header")?.offsetHeight || 0;
                  const elementPosition =
                    contactSection.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - headerHeight;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Interested in partnering with us? <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">ABOUT US</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">Our Mission</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <p className="text-gray-700 mb-4">
                Coach John Leadership and Community Engagement Initiative is a
                community-driven organization dedicated to promoting wellness,
                inclusion, and respect. We are deeply committed to enhancing the
                lives of individuals in equity-seeking communities across the
                Greater Toronto Area (GTA).
              </p>
              <p className="text-gray-700">
                Our efforts are concentrated on fostering a culture of sports,
                nurturing youth leadership, and actively engaging seniors to
                cultivate a supportive, dynamic community for all.
              </p>
            </div>
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/about-img.webp"
                alt="About Coach John"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-lg border-l-4 border-blue-600 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-700">
              Nestled in West Hill, Toronto, Canada, Coach John Leadership and
              Community Engagement Initiative champions a range of
              transformative programs across Toronto. Our vision is to create an
              empowered, interconnected community where every person is inspired
              to reach their full potential, contributing to a more inclusive,
              healthy, and vibrant society.
            </p>
          </div>
          <PhilosophySection />
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const philosophyItems = [
    "Genuine Passion for People's Well-being",
    "Community as Family",
    "Promoting Unity, Healing, and Joy",
    "Respect as the Cornerstone",
    "Building Friendships Over Mastery",
    "Empowerment Through Engagement",
    "Inclusivity and Diversity",
    "Continuous Growth and Learning",
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">Our Philosophy</h3>
      <ul className="grid gap-3 md:grid-cols-2">
        {philosophyItems.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-red-500"></div>
            <p className="text-gray-700">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="py-16 bg-gradient-to-r from-blue-50 to-red-50"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            CORE PROGRAMS
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Our mission is brought to life through a multifaceted approach
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <ProgramCard
            title="Sports & Active Living"
            icon="lightning"
            description="We champion the integration of sports and physical activity into daily life, offering programs that are
              accessible to all, regardless of financial background. Our initiatives are designed to encourage active
              living, promote physical health, and build team spirit."
          />
          <ProgramCard
            title="Youth Leadership & Community Impact"
            icon="users"
            description="Our focus on youth leadership aims to empower young individuals with the skills, confidence, and
              opportunities to lead impactful community projects. Through mentorship, workshops, and hands-on
              activities, we inspire youth to become proactive agents of change."
          />
          <ProgramCard
            title="Seniors Engagement Initiative"
            icon="clock"
            description="Recognizing the invaluable role of seniors in our community, we actively work to engage them through a
              variety of programs. These initiatives are designed to combat isolation, foster intergenerational
              connections, and encourage active participation in community life."
          />
        </div>

        {/* Featured Program Video */}
        <div className="mt-16 mb-8">
          <VideoFeature
            videoId="n9B8smPDif0"
            title="2023 March Break Camp"
            description="See our youth programs in action during our popular March Break Camp"
          />
        </div>

        <FeaturedPrograms />
      </div>
    </section>
  );
}

function ProgramCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  let IconComponent;

  switch (icon) {
    case "lightning":
      IconComponent = Zap;
      break;
    case "users":
      IconComponent = Users;
      break;
    case "clock":
      IconComponent = Clock;
      break;
    default:
      IconComponent = Zap;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300">
      <div className="h-12 w-12 bg-gradient-to-r from-blue-100 to-red-100 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function FeaturedPrograms() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-1 bg-gradient-to-b from-blue-600 to-red-500 mr-3"></div>
            <h3 className="text-xl font-bold text-blue-700">
              YOUTH LEADERS IN TRAINING PROGRAM
            </h3>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden mb-4">
            <Image
              src="/images/youth-program.webp"
              alt="Youth Leaders Program"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-700 font-medium mb-4">
            Registration Now Open for Inaugural Leaders in Training Program for
            Teens!
          </p>
          <p className="text-gray-700 mb-4">
            We are thrilled to announce that registration is now open for our
            inaugural Leaders in Training Program for teens aged 13 to 17.
            Starting on July 3rd, 2024, we will be hosting this exciting program
            in Scarborough. This program is Free and you are encouraged to sign
            up while space exists.
          </p>
          <h4 className="font-bold text-gray-900 mb-2">Program Highlights:</h4>
          <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
            <li>Leadership Development Skills</li>
            <li>Community Engagement</li>
            <li>Personal Growth</li>
            <li>Problem-Solving Skills</li>
            <li>Critical Thinking Skills</li>
            <li>Camp Sports Program Leading Skills</li>
          </ul>
          <Link
            href="https://forms.gle/t8za3k7G4SXzQgqaA"
            target="_blank"
            className="inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-red-600 transition-colors mt-2"
          >
            Register Now
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-10 w-1 bg-gradient-to-b from-blue-600 to-red-500 mr-3"></div>
            <h3 className="text-xl font-bold text-blue-700">
              SENIORS ENGAGEMENT
            </h3>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden mb-4">
            <Image
              src="/images/seniors-program.webp"
              alt="Seniors Program"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-700 mb-4">
            Coach John&apos;s Senior Engagement program is dedicated to
            enriching the lives of seniors, with weekly focuses designed to:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-red-500"></div>
              <p>
                <span className="font-medium">Combat Isolation:</span> Engage
                seniors in activities and programs that foster community
                connections and a sense of belonging, reducing feelings of
                loneliness.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-red-500"></div>
              <p>
                <span className="font-medium">Promote Healthy Aging:</span>{" "}
                Offer activities aimed at enhancing both physical and mental
                well-being, supporting a more fulfilling and vibrant aging
                journey.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-red-500"></div>
              <p>
                <span className="font-medium">Enhance Social Inclusion:</span>{" "}
                Ensure seniors feel recognized and valued, encouraging their
                active involvement and participation in community life.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-red-500"></div>
              <p>
                <span className="font-medium">
                  Support Mental Health and Digital Literacy:
                </span>{" "}
                Address crucial healthy aging aspects by improving digital
                skills, challenging ageism, and providing mental health support.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ImpactSection() {
  const impactStats = [
    {
      value: "3,450+",
      description: "Participants engaged annually with no financial barriers",
    },
    {
      title: "870 + Girls in Sports Anually",
      description:
        "Creating inclusive environments for girls to thrive in sports",
    },
    {
      title: "420+ Impact on Youth Leadership",
      description:
        "Empowering young individuals with leadership skills and confidence",
    },
    {
      title: "Senior Engagement",
      description:
        "Combating isolation through community connections and activities",
    },
  ];

  const impactAreas = [
    {
      title: "Positive Change through Sports",
      description:
        "Utilizing sports as a powerful medium, we foster positive behavioral changes, promoting discipline, teamwork, and healthy lifestyles.",
    },
    {
      title: "Work and Volunteer Opportunities",
      description:
        "We provide teens with valuable volunteer and work experiences, offering them a platform to develop skills, gain experience, and contribute to their communities.",
    },
    {
      title: "Community Engagement and Violence Reduction",
      description:
        "Our youth-focused programs aim to engage young people in constructive community activities, significantly reducing the incidence of violence and fostering a safer environment.",
    },
    {
      title: "Barrier Removal",
      description:
        "We are committed to eliminating all forms of barriers that prevent individuals from accessing and benefiting from our programs, ensuring inclusivity and equal opportunities for all.",
    },
  ];

  return (
    <section id="impact" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        {/* New Impact Narrative Section */}
        <div className="mb-16 bg-gradient-to-r from-blue-50 to-red-50 p-8 rounded-xl shadow-md border-l-4 border-blue-600">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 text-center">Removing Barriers to Full Participation</h2>
          <p className="text-gray-800 text-lg mb-4 text-center max-w-3xl mx-auto">
            Each year, Coach John Leadership & Community Engagement Initiative creates powerful opportunities that remove financial and systemic barriers, allowing underserved Canadians to fully participate in the nation’s sports and cultural life.
          </p>
          <p className="text-gray-700 mb-4 text-center max-w-2xl mx-auto">
            In communities like West Hill, many families cannot afford experiences most take for granted — from watching a live Raptors game to visiting the zoo. <span className="font-semibold text-blue-700">Access should not be a privilege. It should be a right.</span>
          </p>
          <p className="text-gray-700 mb-4 text-center max-w-2xl mx-auto">
            <span className="font-semibold text-blue-700">In 2024, we proudly created 1,325 experiences for residents, including:</span>
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
            <li>455 kids in Summer Camp</li>
            <li>125 children in March Break Camp</li>
            <li>Live Toronto Blue Jays Games</li>
            <li>Toronto Raptors Games</li>
            <li>Golf Passes and Games</li>
            <li>Toronto FC Live Games</li>
            <li>Raptors 905 Live Games</li>
            <li>Free Toronto Zoo Tickets</li>
            <li>CNE Passes</li>
            <li>Occasional VIP Suite Access and Group Bus Rides</li>
          </ul>
          <p className="text-gray-700 mb-4 text-center max-w-2xl mx-auto">
            These activities reached low-income families, residents in shelters, Indigenous households, seniors, and those in Toronto’s priority neighborhoods—opening doors, building confidence, and giving children and families unforgettable memories of inclusion and joy.
          </p>
          <p className="text-gray-800 font-semibold text-center max-w-2xl mx-auto">
            Thanks to our sponsors, donors, and partners, this vision becomes a reality year after year.
          </p>
        </div>
        {/* Existing Impact Section Content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">OUR IMPACT</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Making a difference in our community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-lg border-t-4 border-blue-600 transform hover:-translate-y-1 duration-300"
            >
              {stat.value ? (
                <h3 className="text-4xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </h3>
              ) : (
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {stat.title}
                </h3>
              )}
              <p className="text-gray-700">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Impact Video */}
        <div className="mt-16 mb-12">
          <VideoFeature
            videoId="hvN9zB24tts"
            title="Recognition at Ontario Parliament"
            description="Watch as Coach John's community impact is recognized at the highest levels of government"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {impactAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {area.title}
              </h3>
              <p className="text-gray-700">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MediaSection() {
  // Coach John videos with appropriate categorization and descriptions
  const videos = [
    {
      id: "BqyQ8vzzI0o",
      title: "COACH JOHN SPORTS GALA SET UP CLIP 1",
      category: "Events & Galas",
      description:
        "Behind the scenes preparation for our annual sports gala, showcasing our commitment to creating memorable community events.",
    },
    {
      id: "H6-GgMGjrUI",
      title: "JAYS CARE FOUNDATION APPRECIATION DAY 2023 BY COACH JOHN",
      category: "Partnerships & Recognition",
      description:
        "Celebrating our valuable partnership with the Jays Care Foundation and their support for our community initiatives.",
    },
    {
      id: "hvN9zB24tts",
      title:
        "RECOGNITION AT ONTARIO PARLIAMENT FROM QUEENS PARK TORONTO CANADA",
      category: "Partnerships & Recognition",
      description:
        "A proud moment as Coach John's community impact is recognized at the Ontario Parliament in Queens Park, Toronto.",
    },
    {
      id: "hBFvBMkRjKE",
      title: "Parents interview (coach John March break camp)",
      category: "Testimonials",
      description:
        "Hear directly from parents about the positive impact our March break camp has had on their children.",
    },
    {
      id: "n9B8smPDif0",
      title: "2023 March Break Camp Clip 1",
      category: "Programs in Action",
      description:
        "Experience the energy and engagement of our 2023 March Break Camp, where youth develop skills and build lasting friendships.",
    },
    {
      id: "OFMd7JzbSdY",
      title: "THE KIDS HAVE SPOKEN.......... RESPECTIVELY.",
      category: "Testimonials",
      description:
        "Listen to the authentic voices of the children who participate in our programs, sharing their experiences and growth.",
    },
  ];

  return (
    <section
      id="media"
      className="py-20 bg-gradient-to-r from-blue-50 to-red-50"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            OUR IMPACT IN ACTION
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Watch our programs, events, and community engagement through these
            featured videos
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <VideoGallery videos={videos} />
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@coachjohn9326"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:from-blue-700 hover:to-red-600 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-16 bg-gradient-to-r from-blue-50 to-red-50"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            MOMENTS OF HOPE
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Our Journey in Photos
          </p>
        </div>
        <Gallery />
        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:from-blue-700 hover:to-red-600 transition-colors"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FandNSection() {
  const total = 21;
  const images = Array.from({ length: total }, (_, i) => ({
    src: `/FandN/image2 (${i + 1}).jpeg`,
    alt: `Food and Drinks photo ${i + 1}`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <section id="food-drinks" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            FOOD &amp; DRINKS
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Bringing the community together through food and fellowship
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg bg-gray-100">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Next image"
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-2">
            {currentIndex + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">CONTACT US</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-red-500 mx-auto"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Get in touch with our team
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-red-50 p-5 sm:p-8 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">
              Contact Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <ContactItem
                icon={<Mail className="h-5 w-5 text-blue-600 mt-1" />}
                title="Email"
                content={
                  <a
                    href="mailto:coachjohnacademy@gmail.com"
                    className="text-blue-600 hover:underline text-sm sm:text-base"
                  >
                    coachjohnacademy@gmail.com
                  </a>
                }
              />
              <ContactItem
                icon={<Phone className="h-5 w-5 text-blue-600 mt-1" />}
                title="Phone"
                content={
                  <p className="text-gray-700 text-sm sm:text-base">
                    +1 (416) 555-1234
                  </p>
                }
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5 text-blue-600 mt-1" />}
                title="Location"
                content={
                  <p className="text-gray-700 text-sm sm:text-base">
                    West Hill, Toronto, Canada
                  </p>
                }
              />
            </div>
            <div className="mt-6">
              <a
                href="mailto:coachjohnacademy@gmail.com"
                className="inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-red-600 transition-colors"
              >
                Send us an Email
              </a>
            </div>
            <SocialLinks />
          </div>
          <div className="h-[400px] md:h-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23148.177704492834!2d-79.18825985!3d43.7691285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4da6e2e5a0001%3A0x6a57cd3d6bf8fd9f!2sWest%20Hill%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1648226458974!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Coach John Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

function ContactItem({ icon, title, content }: ContactItemProps) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        {content}
      </div>
    </div>
  );
}

function SocialLinks() {
  const socialLinks = [
    { href: "#", icon: "facebook" },
    { href: "#", icon: "instagram" },
    { href: "#", icon: "twitter" },
  ];

  return (
    <div className="mt-6 sm:mt-8">
      <h4 className="font-medium text-gray-900 mb-3">Follow Us</h4>
      <div className="flex space-x-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
          >
            {getSocialIcon(link.icon)}
          </a>
        ))}
      </div>
    </div>
  );
}

function getSocialIcon(type: string) {
  switch (type) {
    case "facebook":
      return (
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988"
            clipRule="evenodd"
          />
        </svg>
      );
    // Add other cases as needed
    default:
      return null;
  }
}
