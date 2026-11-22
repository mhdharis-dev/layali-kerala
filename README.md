# Layali Kerala – Travel & Tourism Management Platform

A digital travel platform built for **Layali Kerala** (Perinthalmanna, Kerala), featuring a customer-facing website and an internal staff admin dashboard.

Designed following the exact brand identity, typography, and color palette from [layalikerala.com](https://layalikerala.com/).

---

## 🌴 Brand Theme & Typography

- **Primary Brand Color (`--main-color`)**: `#232c57` (Deep Navy Blue)
- **Primary Text (`--black-color`)**: `#2B2540`
- **Paragraph Text (`--paragraph-color`)**: `#818090`
- **Background Tint (`--bg-color`)**: `#F3F6FD`
- **Accent Highlight (`--accent-color`)**: `#F79837` (Warm Golden Amber)
- **Headings Font**: `Josefin Sans`, sans-serif
- **Body Font**: `Poppins`, sans-serif
- **Official Assets**: High-resolution logo, icons, and curated destination photography downloaded directly from the live agency domain.

---

## 🚀 Phase 1 Architecture & Features

### 1. Customer Website Pages
1. **Home Page (`/`)**:
   - Branded Top Bar with contact info (`+91 9605 695 729`, `info@layalikerala.com`), Perinthalmanna address, and social links.
   - Interactive Hero Carousel with slide controls, indicators, and quick consultation search bar (destination & tour category).
   - Core Services Section (Tour Packages, Medical Tourism, Hotels & Resorts, Taxi & Chauffeurs, Flight Assistance).
   - Explore Kerala Destinations Grid (Munnar, Alleppey, Wayanad, Kochi, Thekkady, Kovalam).
   - Handcrafted Tour Packages Showcase with starting prices, durations, and quick "Enquire Now" modal.
   - Why Choose Layali Kerala (10+ years experience, Arab-focused hospitality, halal dining, 24/7 dedicated support).
   - Verified Customer Testimonials featuring authentic Arab & international travelers (Waleed Al-Balushi, Saeed Al-Wadaie, Mohammed Al-Sayed).
   - Sticky "Review Us" widget & floating WhatsApp instant chat button.
2. **About Us (`/about`)**:
   - Company background & 10+ year hospitality legacy.
   - Vision & Mission statements.
   - Detailed services breakdown (Tour Packages, Medical Tourism, Hotel Bookings, Chauffeur Fleet, Visa & Flight Desk).
   - Head office contact box in Perinthalmanna.
3. **Tour Packages Catalog (`/packages`)**:
   - Dynamic search by keyword or destination.
   - Category filtering (Honeymoon, Luxury, Nature, Medical, Popular).
   - Comprehensive package cards with price per person, duration, and one-click enquiry modal.
4. **Package Details (`/packages/[slug]`)**:
   - High-resolution photo gallery with active thumbnail selector.
   - Package overview & key specifications (Category, Duration, Transport type).
   - Day-wise detailed itinerary with timeline cards, activity tags, and meal plans.
   - Inclusions and Exclusions checklist (green checkmarks & red cross icons).
   - Accommodation & stay details.
   - Embedded interactive booking form with real-time database submission.
5. **Kerala Destinations (`/destinations` & `/destinations/[slug]`)**:
   - Destination guide covering climate, best time to visit, and must-visit attractions.
   - Direct integration showing all packages visiting that destination.
6. **Contact Us (`/contact`)**:
   - Agency office address at Al Hazmi Tower, Pattambi Road, Perinthalmanna.
   - Direct click-to-call, click-to-email, and click-to-WhatsApp links.
   - Interactive Google Maps embed.
   - Customer Contact Form saving directly to database with instant confirmation.

---

### 2. Admin Dashboard & CRM (`/admin`)
- **Protected Access**: Session-based JWT authentication with HTTP-only cookies and automatic redirect middleware.
- **Operations Dashboard (`/admin`)**:
  - Live KPI metrics: Total Enquiries, New Leads, Active Packages, Destinations, Contact Messages.
  - Pipeline status counters: `New`, `Contacted`, `Follow-up`, `Confirmed`, `Closed`.
  - Recent enquiries table with inline status changer, one-click WhatsApp chat, and direct calling.
  - Recent contact messages preview.
- **Enquiry Management (`/admin/enquiries`)**:
  - Status filter tabs (`All`, `New`, `Contacted`, `Follow-up`, `Confirmed`, `Closed`).
  - Search by customer name, phone, or package.
  - Inline lead status selector.
  - Internal staff notes editor (record quotes, customer preferences).
  - One-click WhatsApp message button pre-filled with customer greeting.
  - Delete enquiry option.
- **Package Management (`/admin/packages`)**:
  - Add, edit, delete, and toggle draft/published status.
  - Control pricing, duration (days/nights), category, inclusions, exclusions, and accommodation notes.
- **Destination Management (`/admin/destinations`)**:
  - Add, edit, delete tourist spots.
  - Manage attractions, best travel months, and description.
- **Hero Banner Management (`/admin/banners`)**:
  - Control homepage slides, headlines, promotional subtitles, and CTA buttons.
- **Website Content & Settings (`/admin/content`)**:
  - Edit phone numbers, WhatsApp link, email, office address, About Us copy, vision, mission, and Google Maps embed without changing source code.
- **Admin Users Management (`/admin/admins`)**:
  - Manage authorized staff accounts with role-based access (`superadmin`, `manager`, `staff`).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) + React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS Variables matching `layalikerala.com` |
| **Icons** | Lucide React |
| **Database ORM** | Prisma ORM |
| **Database** | SQLite (`dev.db` for zero-setup local dev; switchable to PostgreSQL via `DATABASE_URL`) |
| **Authentication** | Secure JWT (`jose`) in HTTP-only cookies + bcryptjs password hashing |

---

## 🔐 Default Admin Credentials

- **Login URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@layalikerala.com`
- **Password**: `admin123`

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database & Seed Initial Data
```bash
npx prisma db push
node prisma/seed.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the admin control panel.

### 4. Build for Production
```bash
npm run build
npm run start
```
