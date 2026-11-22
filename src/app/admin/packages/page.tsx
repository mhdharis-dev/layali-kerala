import React from "react";
import { prisma } from "@/lib/prisma";
import PackagesManagerClient from "@/components/admin/PackagesManagerClient";

export const revalidate = 0;

export default async function AdminPackagesPage() {
  const [packagesData, destinations] = await Promise.all([
    prisma.package.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.destination.findMany({
      select: { id: true, name: true },
    }),
  ]);

  const packages = packagesData.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    overview: p.overview,
    price: p.price,
    durationDays: p.durationDays,
    durationNights: p.durationNights,
    destinationName: p.destinationName,
    category: p.category,
    coverImage: p.coverImage,
    inclusions: p.inclusions,
    exclusions: p.exclusions,
    accommodation: p.accommodation,
    featured: p.featured,
    active: p.active,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <PackagesManagerClient
      initialPackages={packages}
      destinations={destinations}
    />
  );
}
