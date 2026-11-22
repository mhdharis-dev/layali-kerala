import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: [{ featured: "desc" }, { name: "asc" }],
      include: {
        images: true,
        packages: {
          select: { id: true, title: true, slug: true, price: true, durationDays: true },
        },
      },
    });
    return NextResponse.json({ destinations });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, location, touristAttractions, bestTimeToVisit, coverImage, featured } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const destination = await prisma.destination.create({
      data: {
        name,
        slug: finalSlug,
        description,
        location: location || "Kerala",
        touristAttractions: touristAttractions || "",
        bestTimeToVisit: bestTimeToVisit || "Throughout the year",
        coverImage: coverImage || "/assets/img/3.jpg",
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, destination }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create destination" },
      { status: 500 }
    );
  }
}
