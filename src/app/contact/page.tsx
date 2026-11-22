import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ContactFormClient from "@/components/contact/ContactFormClient";
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe, Shield } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  const settingsRecords = await prisma.websiteSetting.findMany();
  const settings: Record<string, string> = {};
  settingsRecords.forEach((item) => {
    settings[item.key] = item.value;
  });

  const phone = settings.phone || "+91 9605 695 729";
  const email = settings.email || "info@layalikerala.com";
  const address =
    settings.address ||
    "Al Hazmi Tower, Pattambi Road, Perinthalmanna, Kerala - 679322, India";
  const mapEmbed =
    settings.google_map_embed ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7327315579766!2d76.22384767568554!3d10.983570655342203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cd768d71fb9b%3A0x6739b615132a0cf4!2sAl%20Hazmi%20Tower!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FD]">
      {/* Banner */}
      <section className="relative py-20 bg-[#181f3d] text-white">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/assets/img/6.jpg"
            alt="Contact Layali Kerala"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#F79837] font-bold">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-3 text-white">
            Contact Layali Kerala
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Have questions about tour itineraries, medical tourism, resort bookings, or chauffeur services? We are here to assist you 24/7.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 1 Col: Contact Info Cards */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#232c57]/10 text-[#232c57] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#F79837]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#232c57] mb-1">
                    Head Office
                  </h4>
                  <p className="text-xs text-[#818090] leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#232c57]/10 text-[#232c57] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#F79837]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#232c57] mb-1">
                    Phone Numbers
                  </h4>
                  <p className="text-xs text-[#818090] leading-relaxed">
                    <a href="tel:09605695729" className="hover:text-[#F79837] block font-semibold text-[#1E293B]">
                      {phone}
                    </a>
                    <span className="block text-[11px] text-gray-400 mt-0.5">
                      24/7 Helpline available
                    </span>
                  </p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#232c57] mb-1">
                    WhatsApp Chat
                  </h4>
                  <p className="text-xs text-[#818090] leading-relaxed mb-2">
                    Direct conversation with Arabic & English speaking consultants.
                  </p>
                  <a
                    href="https://api.whatsapp.com/send?phone=09605695729"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-green-600 hover:underline inline-flex items-center gap-1"
                  >
                    Open WhatsApp Chat →
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#232c57]/10 text-[#232c57] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#F79837]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#232c57] mb-1">
                    Email Address
                  </h4>
                  <p className="text-xs text-[#818090] leading-relaxed">
                    <a href={`mailto:${email}`} className="hover:text-[#F79837] block font-semibold text-[#1E293B]">
                      {email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-[#232c57] text-white rounded-2xl p-6 shadow-sm">
                <h4 className="font-heading font-bold text-base mb-3 flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4 text-[#F79837]" /> Working Hours
                </h4>
                <div className="text-xs text-gray-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold text-white">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold text-white">On Call Support</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/10 text-[#F79837]">
                    <span>Tourist Emergency Helpline:</span>
                    <span className="font-semibold">24 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 2 Cols: Interactive Contact Form & Map */}
            <div className="lg:col-span-2 space-y-8">
              {/* Form Component */}
              <ContactFormClient />

              {/* Google Map Section */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-4">
                <h3 className="font-heading text-lg font-bold text-[#232c57] mb-3 px-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F79837]" /> Location Map - Al Hazmi Tower, Perinthalmanna
                </h3>
                <div className="h-80 w-full rounded-xl overflow-hidden">
                  <iframe
                    src={mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Layali Kerala Office Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
