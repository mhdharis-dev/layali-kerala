import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update contact message" },
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
    await prisma.contactMessage.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete contact message" },
      { status: 500 }
    );
  }
}
