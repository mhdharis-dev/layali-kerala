import React from "react";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalEnquiries,
    newEnquiries,
    totalPackages,
    totalDestinations,
    totalMessages,
    allEnquiries,
    recentEnquiriesData,
    recentMessagesData,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "New" } }),
    prisma.package.count(),
    prisma.destination.count(),
    prisma.contactMessage.count(),
    prisma.enquiry.findMany({ select: { status: true } }),
    prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const statusCounts: Record<string, number> = {
    New: 0,
    Contacted: 0,
    "Follow-up": 0,
    Confirmed: 0,
    Closed: 0,
  };

  allEnquiries.forEach((e) => {
    if (statusCounts[e.status] !== undefined) {
      statusCounts[e.status]++;
    }
  });

  const recentEnquiries = recentEnquiriesData.map((e) => ({
    id: e.id,
    customerName: e.customerName,
    phoneNumber: e.phoneNumber,
    email: e.email,
    packageName: e.packageName,
    travelDate: e.travelDate,
    numberOfTravellers: e.numberOfTravellers,
    message: e.message,
    status: e.status,
    adminNotes: e.adminNotes,
    createdAt: e.createdAt.toISOString(),
  }));

  const recentMessages = recentMessagesData.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    subject: m.subject,
    message: m.message,
    status: m.status,
    createdAt: m.createdAt.toISOString(),
  }));

  const stats = {
    totalEnquiries,
    newEnquiries,
    totalPackages,
    totalDestinations,
    totalMessages,
    statusCounts,
  };

  return (
    <AdminDashboardClient
      stats={stats}
      recentEnquiries={recentEnquiries}
      recentMessages={recentMessages}
    />
  );
}
