import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PackageDetailClient from "@/components/packages/PackageDetailClient";
import { ArrowLeft, MapPin, Clock, Star, Share2 } from "lucide-react";

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = params;

  const pkg = await prisma.package.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
    },
    include: {
      images: { orderBy: { order: "asc" } },
      itineraries: { orderBy: { dayNumber: "asc" } },
      destination: true,
    },
  });

  if (!pkg) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FD]">
      {/* Header Bar */}
      <section className="bg-[#181f3d] text-white py-12 border-b border-[#2d3766]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#F79837] mb-4 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Packages
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#F79837] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                  {pkg.category}
                </span>
                <span className="text-gray-300 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
                  {pkg.destinationName}
                </span>
                <span className="text-gray-300 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F79837]" />
                  {pkg.durationDays} Days / {pkg.durationNights} Nights
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {pkg.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#enquiry"
                className="btn-theme-accent text-xs py-2.5 px-6"
              >
                Book This Package
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PackageDetailClient pkg={pkg} />
        </div>
      </section>
    </div>
  );
}
