"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, Facebook, Instagram, Youtube, Calendar } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isCurrent = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  // Do not show public navbar in admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Tour Packages", href: "/packages" },
    { label: "Kerala Destinations", href: "/destinations" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#181f3d] text-gray-300 text-xs py-2 border-b border-[#2d3766]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a
              href="tel:09605695729"
              className="flex items-center gap-1.5 hover:text-[#F79837] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#F79837]" />
              <span>+91 9605 695 729</span>
            </a>
            <a
              href="mailto:info@layalikerala.com"
              className="flex items-center gap-1.5 hover:text-[#F79837] transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#F79837]" />
              <span>info@layalikerala.com</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
              <span>Al Hazmi Tower, Perinthalmanna, Kerala</span>
            </span>
          </div>

          {/* Right: Social & Badge */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[#F79837] font-medium tracking-wide">
              Kerala's Trusted Arab-Focused Travel Partner
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/layalikerala/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/layali_kerala_official/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCL7s3lsYUWdUbpd5HgSP_-Q"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/admin/login"
                className="ml-2 text-gray-400 hover:text-white text-[11px] underline underline-offset-2"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-44">
                <Image
                  src="/assets/img/logo.png"
                  alt="Layali Kerala Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-heading text-[15px] font-semibold transition tracking-wide ${
                    isCurrent(link.href)
                      ? "text-[#232c57] border-b-2 border-[#232c57] pb-1"
                      : "text-[#1E293B] hover:text-[#232c57]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/packages"
                className="btn-theme"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book A Tour
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#232c57] p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md font-heading text-base font-semibold ${
                isCurrent(link.href)
                  ? "bg-[#232c57] text-white"
                  : "text-[#1E293B] hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/packages"
              onClick={() => setIsOpen(false)}
              className="btn-theme w-full text-center"
            >
              Explore Tour Packages
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
