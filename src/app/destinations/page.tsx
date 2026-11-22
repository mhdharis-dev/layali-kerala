import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Calendar, Compass, ArrowRight, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    include: {
      packages: {
        where: { active: true },
        select: { id: true, title: true, slug: true, price: true, durationDays: true },
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FD]">
      {/* Banner */}
      <section className="relative py-20 bg-[#181f3d] text-white">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/assets/img/3.jpg"
            alt="Kerala Destinations"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#F79837] font-bold">
            God's Own Country
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-3 text-white">
            Top Kerala Tourist Destinations
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            From the misty tea valleys of Munnar to the world-famous backwaters of Alleppey and historic Cochin, discover Kerala's most enchanting destinations.
          </p>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => {
              const attractions = dest.touristAttractions
                .split("\n")
                .filter((a) => a.trim().length > 0);

              return (
                <div
                  key={dest.id}
                  className="travel-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={dest.coverImage || "/assets/img/3.jpg"}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#232c57] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {dest.location.split(",")[0]}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-heading text-2xl font-bold text-white mb-0.5 drop-shadow-sm">
                          {dest.name}
                        </h3>
                        <p className="text-white/90 text-xs flex items-center gap-1 drop-shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
                          {dest.location}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-[#818090] line-clamp-3 mb-4 leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Best Season */}
                      <div className="bg-[#F3F6FD] p-3 rounded-xl text-xs mb-4">
                        <div className="flex items-center gap-1.5 font-bold text-[#232c57] mb-1">
                          <Calendar className="w-3.5 h-3.5 text-[#F79837]" />
                          <span>Best Time To Visit:</span>
                        </div>
                        <p className="text-gray-600">{dest.bestTimeToVisit}</p>
                      </div>

                      {/* Top Attractions Preview */}
                      <div>
                        <span className="text-xs font-bold text-[#232c57] uppercase tracking-wider block mb-2">
                          Top Attractions:
                        </span>
                        <ul className="space-y-1.5 text-xs text-[#1E293B]">
                          {attractions.slice(0, 3).map((attr, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 truncate">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                              <span className="truncate">{attr}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                    <div className="pt-4 flex items-center justify-between">
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="text-xs font-bold text-[#232c57] hover:text-[#F79837] flex items-center gap-1 transition"
                      >
                        Explore Guide <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/packages?destination=${encodeURIComponent(dest.name)}`}
                        className="btn-theme text-xs py-2 px-3"
                      >
                        {dest.packages.length} Tours Available
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
