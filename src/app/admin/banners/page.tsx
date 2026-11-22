import React from "react";
import { prisma } from "@/lib/prisma";
import BannersManagerClient from "@/components/admin/BannersManagerClient";

export const revalidate = 0;

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { order: "asc" },
  });

  return <BannersManagerClient initialBanners={banners} />;
}
