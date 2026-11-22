import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ banners });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, imageUrl, ctaText, ctaLink, order, active } = body;

    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        imageUrl,
        ctaText: ctaText || "Explore Packages",
        ctaLink: ctaLink || "/packages",
        order: Number(order) || 0,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return NextResponse.json({ success: true, banner }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create banner" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, subtitle, imageUrl, ctaText, ctaLink, order, active } = body;

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        title,
        subtitle,
        imageUrl,
        ctaText,
        ctaLink,
        order: Number(order),
        active: Boolean(active),
      },
    });

    return NextResponse.json({ success: true, banner });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update banner" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 });
  }
}
