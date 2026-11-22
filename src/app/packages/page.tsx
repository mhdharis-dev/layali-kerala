import React, { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import PackagesCatalog from "@/components/packages/PackagesCatalog";

export const revalidate = 0;

export default async function PackagesPage() {
  const [packages, destinations] = await Promise.all([
    prisma.package.findMany({
      where: { active: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.destination.findMany({
      select: { name: true },
    }),
  ]);

  const allDestinations = destinations.map((d) => d.name);

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FD]">
      {/* Banner */}
      <section className="relative py-20 bg-[#181f3d] text-white">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/assets/img/1.jpg"
            alt="Kerala Hills"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#F79837] font-bold">
            Curated Holidays
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-3 text-white">
            Kerala Tour Packages
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Discover tailored holiday packages crafted for families, couples, nature lovers, and wellness seekers.
          </p>
        </div>
      </section>

      {/* Catalog Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="text-center py-16 text-sm text-gray-500">
                Loading tour packages...
              </div>
            }
          >
            <PackagesCatalog
              initialPackages={packages}
              allDestinations={allDestinations}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
