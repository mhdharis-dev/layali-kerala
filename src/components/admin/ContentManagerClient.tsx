"use client";

import React, { useState } from "react";
import { Save, CheckCircle, Loader2 } from "lucide-react";

export default function ContentManagerClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to update settings");
      }
    } catch (e) {
      setErrorMsg("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
          Website Content & Agency Information
        </h1>
        <p className="text-xs text-[#818090] mt-1">
          Update phone numbers, WhatsApp, office address, About Us copy, vision, mission, and social media handles without touching the code.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>Website content updated successfully! Public pages are automatically updated.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#232c57] border-b border-gray-100 pb-2">
            Contact & Office Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Display Phone Number
              </label>
              <input
                type="text"
                value={settings.phone || "+91 9605 695 729"}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Official Agency Email
              </label>
              <input
                type="email"
                value={settings.email || "info@layalikerala.com"}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                WhatsApp Link / Number URL
              </label>
              <input
                type="text"
                value={settings.whatsapp || "https://api.whatsapp.com/send?phone=09605695729"}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Google Review Link
              </label>
              <input
                type="text"
                value={settings.google_review || "https://g.page/r/CV4PpC6XcSgQEB0/review"}
                onChange={(e) => handleChange("google_review", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-[#1E293B] mb-1">
              Office Physical Address
            </label>
            <input
              type="text"
              value={settings.address || "Al Hazmi Tower, Pattambi Road, Perinthalmanna, Kerala - 679322, India"}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-[#1E293B] mb-1">
              Google Maps Iframe Embed URL
            </label>
            <textarea
              rows={2}
              value={settings.google_map_embed || ""}
              onChange={(e) => handleChange("google_map_embed", e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
            />
          </div>
        </div>

        {/* Company About Us & Vision / Mission */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#232c57] border-b border-gray-100 pb-2">
            Company Profile, Vision & Mission
          </h2>

          <div className="text-xs space-y-1">
            <label className="block font-semibold text-[#1E293B] mb-1">
              About Us Introduction Paragraph
            </label>
            <textarea
              rows={4}
              value={settings.about_intro || ""}
              onChange={(e) => handleChange("about_intro", e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Company Vision Statement
              </label>
              <textarea
                rows={4}
                value={settings.vision || ""}
                onChange={(e) => handleChange("vision", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Company Mission Statement
              </label>
              <textarea
                rows={4}
                value={settings.mission || ""}
                onChange={(e) => handleChange("mission", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#232c57] border-b border-gray-100 pb-2">
            Social Media Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Facebook Page URL
              </label>
              <input
                type="text"
                value={settings.facebook || "https://www.facebook.com/layalikerala/"}
                onChange={(e) => handleChange("facebook", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                Instagram Profile URL
              </label>
              <input
                type="text"
                value={settings.instagram || "https://www.instagram.com/layali_kerala_official/"}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E293B] mb-1">
                YouTube Channel URL
              </label>
              <input
                type="text"
                value={settings.youtube || "https://www.youtube.com/channel/UCL7s3lsYUWdUbpd5HgSP_-Q"}
                onChange={(e) => handleChange("youtube", e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-theme text-xs py-2.5 px-6 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Website Content
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
