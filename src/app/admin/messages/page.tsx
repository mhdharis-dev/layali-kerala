import React from "react";
import { prisma } from "@/lib/prisma";
import MessagesManagerClient from "@/components/admin/MessagesManagerClient";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messagesData = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const messages = messagesData.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    subject: m.subject,
    message: m.message,
    status: m.status,
    createdAt: m.createdAt.toISOString(),
  }));

  return <MessagesManagerClient initialMessages={messages} />;
}
