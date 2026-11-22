import React from "react";
import { prisma } from "@/lib/prisma";
import ContentManagerClient from "@/components/admin/ContentManagerClient";

export const revalidate = 0;

export default async function AdminContentPage() {
  const records = await prisma.websiteSetting.findMany();
  const settings: Record<string, string> = {};
  records.forEach((r) => {
    settings[r.key] = r.value;
  });

  return <ContentManagerClient initialSettings={settings} />;
}
