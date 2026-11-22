"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Loader2, ArrowUp, ArrowDown } from "lucide-react";

interface BannerItem {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaLink: string | null;
  order: number;
  active: boolean;
}

export default function BannersManagerClient({
  initialBanners,
}: {
  initialBanners: BannerItem[];
}) {
  const [banners, setBanners] = useState<BannerItem[]>(initialBanners);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "/assets/img/1.jpg",
    ctaText: "Explore Packages",
    ctaLink: "/packages",
    order: 1,
    active: true,
  });

  const openCreateModal = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      subtitle: "",
      imageUrl: "/assets/img/1.jpg",
      ctaText: "Explore Packages",
      ctaLink: "/packages",
      order: banners.length + 1,
      active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (b: BannerItem) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      subtitle: b.subtitle || "",
      imageUrl: b.imageUrl,
      ctaText: b.ctaText || "Explore Packages",
      ctaLink: b.ctaLink || "/packages",
      order: b.order,
      active: b.active,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      if (editingBanner) {
        const res = await fetch("/api/banners", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingBanner.id, ...formData }),
        });
        const data = await res.json();
        if (res.ok) {
          setBanners((prev) =>
            prev.map((b) => (b.id === editingBanner.id ? data.banner : b))
          );
          setModalOpen(false);
        } else {
          setErrorMsg(data.error || "Failed to update banner");
        }
      } else {
        const res = await fetch("/api/banners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setBanners((prev) => [...prev, data.banner]);
          setModalOpen(false);
        } else {
          setErrorMsg(data.error || "Failed to create banner");
        }
      }
    } catch (err) {
      setErrorMsg("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      const res = await fetch(`/api/banners?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
            Homepage Banner Management
          </h1>
          <p className="text-xs text-[#818090] mt-1">
            Customize top slides, promotional slogans, background imagery, and call-to-actions.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-theme text-xs py-2 px-4 flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add New Banner
        </button>
      </div>

      <div className="space-y-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="relative h-32 w-full sm:w-56 rounded-lg overflow-hidden shrink-0">
              <Image
                src={b.imageUrl}
                alt={b.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#232c57] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Slide #{b.order}
              </div>
            </div>

            <div className="flex-grow space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-[#232c57]">
                  {b.title}
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    b.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {b.active ? "Active" : "Hidden"}
                </span>
              </div>
              <p className="text-xs text-[#818090] max-w-xl">{b.subtitle}</p>
              <div className="text-xs text-gray-400 pt-1">
                Button: <code className="text-[#232c57] bg-[#F3F6FD] px-1 py-0.5 rounded">{b.ctaText}</code> → <code className="text-[#232c57] bg-[#F3F6FD] px-1 py-0.5 rounded">{b.ctaLink}</code>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openEditModal(b)}
                className="p-2 text-gray-600 hover:text-[#232c57] hover:bg-gray-100 rounded-lg transition"
                title="Edit Banner"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg transition"
                title="Delete Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-heading text-lg font-bold text-[#232c57]">
                {editingBanner ? "Edit Slide Banner" : "New Slide Banner"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Main Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Subtitle Slogan
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Background Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E293B] mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) =>
                      setFormData({ ...formData, ctaText: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1E293B] mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) =>
                      setFormData({ ...formData, ctaLink: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className="w-4 h-4 text-[#232c57]"
                  />
                  <span>Active & Visible</span>
                </label>

                <div className="flex items-center gap-2">
                  <span>Display Order:</span>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: Number(e.target.value) })
                    }
                    className="w-16 p-1 border rounded text-center"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-theme-outline text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-theme text-xs py-1.5 px-5 flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
