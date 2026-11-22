"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Trash2,
  Calendar,
  Users,
  Edit3,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string | null;
  packageId: string | null;
  packageName: string;
  travelDate: string | null;
  numberOfTravellers: number;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

export default function EnquiriesManagerClient({
  initialEnquiries,
}: {
  initialEnquiries: EnquiryItem[];
}) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const statuses = ["All", "New", "Contacted", "Follow-up", "Confirmed", "Closed"];

  const filtered = enquiries.filter((e) => {
    const matchesStatus = selectedStatus === "All" || e.status === selectedStatus;
    const matchesQuery =
      !searchQuery ||
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.message && e.message.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesQuery;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notesText }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, adminNotes: notesText } : e))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Contacted":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Follow-up":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
          Customer Enquiries & CRM
        </h1>
        <p className="text-xs text-[#818090] mt-1">
          Manage inbound package bookings, update customer interaction statuses, and respond via WhatsApp.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedStatus === st
                    ? "bg-[#232c57] text-white shadow-sm"
                    : "bg-gray-100 text-[#818090] hover:bg-gray-200"
                }`}
              >
                {st} ({enquiries.filter((e) => st === "All" || e.status === st).length})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
            />
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100 text-[#818090]">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="font-semibold">No enquiries found</p>
            <p className="text-xs">No records matching your active filters.</p>
          </div>
        ) : (
          filtered.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-gray-300 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left: Customer Info */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading font-bold text-lg text-[#232c57]">
                      {enq.customerName}
                    </h3>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:outline-none cursor-pointer ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#818090] mt-1.5">
                    <span className="font-medium text-[#1E293B]">{enq.phoneNumber}</span>
                    {enq.email && <span>{enq.email}</span>}
                    <span>Received: {new Date(enq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Right: Quick Action Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${enq.phoneNumber.replace(
                      /[^0-9]/g,
                      ""
                    )}&text=Hello%20${encodeURIComponent(
                      enq.customerName
                    )},%20this%20is%20Layali%20Kerala%20regarding%20your%20enquiry%20for%20${encodeURIComponent(
                      enq.packageName
                    )}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-theme-accent text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-none"
                  >
                    WhatsApp Chat
                  </a>
                  <a
                    href={`tel:${enq.phoneNumber}`}
                    className="btn-theme text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-none"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Package Details & Message Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#F3F6FD] p-3.5 rounded-lg text-xs">
                <div>
                  <span className="font-bold text-[#232c57] block mb-0.5">Tour Package:</span>
                  <span className="text-[#1E293B] font-medium">{enq.packageName}</span>
                </div>
                <div>
                  <span className="font-bold text-[#232c57] block mb-0.5">Travel Dates & Party:</span>
                  <span className="text-[#1E293B]">
                    {enq.travelDate ? new Date(enq.travelDate).toLocaleDateString() : "Flexible Dates"} • {enq.numberOfTravellers} Travellers
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#232c57] block mb-0.5">Customer Message:</span>
                  <span className="text-[#818090] italic">
                    {enq.message ? `"${enq.message}"` : "None provided"}
                  </span>
                </div>
              </div>

              {/* Admin Notes Section */}
              <div className="pt-2 border-t border-gray-100 flex items-start justify-between text-xs">
                {editingNotesId === enq.id ? (
                  <div className="w-full flex gap-2">
                    <input
                      type="text"
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      placeholder="Add internal staff notes (e.g. Quoted ₹45k, prefers luxury villa)..."
                      className="flex-grow p-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#232c57]"
                    />
                    <button
                      onClick={() => handleSaveNotes(enq.id)}
                      disabled={savingNotes}
                      className="btn-theme text-xs py-1.5 px-3"
                    >
                      {savingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="btn-theme-outline text-xs py-1.5 px-3"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[#818090]">
                      <span className="font-semibold text-[#1E293B]">Internal Staff Notes:</span>{" "}
                      {enq.adminNotes || "No notes added yet."}
                    </p>
                    <button
                      onClick={() => {
                        setEditingNotesId(enq.id);
                        setNotesText(enq.adminNotes || "");
                      }}
                      className="text-xs text-[#232c57] font-semibold hover:underline flex items-center gap-1 shrink-0 ml-4"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Note
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
