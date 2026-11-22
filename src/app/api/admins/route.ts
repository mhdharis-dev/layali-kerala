import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ admins });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentAdmin = await getSessionAdmin();
    if (!currentAdmin || currentAdmin.role !== "superadmin") {
      return NextResponse.json({ error: "Only superadmins can add new admins" }, { status: 403 });
    }

    const { name, email, password, role } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password required" }, { status: 400 });
    }

    const existing = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existing) {
      return NextResponse.json({ error: "An admin with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role || "staff",
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ success: true, admin: newAdmin }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create admin" }, { status: 500 });
  }
}
