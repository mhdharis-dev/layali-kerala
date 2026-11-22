"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Compass, ArrowRight } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaLink: string | null;
}

interface HomeClientSectionProps {
  banners: Banner[];
}

export default function HomeClientSection({ banners }: HomeClientSectionProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultBanners = [
    {
      id: "1",
      title: "Indulge in the Beauty of Kerala",
      subtitle: "Experience Kerala's misty tea plantations, serene backwaters, and pristine hills with personalized luxury service.",
      imageUrl: "/assets/img/1.jpg",
      ctaText: "Explore Packages",
      ctaLink: "/packages",
    },
    {
      id: "2",
      title: "Kerala’s Trusted Arab-Focused Travel Partner",
      subtitle: "Decade of expertise, Arabic speaking chauffeurs, certified halal dining, and private family resorts.",
      imageUrl: "/assets/img/2.jpg",
      ctaText: "Discover Destinations",
      ctaLink: "/destinations",
    },
    {
      id: "3",
      title: "Luxury Houseboats & Rejuvenating Ayurveda",
      subtitle: "Wake up to the tranquil waters of Alleppey and experience world-renowned authentic Kerala wellness treatments.",
      imageUrl: "/assets/img/3.jpg",
      ctaText: "Enquire Now",
      ctaLink: "/contact",
    },
  ];

  const slides = banners.length > 0 ? banners : defaultBanners;

  // Search Bar State
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedDestination) query.set("destination", selectedDestination);
    if (selectedCategory && selectedCategory !== "All") query.set("category", selectedCategory);
    router.push(`/packages?${query.toString()}`);
  };

  return (
    <div className="relative">
      {/* Hero Carousel */}
      <div className="relative h-[550px] sm:h-[620px] lg:h-[700px] w-full overflow-hidden bg-[#181f3d]">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.imageUrl || "/assets/img/1.jpg"}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#181f3d]/90 via-[#181f3d]/60 to-black/30" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#F79837]/20 border border-[#F79837] text-[#F79837] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                    <span>Layali Kerala Travel & Tourism</span>
                  </div>
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link
                      href={slide.ctaLink || "/packages"}
                      className="btn-theme-accent"
                    >
                      {slide.ctaText || "Explore Packages"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                      href="/contact"
                      className="btn-hero-outline"
                    >
                      Plan Custom Trip
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-[#232c57] flex items-center justify-center transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-[#232c57] flex items-center justify-center transition"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-[#F79837]" : "w-2.5 bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Quick Search Bar */}
      <div className="relative -mt-12 z-30 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-100">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-end">
            {/* Destination Selection */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-[#232c57] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
                Select Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#232c57] transition text-[#1E293B]"
              >
                <option value="">All Kerala Destinations</option>
                <option value="Munnar">Munnar (Tea Hills & Waterfalls)</option>
                <option value="Alleppey">Alleppey (Backwaters & Houseboats)</option>
                <option value="Wayanad">Wayanad (Nature, Caves & Wildlife)</option>
                <option value="Kochi">Kochi / Cochin (Heritage & Shopping)</option>
                <option value="Thekkady">Thekkady (Spice Hills & Safari)</option>
                <option value="Kovalam">Kovalam & Trivandrum (Beaches & Ayurveda)</option>
              </select>
            </div>

            {/* Tour Type */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-[#232c57] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#F79837]" />
                Tour Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#232c57] transition text-[#1E293B]"
              >
                <option value="All">All Categories</option>
                <option value="Honeymoon">Honeymoon Romantic</option>
                <option value="Luxury">Arab & Family Luxury</option>
                <option value="Nature">Nature & Wildlife</option>
                <option value="Medical">Ayurveda & Medical</option>
                <option value="Popular">Classic Golden Tours</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="btn-theme w-full py-2.5 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                Find Packages
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
