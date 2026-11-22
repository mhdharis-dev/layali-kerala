import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

// Public: Get packages (filtered or all)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const destination = searchParams.get("destination");
    const featured = searchParams.get("featured");
    const includeInactive = searchParams.get("all") === "true";

    const where: any = {};
    if (!includeInactive) {
      where.active = true;
    }
    if (category && category !== "All") {
      where.category = category;
    }
    if (destination) {
      where.destinationName = { contains: destination };
    }
    if (featured === "true") {
      where.featured = true;
    }

    const packages = await prisma.package.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        images: { orderBy: { order: "asc" } },
        itineraries: { orderBy: { dayNumber: "asc" } },
      },
    });

    return NextResponse.json({ packages });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// Admin: Create package
export async function POST(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      overview,
      price,
      durationDays,
      durationNights,
      destinationName,
      category,
      inclusions,
      exclusions,
      accommodation,
      coverImage,
      featured,
      active,
    } = body;

    if (!title || !overview) {
      return NextResponse.json(
        { error: "Title and overview are required" },
        { status: 400 }
      );
    }

    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newPackage = await prisma.package.create({
      data: {
        title,
        slug: finalSlug,
        overview,
        price: Number(price) || 0,
        durationDays: Number(durationDays) || 1,
        durationNights: Number(durationNights) || 1,
        destinationName: destinationName || "Kerala",
        category: category || "Popular",
        inclusions: inclusions || null,
        exclusions: exclusions || null,
        accommodation: accommodation || null,
        coverImage: coverImage || "/assets/img/1.jpg",
        featured: Boolean(featured),
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error: any) {
    console.error("Create package error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create package" },
      { status: 500 }
    );
  }
}
