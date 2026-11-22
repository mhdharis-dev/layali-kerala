"use client";

import React, { useState } from "react";
import { Users, Plus, ShieldCheck, X, Loader2, Key } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminsManagerClient({
  initialAdmins,
}: {
  initialAdmins: AdminUser[];
}) {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setAdmins((prev) => [...prev, data.admin]);
        setModalOpen(false);
        setFormData({ name: "", email: "", password: "", role: "staff" });
      } else {
        setErrorMsg(data.error || "Failed to create admin");
      }
    } catch (err) {
      setErrorMsg("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#232c57]">
            Authorized Admin Accounts
          </h1>
          <p className="text-xs text-[#818090] mt-1">
            Manage staff credentials and roles for the Layali Kerala administration portal.
          </p>
        </div>
        <button
          onClick={() => {
            setErrorMsg("");
            setModalOpen(true);
          }}
          className="btn-theme text-xs py-2 px-4 flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add Admin User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F3F6FD] text-[#232c57] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-6">Staff Name</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Assigned Role</th>
                <th className="py-3.5 px-6">Account Created</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#1E293B]">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-bold text-sm text-[#232c57]">
                    {admin.name}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-700">
                    {admin.email}
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#232c57]/10 text-[#232c57] font-bold text-[11px] px-2.5 py-0.5 rounded-full capitalize">
                      {admin.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-green-600 font-semibold flex items-center justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-heading text-lg font-bold text-[#232c57]">
                Create Admin Account
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

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Travel Operations Manager"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="staff@layalikerala.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] bg-white"
                >
                  <option value="staff">Staff (View & update enquiries)</option>
                  <option value="manager">Manager (Manage packages & content)</option>
                  <option value="superadmin">Superadmin (Full system privileges)</option>
                </select>
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
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
