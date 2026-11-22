import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Compass,
  Award,
  Eye,
  Target,
  ShieldCheck,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Building2,
  Stethoscope,
  Hotel,
  Car,
  Plane,
} from "lucide-react";

export const revalidate = 0;

export default async function AboutPage() {
  const settingsRecords = await prisma.websiteSetting.findMany();
  const settings: Record<string, string> = {};
  settingsRecords.forEach((item) => {
    settings[item.key] = item.value;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-[#181f3d] text-white">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/assets/img/2.jpg"
            alt="Kerala Hills"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#F79837] font-bold">
            Know More About Us
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4 text-white">
            About Layali Kerala
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Over a decade of excellence in tourism management, delivering unforgettable Kerala journeys with personalized Arabic and international hospitality.
          </p>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Collage */}
            <div className="relative">
              <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-[#F3F6FD]">
                <Image
                  src="/assets/img/common/about-three.png"
                  alt="Layali Kerala Team & Travelers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#232c57] text-white p-6 rounded-xl shadow-xl max-w-xs hidden sm:block">
                <span className="text-3xl font-bold text-[#F79837] font-heading block">10+</span>
                <span className="text-sm font-semibold text-white">Years of Trusted Travel Services</span>
              </div>
            </div>

            {/* Right Text */}
            <div className="space-y-6">
              <span className="section-tag">Welcome to Layali Kerala</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#232c57] leading-tight">
                Decade of Expertise, Trusted Guides & Family-Like Hospitality
              </h2>
              <p className="text-[#818090] text-sm sm:text-base leading-relaxed">
                {settings.about_intro ||
                  "Layali Kerala is a leading travel management company with a tradition of more than 10 years. We are in the tourism and holiday management industry helping visitors explore God’s Own Country with highest standards of luxury, privacy, and warmth."}
              </p>
              <p className="text-[#818090] text-sm sm:text-base leading-relaxed">
                Headquartered at Al Hazmi Tower in Perinthalmanna, Kerala, we have built a reputation as the foremost Arab-focused travel partner. We maintain strong, long-standing connections with the finest 4-star and 5-star hotels, luxury mountain resorts, Ayurvedic hospitals, and transportation fleets across South India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#1E293B] font-medium">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Licensed Kerala Tour Agency</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1E293B] font-medium">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Arabic Speaking Chauffeurs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1E293B] font-medium">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Certified Halal Dining Guidance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1E293B] font-medium">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>24/7 Ground Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 bg-[#F3F6FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#232c57]/10 text-[#232c57] flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#F79837]">
                  Our Philosophy
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#232c57] mt-1 mb-4">
                  Our Vision
                </h3>
                <p className="text-[#818090] text-sm sm:text-base leading-relaxed">
                  {settings.vision ||
                    "To be the most reliable, hospitable, and preferred travel partner for international and domestic tourists exploring Kerala, delivering seamless personalized experiences with family-like care."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#232c57]">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Ethical & Trustworthy Tourism Standards
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#F79837]/15 text-[#F79837] flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#232c57]">
                  Our Commitment
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#232c57] mt-1 mb-4">
                  Our Mission
                </h3>
                <p className="text-[#818090] text-sm sm:text-base leading-relaxed">
                  {settings.mission ||
                    "To deliver tailored, ethical, and high-value travel solutions with multilingual guidance, transparent pricing, premium accommodations, and dedicated Arabic-speaking support."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#232c57]">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Personalized Care For Every Traveler
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag">What We Do</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#232c57] mt-2 mb-4">
              Comprehensive Travel & Tourism Solutions
            </h2>
            <p className="text-[#818090] text-sm sm:text-base">
              Layali Kerala handles every aspect of your travel journey from arrival to departure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="travel-card bg-[#F3F6FD] p-6 rounded-xl">
              <Compass className="w-8 h-8 text-[#232c57] mb-3" />
              <h4 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Tour Packages
              </h4>
              <p className="text-xs text-[#818090] leading-relaxed mb-4">
                We offer exclusive and customizable tour packages to meet the needs of visitors. Apart from Kerala, we also have special packages across India and international destinations.
              </p>
              <Link href="/packages" className="text-xs font-semibold text-[#232c57] hover:underline">
                View Packages →
              </Link>
            </div>

            <div className="travel-card bg-[#F3F6FD] p-6 rounded-xl">
              <Stethoscope className="w-8 h-8 text-[#232c57] mb-3" />
              <h4 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Medical Tourism
              </h4>
              <p className="text-xs text-[#818090] leading-relaxed mb-4">
                Kerala is a global hub for both modern super-specialty medicine and ancient Ayurveda. We help visitors find the best hospitals, consult leading doctors, and schedule therapeutic treatments.
              </p>
              <Link href="/contact" className="text-xs font-semibold text-[#232c57] hover:underline">
                Enquire Healthcare →
              </Link>
            </div>

            <div className="travel-card bg-[#F3F6FD] p-6 rounded-xl">
              <Hotel className="w-8 h-8 text-[#232c57] mb-3" />
              <h4 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Hotels & Resorts Booking
              </h4>
              <p className="text-xs text-[#818090] leading-relaxed mb-4">
                Enjoy special contracted rates with leading resorts in Munnar, backwater pool villas in Kumarakom and Alleppey, and prime hotels in Kochi.
              </p>
              <Link href="/packages" className="text-xs font-semibold text-[#232c57] hover:underline">
                Explore Stays →
              </Link>
            </div>

            <div className="travel-card bg-[#F3F6FD] p-6 rounded-xl">
              <Car className="w-8 h-8 text-[#232c57] mb-3" />
              <h4 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Taxi & Transportation
              </h4>
              <p className="text-xs text-[#818090] leading-relaxed mb-4">
                Experienced, disciplined drivers with clean, air-conditioned vehicles. Chauffeurs understand Arabic and English, making navigation completely stress-free.
              </p>
              <Link href="/contact" className="text-xs font-semibold text-[#232c57] hover:underline">
                Book Chauffeur →
              </Link>
            </div>

            <div className="travel-card bg-[#F3F6FD] p-6 rounded-xl">
              <Plane className="w-8 h-8 text-[#232c57] mb-3" />
              <h4 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Flight Tickets & Assistance
              </h4>
              <p className="text-xs text-[#818090] leading-relaxed mb-4">
                Airline ticket bookings, visit visas, job visas, embassy attestation, school tours, Umrah packages, and professional Arabic translation services.
              </p>
              <Link href="/contact" className="text-xs font-semibold text-[#232c57] hover:underline">
                Contact Desk →
              </Link>
            </div>

            <div className="travel-card bg-[#F3F6FD] p-6 rounded-xl">
              <Users className="w-8 h-8 text-[#232c57] mb-3" />
              <h4 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Family & Group Tours
              </h4>
              <p className="text-xs text-[#818090] leading-relaxed mb-4">
                Complete discretion, private multi-room suites, halal food options, and custom tempos for large families traveling together from GCC countries.
              </p>
              <Link href="/packages" className="text-xs font-semibold text-[#232c57] hover:underline">
                Family Packages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Contact Box */}
      <section className="py-16 bg-[#232c57] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-white">
            Visit Our Head Office in Perinthalmanna
          </h3>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-8">
            {settings.address || "Al Hazmi Tower, Pattambi Road, Perinthalmanna, Kerala - 679322, India"}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="tel:09605695729"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition"
            >
              <Phone className="w-4 h-4 text-[#F79837]" />
              <span>{settings.phone || "+91 9605 695 729"}</span>
            </a>
            <a
              href="mailto:info@layalikerala.com"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition"
            >
              <Mail className="w-4 h-4 text-[#F79837]" />
              <span>{settings.email || "info@layalikerala.com"}</span>
            </a>
            <Link href="/contact" className="btn-theme-accent">
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
