import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pkg = await prisma.package.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: { orderBy: { order: "asc" } },
        itineraries: { orderBy: { dayNumber: "asc" } },
      },
    });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ package: pkg });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch package" },
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

    const updated = await prisma.package.update({
      where: { id },
      data: {
        ...body,
        price: body.price !== undefined ? Number(body.price) : undefined,
        durationDays: body.durationDays !== undefined ? Number(body.durationDays) : undefined,
        durationNights: body.durationNights !== undefined ? Number(body.durationNights) : undefined,
      },
    });

    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update package" },
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
    await prisma.package.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Package deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
}
