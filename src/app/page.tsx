import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HomeClientSection from "@/components/home/HomeClientSection";
import {
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  Shield,
  HeartHandshake,
  Users,
  Award,
  ArrowRight,
  Plane,
  Car,
  Hotel,
  Stethoscope,
  Sparkles,
} from "lucide-react";

export const revalidate = 0; // Fresh dynamic data

export default async function HomePage() {
  const [banners, destinations, packages] = await Promise.all([
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    }),
    prisma.destination.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { name: "asc" },
    }),
    prisma.package.findMany({
      where: { active: true },
      take: 6,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        destination: true,
      },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Client Interactive Hero Slider & Quick Search */}
      <HomeClientSection banners={banners} />

      {/* 2. Popular Travel Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag">What We Offer</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#232c57] mt-2 mb-4">
              Comprehensive Travel & Hospitality Services
            </h2>
            <p className="text-[#818090] text-base">
              From bespoke Kerala family holidays to medical treatment coordination and luxury transport, we take care of every detail so you can travel with complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Service 1 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Compass className="w-8 h-8 text-[#232c57]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Tour Packages
              </h3>
              <p className="text-xs text-[#818090] leading-relaxed">
                Exclusive & customizable tour packages across God’s Own Country and all major Indian destinations.
              </p>
              <Link href="/packages" className="mt-4 text-xs font-semibold text-[#232c57] hover:underline flex items-center gap-1">
                Explore Packages <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Stethoscope className="w-8 h-8 text-[#232c57]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Medical Tourism
              </h3>
              <p className="text-xs text-[#818090] leading-relaxed">
                Seamless coordination with Kerala’s top hospitals, specialized doctors, and authentic Ayurveda wellness retreats.
              </p>
              <Link href="/contact" className="mt-4 text-xs font-semibold text-[#232c57] hover:underline flex items-center gap-1">
                Enquire Healthcare <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Hotel className="w-8 h-8 text-[#232c57]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Hotels & Resorts
              </h3>
              <p className="text-xs text-[#818090] leading-relaxed">
                Preferential rates and VIP hospitality at 4-star and 5-star hill resorts, private pool villas, and Alleppey houseboats.
              </p>
              <Link href="/packages" className="mt-4 text-xs font-semibold text-[#232c57] hover:underline flex items-center gap-1">
                View Stays <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-[#232c57]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Taxi & Chauffeur
              </h3>
              <p className="text-xs text-[#818090] leading-relaxed">
                Dedicated luxury sedans, SUVs, and tempo travellers with polite, Arabic and English-speaking chauffeurs.
              </p>
              <Link href="/contact" className="mt-4 text-xs font-semibold text-[#232c57] hover:underline flex items-center gap-1">
                Book Cab <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Service 5 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <Plane className="w-8 h-8 text-[#232c57]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#232c57] mb-2">
                Flight & Travel Help
              </h3>
              <p className="text-xs text-[#818090] leading-relaxed">
                Airline ticket bookings, visit visa guidance, embassy attestation, Umrah packages, and multilingual translation.
              </p>
              <Link href="/contact" className="mt-4 text-xs font-semibold text-[#232c57] hover:underline flex items-center gap-1">
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Kerala Destinations Section */}
      <section className="py-20 bg-[#F3F6FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="section-tag">Explore Destinations</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#232c57] mt-1">
                Mind-Blowing Beauty That Makes Your Day
              </h2>
            </div>
            <Link
              href="/destinations"
              className="mt-4 md:mt-0 font-heading text-sm font-semibold text-[#232c57] hover:text-[#F79837] flex items-center gap-1.5 transition"
            >
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="travel-card bg-white rounded-xl overflow-hidden group shadow-sm flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={dest.coverImage || "/assets/img/3.jpg"}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#232c57] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {dest.location.split(",")[0]}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-heading text-2xl font-bold text-white mb-1 drop-shadow-sm">
                      {dest.name}
                    </h3>
                    <p className="text-white/90 text-xs line-clamp-1 drop-shadow-sm">
                      {dest.touristAttractions.split("\n")[0]}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <p className="text-sm text-[#818090] line-clamp-3 mb-4">
                      {dest.description}
                    </p>
                    <div className="bg-[#F3F6FD] p-3 rounded-lg text-xs text-[#1E293B] mb-4">
                      <span className="font-semibold block text-[#232c57] mb-1">Best Season:</span>
                      {dest.bestTimeToVisit}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="text-sm font-bold text-[#232c57] hover:text-[#F79837] flex items-center gap-1 transition"
                    >
                      Explore Destination <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/packages?destination=${encodeURIComponent(dest.name)}`}
                      className="text-xs bg-[#232c57]/10 text-[#232c57] font-semibold px-2.5 py-1 rounded hover:bg-[#232c57] hover:text-white transition"
                    >
                      View Packages
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Tour Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag">Featured Packages</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#232c57] mt-2 mb-4">
              Handcrafted Kerala Tour Packages
            </h2>
            <p className="text-[#818090] text-base">
              Explore our best-selling itineraries covering misty mountain hills, emerald tea gardens, tranquil backwater cruises, and wildlife safaris.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="travel-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={pkg.coverImage || "/assets/img/1.jpg"}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#232c57] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pkg.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#232c57] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F79837]" />
                      {pkg.durationDays}D / {pkg.durationNights}N
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#818090] mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#F79837]" />
                      <span>{pkg.destinationName}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#232c57] mb-2 line-clamp-1 hover:text-[#F79837] transition">
                      <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
                    </h3>

                    <p className="text-sm text-[#818090] line-clamp-2 mb-4">
                      {pkg.overview}
                    </p>

                    <div className="bg-[#F3F6FD] p-3 rounded-lg text-xs space-y-1 mb-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span className="truncate">Private Chauffeur & Vehicle</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span className="truncate">Handpicked Resort & Stays</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                  <div className="flex items-baseline justify-between mb-4 pt-4">
                    <div>
                      <span className="text-xs text-[#818090] block">Starting From</span>
                      <span className="text-2xl font-bold text-[#232c57] font-heading">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-400"> / person</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="btn-theme-outline text-xs text-center py-2.5"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/packages/${pkg.slug}#enquiry`}
                      className="btn-theme text-xs text-center py-2.5"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/packages" className="btn-theme">
              View All Tour Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Layali Kerala Section */}
      <section className="py-20 bg-[#232c57] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#F79837] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Decade of Excellence
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Why Discerning Travellers Choose Layali Kerala
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                Layali Kerala keeps close and professional connection with leading hotels, luxury resorts, and multi-specialty hospitals in different parts of Kerala. With over 10 years of trusted hospitality, we treat every guest like family.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-[#F79837] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base mb-1">
                      10+ Years Tradition
                    </h4>
                    <p className="text-xs text-gray-300">
                      Unrivalled local network across Munnar, Alleppey, Wayanad & Cochin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-[#F79837] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base mb-1">
                      Arab-Focused Hospitality
                    </h4>
                    <p className="text-xs text-gray-300">
                      Fluent Arabic guides, family privacy protocols, and certified halal cuisine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-[#F79837] shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base mb-1">
                      Transparent Pricing
                    </h4>
                    <p className="text-xs text-gray-300">
                      Direct agency pricing with zero hidden surcharges and premium vehicles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-[#F79837] shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base mb-1">
                      24/7 Dedicated Care
                    </h4>
                    <p className="text-xs text-gray-300">
                      Personal tour coordinator available round-the-clock throughout your stay.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/about" className="btn-theme-accent">
                  Discover Our Story
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src="/assets/img/common/about-three.png"
                  alt="Layali Kerala Hospitality"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-[#232c57] p-6 rounded-xl shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#232c57] text-[#F79837] rounded-full flex items-center justify-center font-bold text-xl">
                    10+
                  </div>
                  <div>
                    <div className="font-heading font-bold text-lg">Years of Trust</div>
                    <div className="text-xs text-[#818090]">Thousands of happy travellers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials Section (Real Arab & International feedback) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag">Guest Reviews</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#232c57] mt-2 mb-4">
              What Our Travellers Say
            </h2>
            <p className="text-[#818090] text-base">
              Verified experiences from guests across Saudi Arabia, Oman, UAE, and India who explored Kerala with Layali Kerala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-8 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F79837] mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-[#1E293B] italic mb-6 leading-relaxed">
                  "تجربة رائعة جداً مع ليالي كيرلا. السائق كان يتحدث العربية بطلاقة والسيارة فاخرة ونظيفة. اهتمام استثنائي بالعائلة من المطار وحتى المغادرة. شكراً لكم."
                </p>
                <p className="text-xs text-[#818090] mb-6">
                  "Truly wonderful experience with Layali Kerala. The chauffeur was fluent in Arabic, the car was luxury and spotless. Exceptional family care from airport pickup to departure."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-200/80 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#232c57] text-white flex items-center justify-center font-bold text-sm">
                  و
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#232c57] text-sm">
                    وليد البلوشي (Waleed Al-Balushi)
                  </h4>
                  <span className="text-xs text-[#818090]">Muscat, Oman</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-8 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F79837] mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-[#1E293B] italic mb-6 leading-relaxed">
                  "حجزنا منتجع مونار والهاوس بوت في ألبي. الخدمة كانت تفوق التوقعات والأسعار ممتازة جداً بدون أي تعقيد. أفضل مكتب سياحي في كيرلا بلا منازع."
                </p>
                <p className="text-xs text-[#818090] mb-6">
                  "We booked Munnar resort and houseboat in Alleppey. Service exceeded expectations and prices were very competitive. Hands down the best agency in Kerala."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-200/80 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#232c57] text-white flex items-center justify-center font-bold text-sm">
                  س
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#232c57] text-sm">
                    سعيد الوداعي (Saeed Al-Wadaie)
                  </h4>
                  <span className="text-xs text-[#818090]">Riyadh, Saudi Arabia</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="travel-card bg-[#F3F6FD] rounded-xl p-8 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F79837] mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-[#1E293B] italic mb-6 leading-relaxed">
                  "استفدنا من خدمات السياحة العلاجية والمنتجعات الصحية بإشراف فريق ليالي كيرلا في برينتلمانّا. ترتيب المواعيد والمستشفيات كان احترافياً للغاية."
                </p>
                <p className="text-xs text-[#818090] mb-6">
                  "We utilized medical tourism and Ayurvedic wellness under the supervision of Layali Kerala team in Perinthalmanna. Hospital appointments and transfers were flawless."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-200/80 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#232c57] text-white flex items-center justify-center font-bold text-sm">
                  م
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#232c57] text-sm">
                    محمد السيد (Mohammed Al-Sayed)
                  </h4>
                  <span className="text-xs text-[#818090]">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-16 bg-[#181f3d] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F79837]">
            Start Your Journey Today
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2 mb-4 text-white">
            Ready to Experience the Magic of Kerala?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Tell us your travel preferences, family size, and dates. Our specialists will craft a bespoke itinerary tailored precisely to your budget and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-theme-accent">
              Get Free Tour Quote
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=09605695729"
              target="_blank"
              rel="noreferrer"
              className="btn-hero-outline"
            >
              Chat on WhatsApp (+91 9605 695 729)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
