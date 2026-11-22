"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Star, MessageCircle } from "lucide-react";

export default function FloatingWidgets() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=09605695729&text=Hello%20Layali%20Kerala,%20I%20would%20like%20to%20enquire%20about%20travel%20packages."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-5 z-50 flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group"
        aria-label="WhatsApp Chat"
      >
        <div className="relative w-7 h-7">
          <Image
            src="/assets/img/wtsapp.png"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm font-semibold pr-1.5 hidden sm:inline-block">Chat on WhatsApp</span>
      </a>

      {/* Floating Review Us Widget (from layalikerala.com) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <a
          href="https://g.page/r/CV4PpC6XcSgQEB0/review"
          target="_blank"
          rel="noreferrer"
          className="bg-[#232c57] text-white flex items-center gap-2 px-3 py-2.5 rounded-l-lg shadow-xl hover:bg-[#181f3d] transition-all duration-200 border-l border-t border-b border-[#F79837]/50 group"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/assets/img/icon/icon.png"
              alt="Review Icon"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider hidden md:inline-block font-heading text-yellow-300">
            Review Us
          </span>
        </a>
      </div>
    </>
  );
}
