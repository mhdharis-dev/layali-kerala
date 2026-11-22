import React from "react";
import { prisma } from "@/lib/prisma";
import AdminsManagerClient from "@/components/admin/AdminsManagerClient";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const admins = await prisma.admin.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const formatted = admins.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
  }));

  return <AdminsManagerClient initialAdmins={formatted} />;
}
