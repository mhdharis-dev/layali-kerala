import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Calendar,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = params;

  const destination = await prisma.destination.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
    },
    include: {
      images: true,
      packages: {
        where: { active: true },
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          durationDays: true,
          durationNights: true,
          coverImage: true,
          overview: true,
          category: true,
        },
      },
    },
  });

  if (!destination) {
    notFound();
  }

  const attractions = destination.touristAttractions
    .split("\n")
    .filter((a) => a.trim().length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FD]">
      {/* Header Banner */}
      <section className="relative py-24 bg-[#181f3d] text-white">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={destination.coverImage || "/assets/img/3.jpg"}
            alt={destination.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#F79837] mb-4 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Destinations
          </Link>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F79837] font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination.location}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            {destination.name}
          </h1>
          <p className="text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Cols: Details, Attractions, Best Season */}
            <div className="lg:col-span-2 space-y-8">
              {/* Photo & Overview Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="relative h-[360px] sm:h-[420px] w-full rounded-xl overflow-hidden mb-6">
                  <Image
                    src={destination.coverImage || "/assets/img/3.jpg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="font-heading text-2xl font-bold text-[#232c57] mb-4">
                  About {destination.name}
                </h2>
                <p className="text-[#818090] text-base leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Tourist Attractions */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-heading text-2xl font-bold text-[#232c57] mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#F79837]" /> Must-Visit Attractions in {destination.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attractions.map((att, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F3F6FD] text-sm text-[#1E293B]"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{att}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-[#232c57] mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F79837]" /> Climate & Best Time To Travel
                </h3>
                <p className="text-sm text-[#818090] leading-relaxed">
                  {destination.bestTimeToVisit}
                </p>
              </div>
            </div>

            {/* Right Column: Packages visiting this destination & Inquiry Callout */}
            <div className="space-y-6">
              {/* Packages Sidebar */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-[#232c57] mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#F79837]" /> Packages Covering {destination.name}
                </h3>

                {destination.packages.length > 0 ? (
                  <div className="space-y-4">
                    {destination.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="p-4 rounded-xl border border-gray-100 bg-[#F3F6FD] hover:bg-gray-100 transition space-y-2"
                      >
                        <span className="text-[11px] font-bold text-[#F79837] uppercase tracking-wider block">
                          {pkg.category}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-[#232c57] line-clamp-1">
                          {pkg.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-[#818090] pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#F79837]" />
                            {pkg.durationDays}D / {pkg.durationNights}N
                          </span>
                          <span className="font-bold text-[#232c57] font-heading">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="pt-2">
                          <Link
                            href={`/packages/${pkg.slug}`}
                            className="btn-theme w-full text-xs py-1.5 text-center block"
                          >
                            View Itinerary
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#818090]">
                    We provide fully customized private car packages to {destination.name}.
                  </p>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href={`/packages?destination=${encodeURIComponent(destination.name)}`}
                    className="text-xs font-bold text-[#232c57] hover:underline flex items-center gap-1 justify-center"
                  >
                    Explore all tour packages <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Consultation Card */}
              <div className="bg-[#232c57] text-white rounded-2xl p-6 shadow-xl text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F79837]">
                  Need Expert Guidance?
                </span>
                <h4 className="font-heading text-xl font-bold">
                  Plan Your {destination.name} Trip With Us
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Connect with our Kerala travel consultants for customized itinerary planning, hotel deals, and chauffeur reservations.
                </p>
                <div className="space-y-2 pt-2">
                  <Link href="/contact" className="btn-theme-accent w-full text-xs block py-2.5">
                    Request Free Itinerary
                  </Link>
                  <a
                    href="https://api.whatsapp.com/send?phone=09605695729"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-theme-outline !text-white !border-white hover:!bg-white hover:!text-[#232c57] w-full text-xs block py-2.5"
                  >
                    WhatsApp Helpline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
