import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const rawSettings = await prisma.websiteSetting.findMany();
    const settings: Record<string, string> = {};
    rawSettings.forEach((item) => {
      settings[item.key] = item.value;
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json(); // key-value map

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.websiteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Settings updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
