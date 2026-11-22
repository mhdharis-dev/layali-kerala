"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  Clock,
  MapPin,
  X,
  Loader2,
} from "lucide-react";

interface PackageItem {
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
  featured: boolean;
  active: boolean;
}

interface DestinationItem {
  id: string;
  name: string;
}

interface PackagesManagerClientProps {
  initialPackages: PackageItem[];
  destinations: DestinationItem[];
}

export default function PackagesManagerClient({
  initialPackages,
  destinations,
}: PackagesManagerClientProps) {
  const [packages, setPackages] = useState<PackageItem[]>(initialPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PackageItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Popular",
    destinationName: "Munnar & Alleppey",
    durationDays: 4,
    durationNights: 3,
    price: 25000,
    coverImage: "/assets/img/1.jpg",
    overview: "",
    inclusions: "Private AC Vehicle with Chauffeur\nHotel / Resort accommodation\nDaily Breakfast\nSightseeing as per itinerary",
    exclusions: "Airfare / Train tickets\nEntry tickets to monuments\nPersonal laundry and tips",
    accommodation: "Premium 4-Star Resort stay + 1 Night Deluxe Houseboat",
    featured: false,
    active: true,
  });

  const openCreateModal = () => {
    setEditingPkg(null);
    setFormData({
      title: "",
      slug: "",
      category: "Popular",
      destinationName: destinations[0]?.name || "Munnar",
      durationDays: 4,
      durationNights: 3,
      price: 25000,
      coverImage: "/assets/img/1.jpg",
      overview: "",
      inclusions: "Private AC Vehicle with Chauffeur\nHotel / Resort accommodation\nDaily Breakfast\nSightseeing as per itinerary",
      exclusions: "Airfare / Train tickets\nEntry tickets to monuments\nPersonal laundry and tips",
      accommodation: "Premium 4-Star Resort stay",
      featured: false,
      active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (pkg: PackageItem) => {
    setEditingPkg(pkg);
    setFormData({
      title: pkg.title,
      slug: pkg.slug,
      category: pkg.category,
      destinationName: pkg.destinationName,
      durationDays: pkg.durationDays,
      durationNights: pkg.durationNights,
      price: pkg.price,
      coverImage: pkg.coverImage || "/assets/img/1.jpg",
      overview: pkg.overview,
      inclusions: pkg.inclusions || "",
      exclusions: pkg.exclusions || "",
      accommodation: pkg.accommodation || "",
      featured: pkg.featured,
      active: pkg.active,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      if (editingPkg) {
        // Update
        const res = await fetch(`/api/packages/${editingPkg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setPackages((prev) =>
            prev.map((p) => (p.id === editingPkg.id ? { ...p, ...formData } : p))
          );
          setModalOpen(false);
        } else {
          setErrorMsg(data.error || "Failed to update package");
        }
      } else {
        // Create
        const res = await fetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setPackages((prev) => [data.package, ...prev]);
          setModalOpen(false);
        } else {
          setErrorMsg(data.error || "Failed to create package");
        }
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (pkg: PackageItem) => {
    const newActive = !pkg.active;
    try {
      await fetch(`/api/packages/${pkg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: newActive }),
      });
      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, active: newActive } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
            Tour Package Management
          </h1>
          <p className="text-xs text-[#818090] mt-1">
            Publish, edit pricing, manage itineraries and feature tour packages on the public website.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-theme text-xs py-2 px-4 flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add New Package
        </button>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={pkg.coverImage || "/assets/img/1.jpg"}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#232c57] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {pkg.category}
                </div>
                {pkg.featured && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-[#818090] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
                  <span>{pkg.destinationName}</span>
                  <span className="mx-1">•</span>
                  <Clock className="w-3.5 h-3.5 text-[#F79837]" />
                  <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#232c57] line-clamp-1 mb-2">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[#818090] line-clamp-2 mb-4">
                  {pkg.overview}
                </p>

                <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
                  <span className="font-heading text-xl font-bold text-[#232c57]">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => toggleStatus(pkg)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      pkg.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {pkg.active ? "Published" : "Draft"}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-[#F3F6FD] px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link
                href={`/packages/${pkg.slug}`}
                target="_blank"
                className="text-[#232c57] font-semibold hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="p-1.5 text-gray-600 hover:text-[#232c57] hover:bg-white rounded transition"
                  title="Edit Package"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded transition"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="font-heading text-xl font-bold text-[#232c57]">
                {editingPkg ? "Edit Tour Package" : "Create New Tour Package"}
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
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Munnar Tea Mist Romantic Escape"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="Auto-generated if empty"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              {/* Category, Destination & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] bg-white"
                  >
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Nature">Nature</option>
                    <option value="Medical">Medical</option>
                    <option value="Popular">Popular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Destination Name
                  </label>
                  <input
                    type="text"
                    value={formData.destinationName}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationName: e.target.value })
                    }
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Starting Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>
              </div>

              {/* Duration & Cover Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Days
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.durationDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationDays: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Nights
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.durationNights}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationNights: Number(e.target.value),
                      })
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
              </div>

              {/* Overview */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Package Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-green-700 mb-1">
                    Inclusions (one item per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.inclusions}
                    onChange={(e) =>
                      setFormData({ ...formData, inclusions: e.target.value })
                    }
                    className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-red-600 mb-1">
                    Exclusions (one item per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.exclusions}
                    onChange={(e) =>
                      setFormData({ ...formData, exclusions: e.target.value })
                    }
                    className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Accommodation */}
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Accommodation Details
                </label>
                <input
                  type="text"
                  value={formData.accommodation}
                  onChange={(e) =>
                    setFormData({ ...formData, accommodation: e.target.value })
                  }
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              {/* Switches */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 text-[#232c57] rounded"
                  />
                  <span>Show as Featured Package</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className="w-4 h-4 text-[#232c57] rounded"
                  />
                  <span>Publish Immediately (Active)</span>
                </label>
              </div>

              {/* Submit Buttons */}
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
                  {editingPkg ? "Save Changes" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
