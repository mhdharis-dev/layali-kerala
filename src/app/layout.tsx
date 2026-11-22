import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";

export const metadata: Metadata = {
  title: "Layali Kerala - Travel & Tourism Management Platform",
  description:
    "Explore God's Own Country with Layali Kerala. Discover Munnar tea hills, Alleppey backwaters, luxury houseboats, and customized family holiday & medical tourism packages.",
  keywords: [
    "Layali Kerala",
    "Kerala Tourism",
    "Munnar Travel",
    "Alleppey Houseboat",
    "Arab Travel Partner Kerala",
    "Kerala Tour Packages",
    "Medical Tourism Kerala",
    "Perinthalmanna Travel Agency",
  ],
  icons: {
    icon: "/assets/img/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FloatingWidgets />
        <Footer />
      </body>
    </html>
  );
}
