"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MapPin, Clock, CheckCircle2, Search, Filter, Compass } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

interface PackageItem {
  id: string;
  title: string;
  slug: string;
  overview: string;
  price: number;
  durationDays: number;
  durationNights: number;
  destinationName: string;
  category: string;
  coverImage: string | null;
  featured: boolean;
  inclusions: string | null;
}

interface PackagesCatalogProps {
  initialPackages: PackageItem[];
  allDestinations: string[];
}

export default function PackagesCatalog({
  initialPackages,
  allDestinations,
}: PackagesCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialDestination = searchParams.get("destination") || "";

  const [category, setCategory] = useState(initialCategory);
  const [selectedDest, setSelectedDest] = useState(initialDestination);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalPackage, setActiveModalPackage] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const categories = ["All", "Honeymoon", "Luxury", "Nature", "Medical", "Popular"];

  const filteredPackages = initialPackages.filter((pkg) => {
    const matchesCategory = category === "All" || pkg.category.toLowerCase() === category.toLowerCase();
    const matchesDest =
      !selectedDest ||
      pkg.destinationName.toLowerCase().includes(selectedDest.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destinationName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDest && matchesSearch;
  });

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          {/* Keyword Search */}
          <div className="relative md:col-span-1 lg:col-span-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by package name or place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] text-[#1E293B]"
            />
          </div>

          {/* Destination Dropdown */}
          <div>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] text-[#1E293B] bg-white"
            >
              <option value="">All Destinations</option>
              {allDestinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          <div>
            <button
              onClick={() => {
                setCategory("All");
                setSelectedDest("");
                setSearchQuery("");
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#232c57] bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-4 border-t border-gray-100">
          <span className="text-xs font-bold text-[#232c57] uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                category.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#232c57] text-white shadow-sm"
                  : "bg-gray-100 text-[#818090] hover:bg-gray-200 hover:text-[#1E293B]"
              }`}
            >
              {cat === "All" ? "All Packages" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Package Grid */}
      {filteredPackages.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-[#232c57]">
            No packages match your criteria
          </h3>
          <p className="text-sm text-[#818090] mt-1 mb-6">
            Try adjusting your search terms or filters to explore other Kerala tours.
          </p>
          <button
            onClick={() => {
              setCategory("All");
              setSelectedDest("");
              setSearchQuery("");
            }}
            className="btn-theme text-xs"
          >
            Show All Packages
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="travel-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={pkg.coverImage || "/assets/img/1.jpg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#232c57] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {pkg.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#232c57] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-[#F79837]" />
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#818090] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
                    <span>{pkg.destinationName}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#232c57] mb-2 line-clamp-1 hover:text-[#F79837] transition">
                    <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
                  </h3>

                  <p className="text-sm text-[#818090] line-clamp-2 mb-4">
                    {pkg.overview}
                  </p>

                  <div className="bg-[#F3F6FD] p-3 rounded-lg text-xs space-y-1 mb-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Private AC Vehicle with Chauffeur</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Complimentary Breakfast & Concierge</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                <div className="flex items-baseline justify-between mb-4 pt-4">
                  <div>
                    <span className="text-xs text-[#818090] block">Starting From</span>
                    <span className="text-2xl font-bold text-[#232c57] font-heading">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-400"> / person</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="btn-theme-outline text-xs text-center py-2.5"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() =>
                      setActiveModalPackage({ id: pkg.id, title: pkg.title })
                    }
                    className="btn-theme text-xs text-center py-2.5"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enquiry Modal */}
      {activeModalPackage && (
        <EnquiryModal
          isOpen={true}
          onClose={() => setActiveModalPackage(null)}
          packageId={activeModalPackage.id}
          packageName={activeModalPackage.title}
        />
      )}
    </div>
  );
}
