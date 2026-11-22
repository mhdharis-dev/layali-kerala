"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Do not render public footer in admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#232c57] text-white pt-16 pb-8 border-t-4 border-[#F79837]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="relative h-14 w-48 bg-white/10 p-2 rounded-lg">
              <Image
                src="/assets/img/logo.png"
                alt="Layali Kerala"
                fill
                className="object-contain brightness-200"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Layali Kerala is a premier travel & tourism management company with over a decade of dedicated service. We are Kerala’s trusted Arab-focused travel partner, specializing in customized tours, medical tourism, luxury houseboats, and private chauffeur services.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/layalikerala/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F79837] transition text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/layali_kerala_official/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F79837] transition text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCL7s3lsYUWdUbpd5HgSP_-Q"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F79837] transition text-white"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-5 uppercase tracking-wider border-b border-white/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#F79837] flex items-center gap-2 transition">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F79837]" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F79837] flex items-center gap-2 transition">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F79837]" /> About Layali Kerala
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#F79837] flex items-center gap-2 transition">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F79837]" /> Kerala Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#F79837] flex items-center gap-2 transition">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F79837]" /> Tourist Destinations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F79837] flex items-center gap-2 transition">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F79837]" /> Contact & Enquiries
                </Link>
              </li>
              <li>
                <a
                  href="https://g.page/r/CV4PpC6XcSgQEB0/review"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F79837] flex items-center gap-2 transition text-yellow-400 font-medium"
                >
                  <ArrowRight className="w-3.5 h-3.5" /> Google Review Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Services */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-5 uppercase tracking-wider border-b border-white/20 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F79837]" />
                <span>Customized Kerala Tour Packages</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F79837]" />
                <span>Medical Tourism Coordination</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F79837]" />
                <span>Luxury Houseboat & Resort Booking</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F79837]" />
                <span>Arabic Chauffeur & Taxi Services</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F79837]" />
                <span>Flight Tickets & Visa Assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#F79837]" />
                <span>Halal Dining & Family Care</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-5 uppercase tracking-wider border-b border-white/20 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-3.5 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F79837] shrink-0 mt-0.5" />
                <span>
                  Al Hazmi Tower, Pattambi Road, Perinthalmanna, Kerala - 679322, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F79837] shrink-0" />
                <a href="tel:09605695729" className="hover:text-[#F79837] transition">
                  +91 9605 695 729 / 096056 95729
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F79837] shrink-0" />
                <a href="mailto:info@layalikerala.com" className="hover:text-[#F79837] transition">
                  info@layalikerala.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                <Clock className="w-4 h-4 text-[#F79837] shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM | 24/7 Helpline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>
            © {new Date().getFullYear()} <span className="text-white font-medium">Layali Kerala</span>. All Rights Reserved. Single-Agency Tourism Platform.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition">Privacy & Ethics</Link>
            <Link href="/contact" className="hover:text-white transition">Support</Link>
            <Link href="/admin/login" className="hover:text-white text-gray-400 transition">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
