"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Users,
  Phone,
  Mail,
  User,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Utensils,
  Camera,
  Bed,
  Shield,
  Loader2,
} from "lucide-react";

interface PackageItinerary {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: string | null;
  meals: string | null;
}

interface PackageImage {
  id: string;
  url: string;
  caption: string | null;
}

interface PackageData {
  id: string;
  title: string;
  slug: string;
  overview: string;
  price: number;
  durationDays: number;
  durationNights: number;
  destinationName: string;
  category: string;
  coverImage: string | null;
  inclusions: string | null;
  exclusions: string | null;
  accommodation: string | null;
  images: PackageImage[];
  itineraries: PackageItinerary[];
}

export default function PackageDetailClient({ pkg }: { pkg: PackageData }) {
  const [activeImage, setActiveImage] = useState(
    pkg.images.length > 0 ? pkg.images[0].url : pkg.coverImage || "/assets/img/1.jpg"
  );

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    travelDate: "",
    numberOfTravellers: 2,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inclusionsList = pkg.inclusions
    ? pkg.inclusions.split("\n").filter((i) => i.trim().length > 0)
    : [
        "Pick up & drop from Cochin/Calicut Airport in private AC vehicle",
        "Handpicked resort stays with daily complimentary breakfast",
        "Driver allowances, fuel, toll, and state parking taxes",
        "24/7 on-call travel assistance and local guidance",
      ];

  const exclusionsList = pkg.exclusions
    ? pkg.exclusions.split("\n").filter((e) => e.trim().length > 0)
    : [
        "Airfare or train tickets",
        "Monument/park entry tickets unless specified",
        "Personal expenses like laundry, phone calls, and tips",
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
      setErrorMsg("Please enter your name and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageId: pkg.id,
          packageName: pkg.title,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit enquiry.");
      }
    } catch (err) {
      setErrorMsg("Connection error. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left 2 Columns: Details, Gallery, Itinerary, Inclusions */}
      <div className="lg:col-span-2 space-y-10">
        {/* Main Gallery */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-4">
          <div className="relative h-[380px] sm:h-[460px] w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={activeImage}
              alt={pkg.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          {pkg.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {pkg.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.url)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                    activeImage === img.url
                      ? "border-[#232c57] scale-95"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.caption || "Thumbnail"}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Overview Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-heading text-2xl font-bold text-[#232c57] mb-4">
            Package Overview
          </h2>
          <p className="text-[#818090] text-base leading-relaxed mb-6">
            {pkg.overview}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F3F6FD] p-4 rounded-xl text-center">
            <div>
              <span className="text-xs text-[#818090] block uppercase font-bold">Duration</span>
              <span className="font-heading font-bold text-base text-[#232c57]">
                {pkg.durationDays} Days / {pkg.durationNights} Nights
              </span>
            </div>
            <div>
              <span className="text-xs text-[#818090] block uppercase font-bold">Tour Category</span>
              <span className="font-heading font-bold text-base text-[#232c57]">
                {pkg.category}
              </span>
            </div>
            <div>
              <span className="text-xs text-[#818090] block uppercase font-bold">Destination</span>
              <span className="font-heading font-bold text-base text-[#232c57] truncate block">
                {pkg.destinationName}
              </span>
            </div>
            <div>
              <span className="text-xs text-[#818090] block uppercase font-bold">Transport</span>
              <span className="font-heading font-bold text-base text-[#232c57]">
                Private AC
              </span>
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        {pkg.accommodation && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="font-heading text-xl font-bold text-[#232c57] mb-3 flex items-center gap-2">
              <Bed className="w-5 h-5 text-[#F79837]" /> Accommodation & Stays
            </h3>
            <p className="text-sm text-[#818090] leading-relaxed">
              {pkg.accommodation}
            </p>
          </div>
        )}

        {/* Day-Wise Itinerary */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-heading text-2xl font-bold text-[#232c57] mb-6">
            Day-Wise Detailed Itinerary
          </h2>

          <div className="space-y-6">
            {pkg.itineraries.length > 0 ? (
              pkg.itineraries.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-8 pb-6 border-l-2 border-[#232c57]/20 last:border-l-0 last:pb-0"
                >
                  {/* Timeline Badge */}
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#232c57] text-[#F79837] font-heading font-bold flex items-center justify-center text-xs shadow-md">
                    D{item.dayNumber}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#232c57] mb-2">
                    Day {item.dayNumber}: {item.title}
                  </h3>

                  <p className="text-sm text-[#818090] leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs">
                    {item.activities && (
                      <div className="bg-[#F3F6FD] px-3 py-1.5 rounded-lg text-gray-700 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#F79837]" />
                        <span>{item.activities}</span>
                      </div>
                    )}
                    {item.meals && (
                      <div className="bg-[#F3F6FD] px-3 py-1.5 rounded-lg text-gray-700 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#F79837]" />
                        <span>Meals: {item.meals}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#818090]">
                Contact our travel concierge for a fully customized day-by-day plan.
              </p>
            )}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-heading text-2xl font-bold text-[#232c57] mb-6">
            What's Included & Excluded
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div>
              <h3 className="font-heading font-bold text-green-700 text-base mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" /> Package Inclusions
              </h3>
              <ul className="space-y-2.5 text-sm text-[#1E293B]">
                {inclusionsList.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div>
              <h3 className="font-heading font-bold text-red-600 text-base mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" /> Package Exclusions
              </h3>
              <ul className="space-y-2.5 text-sm text-[#818090]">
                {exclusionsList.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Price Box & Enquiry Form */}
      <div className="space-y-6">
        {/* Sticky Price Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 sticky top-28" id="enquiry">
          <div className="border-b border-gray-100 pb-5 mb-5">
            <span className="text-xs text-[#818090] uppercase font-bold tracking-wider">
              Special Package Price
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-heading text-4xl font-bold text-[#232c57]">
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500">/ person (twin sharing)</span>
            </div>
            <p className="text-xs text-[#818090] mt-1">
              Customizable according to luxury preferences, vehicle choice & dates.
            </p>
          </div>

          {/* Enquiry Form */}
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-xl font-bold text-[#232c57]">
                Enquiry Sent!
              </h4>
              <p className="text-xs text-[#818090]">
                Thank you! Our travel consultant will call or WhatsApp you shortly with the customized itinerary and exact quotation.
              </p>
              <a
                href={`https://api.whatsapp.com/send?phone=09605695729&text=Hello%20Layali%20Kerala,%20I%20enquired%20about%20${encodeURIComponent(
                  pkg.title
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-theme-accent w-full text-xs"
              >
                Instant WhatsApp Chat
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-heading text-lg font-bold text-[#232c57]">
                Book / Enquire This Package
              </h4>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 / +966 / +971..."
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) =>
                      setFormData({ ...formData, travelDate: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Travellers
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.numberOfTravellers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfTravellers: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Message / Special Request
                </label>
                <textarea
                  rows={3}
                  placeholder="Need Arabic guide, pool villa, etc."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-theme w-full flex items-center justify-center gap-2 py-3"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Enquiry Now
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
            <a
              href={`https://api.whatsapp.com/send?phone=09605695729&text=Hello%20Layali%20Kerala,%20I%20am%20interested%20in%20${encodeURIComponent(
                pkg.title
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-theme-accent w-full text-center text-xs block py-2.5"
            >
              Chat on WhatsApp Directly
            </a>
            <p className="text-[11px] text-center text-[#818090]">
              📞 Need immediate assistance? Call <span className="font-semibold text-[#1E293B]">+91 9605 695 729</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
