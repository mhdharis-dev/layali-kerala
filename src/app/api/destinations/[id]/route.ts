import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const destination = await prisma.destination.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: true,
        packages: {
          where: { active: true },
          select: { id: true, title: true, slug: true, price: true, durationDays: true, durationNights: true, coverImage: true },
        },
      },
    });

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json({ destination });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch destination" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const updated = await prisma.destination.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, destination: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update destination" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await prisma.destination.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Destination deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete destination" },
      { status: 500 }
    );
  }
}
