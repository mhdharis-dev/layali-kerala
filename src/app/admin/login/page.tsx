"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("admin@layalikerala.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <div className="relative h-14 w-44 mx-auto mb-4">
          <Image
            src="/assets/img/logo.png"
            alt="Layali Kerala"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#232c57]">
          Admin Control Panel
        </h1>
        <p className="text-xs text-[#818090] mt-1">
          Sign in to manage tour packages, destinations & enquiries
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#1E293B] mb-1">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="email"
              required
              placeholder="admin@layalikerala.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] text-[#1E293B]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-[#1E293B] mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#232c57] text-[#1E293B]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Hint Box */}
        <div className="bg-[#F3F6FD] p-3 rounded-lg text-xs text-[#1E293B]">
          <span className="font-semibold block text-[#232c57] mb-0.5">
            Default Credentials:
          </span>
          Email: <code className="bg-white px-1 py-0.5 rounded text-[#232c57]">admin@layalikerala.com</code>
          <br />
          Password: <code className="bg-white px-1 py-0.5 rounded text-[#232c57]">admin123</code>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-theme w-full flex items-center justify-center gap-2 py-3 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" /> Log In to Dashboard
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#181f3d] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="bg-white rounded-2xl p-8 text-center text-xs text-gray-500">
              Loading admin login...
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Layali Kerala Management System
        </p>
      </div>
    </div>
  );
}
