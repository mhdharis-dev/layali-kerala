import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

// Public: Submit enquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      phoneNumber,
      email,
      packageId,
      packageName,
      travelDate,
      numberOfTravellers,
      message,
    } = body;

    if (!customerName || !phoneNumber) {
      return NextResponse.json(
        { error: "Customer name and phone number are required" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email ? email.trim() : null,
        packageId: packageId || null,
        packageName: packageName || null,
        travelDate: travelDate || null,
        numberOfTravellers: numberOfTravellers ? Number(numberOfTravellers) : 1,
        message: message ? message.trim() : null,
        status: "New",
      },
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

// Admin: Get all enquiries
export async function GET(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "All") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { phoneNumber: { contains: search } },
        { packageName: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        package: {
          select: { title: true, slug: true, coverImage: true },
        },
      },
    });

    return NextResponse.json({ enquiries });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
