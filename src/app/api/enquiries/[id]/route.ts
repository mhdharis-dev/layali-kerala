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
    const body = await request.json();
    const { status, adminNotes } = body;

    const data: any = {};
    if (status) data.status = status;
    if (adminNotes !== undefined) data.adminNotes = adminNotes;

    const updated = await prisma.enquiry.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update enquiry" },
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
    await prisma.enquiry.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
