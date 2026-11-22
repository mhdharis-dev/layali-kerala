"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Plus, Edit2, Trash2, Calendar, Star, X, Loader2, Eye } from "lucide-react";

interface DestinationItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  touristAttractions: string;
  bestTimeToVisit: string;
  coverImage: string | null;
  featured: boolean;
  packageCount: number;
}

export default function DestinationsManagerClient({
  initialDestinations,
}: {
  initialDestinations: DestinationItem[];
}) {
  const [destinations, setDestinations] = useState<DestinationItem[]>(initialDestinations);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<DestinationItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    location: "Central Kerala",
    description: "",
    touristAttractions: "",
    bestTimeToVisit: "September to March",
    coverImage: "/assets/img/3.jpg",
    featured: true,
  });

  const openCreateModal = () => {
    setEditingDest(null);
    setFormData({
      name: "",
      slug: "",
      location: "Kerala",
      description: "",
      touristAttractions: "",
      bestTimeToVisit: "September to March",
      coverImage: "/assets/img/3.jpg",
      featured: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (dest: DestinationItem) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name,
      slug: dest.slug,
      location: dest.location,
      description: dest.description,
      touristAttractions: dest.touristAttractions,
      bestTimeToVisit: dest.bestTimeToVisit,
      coverImage: dest.coverImage || "/assets/img/3.jpg",
      featured: dest.featured,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      if (editingDest) {
        const res = await fetch(`/api/destinations/${editingDest.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setDestinations((prev) =>
            prev.map((d) => (d.id === editingDest.id ? { ...d, ...formData } : d))
          );
          setModalOpen(false);
        } else {
          setErrorMsg(data.error || "Failed to update destination");
        }
      } else {
        const res = await fetch("/api/destinations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setDestinations((prev) => [
            { ...data.destination, packageCount: 0 },
            ...prev,
          ]);
          setModalOpen(false);
        } else {
          setErrorMsg(data.error || "Failed to create destination");
        }
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDestinations((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
            Destination Management
          </h1>
          <p className="text-xs text-[#818090] mt-1">
            Manage tourist spots, attractions, best travel seasons, and location descriptions.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-theme text-xs py-2 px-4 flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full">
                <Image
                  src={dest.coverImage || "/assets/img/3.jpg"}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
                {dest.featured && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <span className="text-xs text-[#818090] flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F79837]" /> {dest.location}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                  {dest.name}
                </h3>
                <p className="text-xs text-[#818090] line-clamp-3 mb-3 leading-relaxed">
                  {dest.description}
                </p>

                <div className="bg-[#F3F6FD] p-2.5 rounded-lg text-xs text-[#1E293B]">
                  <span className="font-semibold block text-[#232c57]">Best Season:</span>
                  <span className="text-gray-600 truncate block">{dest.bestTimeToVisit}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F3F6FD] px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link
                href={`/destinations/${dest.slug}`}
                target="_blank"
                className="text-[#232c57] font-semibold hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> View ({dest.packageCount} tours)
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(dest)}
                  className="p-1.5 text-gray-600 hover:text-[#232c57] hover:bg-white rounded transition"
                  title="Edit Destination"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(dest.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded transition"
                  title="Delete Destination"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-heading text-lg font-bold text-[#232c57]">
                {editingDest ? "Edit Destination" : "Add New Destination"}
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

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Destination Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Munnar"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Location / Region *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Idukki District, Central Kerala"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Key Attractions (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.touristAttractions}
                  onChange={(e) =>
                    setFormData({ ...formData, touristAttractions: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Best Time To Visit
                </label>
                <input
                  type="text"
                  value={formData.bestTimeToVisit}
                  onChange={(e) =>
                    setFormData({ ...formData, bestTimeToVisit: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 text-[#232c57] rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-theme-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-theme text-xs py-2 px-6 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingDest ? "Save Changes" : "Create Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
