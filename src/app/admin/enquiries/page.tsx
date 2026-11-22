import React from "react";
import { prisma } from "@/lib/prisma";
import EnquiriesManagerClient from "@/components/admin/EnquiriesManagerClient";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiriesData = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      package: {
        select: { title: true, slug: true, coverImage: true },
      },
    },
  });

  const enquiries = enquiriesData.map((e) => ({
    id: e.id,
    customerName: e.customerName,
    phoneNumber: e.phoneNumber,
    email: e.email,
    packageId: e.packageId,
    packageName: e.packageName || e.package?.title || "General Enquiry",
    travelDate: e.travelDate,
    numberOfTravellers: e.numberOfTravellers,
    message: e.message,
    status: e.status,
    adminNotes: e.adminNotes,
    createdAt: e.createdAt.toISOString(),
  }));

  return <EnquiriesManagerClient initialEnquiries={enquiries} />;
}
