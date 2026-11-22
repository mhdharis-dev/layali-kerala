"use client";

import React, { useState } from "react";
import { Mail, Phone, Trash2, CheckCircle2, Search } from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function MessagesManagerClient({
  initialMessages,
}: {
  initialMessages: MessageItem[];
}) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [search, setSearch] = useState("");

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject && m.subject.toLowerCase().includes(search.toLowerCase())) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Unread" ? "Replied" : "Unread";
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
            Contact Form Submissions
          </h1>
          <p className="text-xs text-[#818090] mt-1">
            General website feedback, customized travel inquiries, and consultation requests.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-[#818090]">
            <Mail className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="font-semibold text-sm">No messages found</p>
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl p-5 shadow-sm border transition ${
                msg.status === "Unread"
                  ? "border-blue-300 bg-blue-50/20"
                  : "border-gray-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-heading font-bold text-base text-[#232c57]">
                    {msg.name}
                  </h3>
                  <button
                    onClick={() => toggleStatus(msg.id, msg.status)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition ${
                      msg.status === "Unread"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {msg.status} (Click to toggle)
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#818090] mb-3">
                <a
                  href={`mailto:${msg.email}`}
                  className="hover:text-[#232c57] flex items-center gap-1 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F79837]" /> {msg.email}
                </a>
                {msg.phone && (
                  <a
                    href={`tel:${msg.phone}`}
                    className="hover:text-[#232c57] flex items-center gap-1 font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F79837]" /> {msg.phone}
                  </a>
                )}
              </div>

              {msg.subject && (
                <div className="text-xs font-bold text-[#232c57] mb-1">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#1E293B] bg-[#F3F6FD] p-3.5 rounded-lg leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>

              <div className="flex justify-end gap-2 pt-3 mt-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                    msg.subject || "Your enquiry with Layali Kerala"
                  )}`}
                  className="btn-theme text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Reply Email
                </a>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
