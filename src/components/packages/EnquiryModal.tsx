"use client";

import React, { useState } from "react";
import { X, CheckCircle, Calendar, Users, Phone, Mail, User, Send, Loader2 } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId?: string;
  packageName?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  packageId,
  packageName,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    travelDate: "",
    numberOfTravellers: 2,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageId,
          packageName: packageName || "General Package Enquiry",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      customerName: "",
      phoneNumber: "",
      email: "",
      travelDate: "",
      numberOfTravellers: 2,
      message: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#232c57] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#F79837] uppercase tracking-wider">
              Layali Kerala Tours
            </span>
            <h3 className="font-heading text-xl font-bold text-white mt-0.5">
              {packageName ? `Enquire: ${packageName}` : "Plan Your Kerala Vacation"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-heading text-2xl font-bold text-[#232c57]">
                Enquiry Received!
              </h4>
              <p className="text-sm text-[#818090] max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-[#1E293B]">{formData.customerName}</span>. Our travel specialists will review your itinerary and get back to you shortly via phone/WhatsApp.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://api.whatsapp.com/send?phone=09605695729&text=Hello%20Layali%20Kerala,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(
                    packageName || "Kerala Tour"
                  )}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-theme-accent"
                >
                  Message on WhatsApp
                </a>
                <button onClick={handleReset} className="btn-theme-outline">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saeed Al-Wadaie"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] transition"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Phone / WhatsApp *
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
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Date & Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Expected Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) =>
                        setFormData({ ...formData, travelDate: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Number of Travellers
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={formData.numberOfTravellers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfTravellers: Number(e.target.value),
                        })
                      }
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Message / Requirements */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Special Requests / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Need Arabic speaking driver, pool villa, wheelchair assistance, etc."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] transition"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-theme w-full flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Enquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Enquiry Now
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
