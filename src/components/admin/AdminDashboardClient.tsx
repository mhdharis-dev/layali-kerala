"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Package,
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  Phone,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Search,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string | null;
  packageName: string | null;
  travelDate: string | null;
  numberOfTravellers: number;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

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

interface AdminDashboardClientProps {
  stats: {
    totalEnquiries: number;
    newEnquiries: number;
    totalPackages: number;
    totalDestinations: number;
    totalMessages: number;
    statusCounts: Record<string, number>;
  };
  recentEnquiries: EnquiryItem[];
  recentMessages: MessageItem[];
}

export default function AdminDashboardClient({
  stats,
  recentEnquiries: initialEnquiries,
  recentMessages,
}: AdminDashboardClientProps) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (e) {
      console.error("Status update error", e);
    } finally {
      setUpdatingId(null);
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
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
            Operations Dashboard
          </h1>
          <p className="text-xs text-[#818090] mt-1">
            Real-time enquiries, package catalogue status, and booking workflows.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/packages"
            className="btn-theme text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add Package
          </Link>
          <Link
            href="/admin/destinations"
            className="btn-theme-outline text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add Destination
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#818090] uppercase tracking-wider block">
              Total Enquiries
            </span>
            <span className="font-heading text-3xl font-bold text-[#232c57] mt-1 block">
              {stats.totalEnquiries}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#232c57]/10 text-[#232c57] flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#818090] uppercase tracking-wider block">
              New Leads
            </span>
            <span className="font-heading text-3xl font-bold text-blue-600 mt-1 block">
              {stats.newEnquiries}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#818090] uppercase tracking-wider block">
              Active Packages
            </span>
            <span className="font-heading text-3xl font-bold text-[#232c57] mt-1 block">
              {stats.totalPackages}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F79837]/15 text-[#F79837] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#818090] uppercase tracking-wider block">
              Destinations
            </span>
            <span className="font-heading text-3xl font-bold text-[#232c57] mt-1 block">
              {stats.totalDestinations}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#818090] uppercase tracking-wider block">
              Contact Queries
            </span>
            <span className="font-heading text-3xl font-bold text-[#232c57] mt-1 block">
              {stats.totalMessages}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Pipeline Status Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-heading font-bold text-base text-[#232c57] mb-4">
          Customer Enquiry Pipeline Status
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {["New", "Contacted", "Follow-up", "Confirmed", "Closed"].map((st) => (
            <div
              key={st}
              className="p-3 rounded-lg border border-gray-100 bg-[#F3F6FD] text-center"
            >
              <span className="text-xs text-[#818090] block">{st}</span>
              <span className="font-heading font-bold text-xl text-[#232c57] mt-0.5 block">
                {stats.statusCounts[st] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl text-[#232c57]">
              Recent Customer Enquiries
            </h2>
            <p className="text-xs text-[#818090]">
              Click status to update lead progress or WhatsApp client immediately.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-[#232c57] hover:underline flex items-center gap-1"
          >
            Manage All ({stats.totalEnquiries}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F3F6FD] text-[#232c57] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Selected Package</th>
                <th className="py-3.5 px-6">Travel Date & Guests</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#1E293B]">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <p className="font-bold text-sm text-[#232c57]">{enq.customerName}</p>
                    <p className="text-[#818090] text-[11px] mt-0.5">{enq.phoneNumber}</p>
                    {enq.email && <p className="text-gray-400 text-[10px]">{enq.email}</p>}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-800">{enq.packageName || "General Enquiry"}</p>
                    {enq.message && (
                      <p className="text-[#818090] text-[11px] line-clamp-1 mt-0.5 italic">
                        "{enq.message}"
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-700 block">
                      {enq.travelDate ? new Date(enq.travelDate).toLocaleDateString() : "Flexible Dates"}
                    </span>
                    <span className="text-[11px] text-[#818090]">
                      {enq.numberOfTravellers} {enq.numberOfTravellers === 1 ? "Person" : "Travellers"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={enq.status}
                      disabled={updatingId === enq.id}
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
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {/* WhatsApp button */}
                    <a
                      href={`https://api.whatsapp.com/send?phone=${enq.phoneNumber.replace(/[^0-9]/g, "")}&text=Hello%20${encodeURIComponent(
                        enq.customerName
                      )},%20thank%20you%20for%20enquiring%20with%20Layali%20Kerala%20regarding%20${encodeURIComponent(
                        enq.packageName || "your tour"
                      )}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-2.5 py-1 rounded text-[11px] transition shadow-sm"
                      title="Open WhatsApp chat"
                    >
                      WhatsApp
                    </a>
                    {/* Phone button */}
                    <a
                      href={`tel:${enq.phoneNumber}`}
                      className="inline-flex items-center gap-1 bg-[#232c57] hover:bg-[#181f3d] text-white font-semibold px-2.5 py-1 rounded text-[11px] transition shadow-sm"
                      title="Call customer"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Contact Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg text-[#232c57]">
            Recent Website Messages
          </h3>
          <Link
            href="/admin/messages"
            className="text-xs font-bold text-[#232c57] hover:underline"
          >
            View All Messages →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-xl border border-gray-100 bg-[#F3F6FD] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#232c57]">{msg.name}</span>
                <span className="text-[10px] text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-gray-500">{msg.email} {msg.phone ? `• ${msg.phone}` : ""}</p>
              {msg.subject && (
                <p className="text-xs font-semibold text-[#1E293B]">{msg.subject}</p>
              )}
              <p className="text-xs text-[#818090] line-clamp-2 italic">
                "{msg.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
