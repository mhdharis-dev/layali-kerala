"use client";

import React, { useState } from "react";
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
      <span className="section-tag">Send Us A Message</span>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57] mt-1 mb-6">
        How Can We Help You?
      </h2>

      {submitted ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#232c57]">
            Thank You For Reaching Out!
          </h3>
          <p className="text-sm text-[#818090] max-w-md mx-auto">
            Your message has been received. Our travel representative will get back to you within 24 hours.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setSubmitted(false)}
              className="btn-theme text-xs"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs">
              {errorMsg}
            </div>
          )}

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdullah Rahman"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Your Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. abdullah@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Phone Number (with country code)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+91 / +966 / +971..."
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Subject
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Family package inquiry, Medical consultation"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-[#1E293B] mb-1">
              Your Message or Requirements *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your desired travel dates, destination preferences, hotel category, or any questions..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-theme w-full flex items-center justify-center gap-2 py-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
