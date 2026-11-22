import React from "react";
import { prisma } from "@/lib/prisma";
import DestinationsManagerClient from "@/components/admin/DestinationsManagerClient";

export const revalidate = 0;

export default async function AdminDestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
    include: {
      packages: { select: { id: true } },
    },
  });

  const formatted = destinations.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    location: d.location,
    touristAttractions: d.touristAttractions,
    bestTimeToVisit: d.bestTimeToVisit,
    coverImage: d.coverImage,
    featured: d.featured,
    packageCount: d.packages.length,
  }));

  return <DestinationsManagerClient initialDestinations={formatted} />;
}
