const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Layali Kerala database...');

  // 1. Admin Users
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@layalikerala.com' },
    update: {},
    create: {
      name: 'Layali Kerala Admin',
      email: 'admin@layalikerala.com',
      password: hashedPassword,
      role: 'superadmin',
    },
  });
  console.log('Admin account created: admin@layalikerala.com / admin123');

  // 2. Website Settings
  const settings = [
    { key: 'site_title', value: 'Layali Kerala - Travel & Tourism Management' },
    { key: 'site_tagline', value: "Kerala's Trusted Arab-Focused Travel Partner" },
    { key: 'phone', value: '+91 9605 695 729' },
    { key: 'phone_raw', value: '09605695729' },
    { key: 'whatsapp', value: 'https://api.whatsapp.com/send?phone=09605695729' },
    { key: 'email', value: 'info@layalikerala.com' },
    { key: 'address', value: 'Al Hazmi Tower, Pattambi Road, Perinthalmanna, Kerala - 679322, India' },
    { key: 'facebook', value: 'https://www.facebook.com/layalikerala/' },
    { key: 'instagram', value: 'https://www.instagram.com/layali_kerala_official/' },
    { key: 'youtube', value: 'https://www.youtube.com/channel/UCL7s3lsYUWdUbpd5HgSP_-Q' },
    { key: 'google_review', value: 'https://g.page/r/CV4PpC6XcSgQEB0/review' },
    {
      key: 'about_intro',
      value: 'Layali Kerala is a leading travel management company with a tradition of more than 10 years. We specialize in tourism and holiday management, medical tourism coordination, and hospitality services, especially serving international guests from the Gulf and worldwide visiting God’s Own Country.',
    },
    {
      key: 'vision',
      value: 'To be the most reliable, hospitable, and preferred travel partner for international and domestic tourists exploring Kerala, delivering seamless personalized experiences with family-like care.',
    },
    {
      key: 'mission',
      value: 'To deliver tailored, ethical, and high-value travel solutions with multilingual guidance, transparent pricing, premium accommodations, and dedicated Arabic-speaking support.',
    },
    {
      key: 'google_map_embed',
      value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7327315579766!2d76.22384767568554!3d10.983570655342203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cd768d71fb9b%3A0x6739b615132a0cf4!2sAl%20Hazmi%20Tower!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log('Website settings seeded.');

  // 3. Homepage Banners
  await prisma.banner.deleteMany({});
  await prisma.banner.createMany({
    data: [
      {
        title: 'Indulge in the Beauty of Kerala',
        subtitle: "Experience Kerala's misty tea plantations, serene backwaters, and pristine hills with personalized luxury service.",
        imageUrl: '/assets/img/1.jpg',
        ctaText: 'Explore Packages',
        ctaLink: '/packages',
        order: 1,
        active: true,
      },
      {
        title: 'Kerala’s Trusted Arab-Focused Travel Partner',
        subtitle: 'Decade of expertise, Arabic speaking chauffeurs, certified halal dining, and private family resorts.',
        imageUrl: '/assets/img/2.jpg',
        ctaText: 'Discover Destinations',
        ctaLink: '/destinations',
        order: 2,
        active: true,
      },
      {
        title: 'Luxury Houseboats & Rejuvenating Ayurveda',
        subtitle: 'Wake up to the tranquil waters of Alleppey and experience world-renowned authentic Kerala wellness treatments.',
        imageUrl: '/assets/img/3.jpg',
        ctaText: 'Enquire Now',
        ctaLink: '/contact',
        order: 3,
        active: true,
      },
    ],
  });
  console.log('Banners seeded.');

  // 4. Destinations
  await prisma.destination.deleteMany({});
  const munnar = await prisma.destination.create({
    data: {
      name: 'Munnar',
      slug: 'munnar',
      description: 'Munnar rises as three mountain streams join: Mudrapuzha, Nallathanni and Kundala. Situated at around 1600 m above sea level, this hill station was once the summer resort of the erstwhile British Government in South India.',
      location: 'Idukki District, Central Kerala',
      touristAttractions: 'Eravikulam National Park (Nilgiri Tahr)\nMattupetty Dam & Lake\nTea Museum & Lockhart Tea Factory\nTop Station Panorama View\nAttukal Waterfalls & Kundala Lake',
      bestTimeToVisit: 'September to March (Pleasant hills) & June to August (Monsoon greenery)',
      coverImage: '/assets/img/4.jpg',
      featured: true,
      images: {
        create: [
          { url: '/assets/img/4.jpg', caption: 'Tea estates of Munnar', isCover: true },
          { url: '/assets/img/7.jpg', caption: 'Misty hills and viewpoints', isCover: false },
        ],
      },
    },
  });

  const alleppey = await prisma.destination.create({
    data: {
      name: 'Alleppey (Alappuzha)',
      slug: 'alleppey',
      description: 'Known as the "Venice of the East", Alleppey is famous for its mesmerizing backwaters, traditional Kettuvallam houseboats, canal cruises, and peaceful coir-making coastal villages.',
      location: 'Alappuzha District, Coastal Kerala',
      touristAttractions: 'Vembanad Lake Cruise\nAlleppey Beach & Historic Lighthouse\nKuttanad Below-Sea-Level Paddy Fields\nMarari Beach Relaxation\nPathiramanal Bird Island',
      bestTimeToVisit: 'October to March (Ideal cruising weather)',
      coverImage: '/assets/img/3.jpg',
      featured: true,
      images: {
        create: [
          { url: '/assets/img/3.jpg', caption: 'Alleppey luxury houseboat cruising backwaters', isCover: true },
          { url: '/assets/img/5.jpg', caption: 'Coconut palms and serene canals', isCover: false },
        ],
      },
    },
  });

  const wayanad = await prisma.destination.create({
    data: {
      name: 'Wayanad',
      slug: 'wayanad',
      description: 'Wayanad is a green paradise perched amongst the mountains of the Western Ghats, celebrated for spice plantations, prehistoric caves, waterfalls, and rich tribal heritage.',
      location: 'Wayanad District, Northern Kerala',
      touristAttractions: 'Edakkal Prehistoric Caves\nBanasura Sagar Earthen Dam\nChembra Peak & Heart Lake\nMeenmutty & Soochipara Falls\nWayanad Wildlife Sanctuary (Muthanga)',
      bestTimeToVisit: 'October to May (Pleasant weather & trekking)',
      coverImage: '/assets/img/5.jpg',
      featured: true,
      images: {
        create: [
          { url: '/assets/img/5.jpg', caption: 'Lush greenery and waterfalls of Wayanad', isCover: true },
        ],
      },
    },
  });

  const kochi = await prisma.destination.create({
    data: {
      name: 'Kochi (Cochin)',
      slug: 'kochi',
      description: 'The "Queen of the Arabian Sea", Kochi is a vibrant historic port blending Portuguese, Dutch, British and traditional Kerala cultures with modern cosmopolitan energy.',
      location: 'Ernakulam District, Coastal Central Kerala',
      touristAttractions: 'Fort Kochi Chinese Fishing Nets\nMattancherry Palace (Dutch Palace)\nJewish Synagogue & Jew Town\nMarine Drive Promenade\nLulu Shopping Mall & Cultural Kathakali Shows',
      bestTimeToVisit: 'October to April',
      coverImage: '/assets/img/6.jpg',
      featured: true,
      images: {
        create: [
          { url: '/assets/img/6.jpg', caption: 'Historic Fort Kochi coastline', isCover: true },
        ],
      },
    },
  });

  const thekkady = await prisma.destination.create({
    data: {
      name: 'Thekkady (Periyar)',
      slug: 'thekkady',
      description: 'Thekkady is India’s largest wildlife sanctuary. An ideal spot for elephant encounters, spice plantations, bamboo rafting, and scenic boat safaris on Periyar Lake.',
      location: 'Idukki District, Southern Western Ghats',
      touristAttractions: 'Periyar Lake Boat Safari\nSpice Plantation Walks\nElephant Junction & Bathing\nKadathanadan Kalari Centre (Martial Arts)\nChellarkovil Viewpoint',
      bestTimeToVisit: 'September to April',
      coverImage: '/assets/img/8.jpg',
      featured: true,
      images: {
        create: [
          { url: '/assets/img/8.jpg', caption: 'Wildlife and spice hills in Thekkady', isCover: true },
        ],
      },
    },
  });

  const kovalam = await prisma.destination.create({
    data: {
      name: 'Kovalam & Trivandrum',
      slug: 'kovalam',
      description: 'Internationally renowned crescent beaches, Ayurvedic resorts, and Trivandrum’s spiritual landmark Padmanabhaswamy Temple.',
      location: 'Thiruvananthapuram District, Southern Kerala',
      touristAttractions: 'Lighthouse Beach & Hawah Beach\nSree Padmanabhaswamy Temple\nPoovar Island Estuary & Mangroves\nNapier Museum & Zoo\nAyurveda Rejuvenation Wellness Centers',
      bestTimeToVisit: 'September to March',
      coverImage: '/assets/img/2.jpg',
      featured: false,
      images: {
        create: [
          { url: '/assets/img/2.jpg', caption: 'Golden sands of Kovalam beach', isCover: true },
        ],
      },
    },
  });

  console.log('Destinations seeded.');

  // 5. Tour Packages
  await prisma.package.deleteMany({});
  
  await prisma.package.create({
    data: {
      title: 'Munnar & Alleppey Honeymoon Delight',
      slug: 'munnar-alleppey-honeymoon-delight',
      overview: 'A romantic journey crafted for couples: 2 nights amidst the crisp tea mist of Munnar and 1 night aboard a private luxury houseboat gliding through Alleppey backwaters with candlelight dinner.',
      price: 24500,
      durationDays: 4,
      durationNights: 3,
      destinationName: 'Munnar & Alleppey',
      category: 'Honeymoon',
      destinationId: munnar.id,
      coverImage: '/assets/img/4.jpg',
      featured: true,
      active: true,
      inclusions: 'Private AC Sedan with dedicated driver\n2 Nights 4-Star Resort in Munnar with Breakfast\n1 Night Private Houseboat in Alleppey with All Meals (Lunch, High Tea, Dinner, Breakfast)\nCandlelight dinner and flower bed decoration\nSightseeing as per itinerary\nToll, parking and driver allowances',
      exclusions: 'Airfare / Train tickets\nEntry fees to monuments and parks\nPersonal expenses and tips\nAnything not mentioned in inclusions',
      accommodation: '2 Nights in Munnar Premium Tea Valley Resort + 1 Night in Alleppey Deluxe Houseboat',
      images: {
        create: [
          { url: '/assets/img/4.jpg', caption: 'Munnar tea hills', isCover: true, order: 1 },
          { url: '/assets/img/3.jpg', caption: 'Alleppey private houseboat', isCover: false, order: 2 },
          { url: '/assets/img/7.jpg', caption: 'Resort view in hills', isCover: false, order: 3 },
        ],
      },
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Arrival in Cochin & Transfer to Munnar',
            description: 'Pickup from Cochin Airport / Railway Station. Drive through picturesque winding roads with stops at Cheeyappara and Valara Waterfalls. Check-in at your mountain resort in Munnar. Evening leisure walk in tea plantations.',
            activities: 'Waterfall photo stop, Scenic mountain drive, Resort check-in, Relaxation',
            meals: 'Dinner at Resort',
          },
          {
            dayNumber: 2,
            title: 'Full Day Munnar Hill Station Sightseeing',
            description: 'Morning visit to Eravikulam National Park to witness the endangered Nilgiri Tahr. Explore the Tea Museum, Mattupetty Dam, Echo Point, and Rose Garden. Evening shopping for authentic Kerala spices and tea.',
            activities: 'Wildlife spotting, Dam boat ride, Tea factory tour, Spice shopping',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 3,
            title: 'Munnar to Alleppey Houseboat Cruise',
            description: 'Drive towards the backwaters of Alleppey. Board your traditional private houseboat at 12:00 PM. Enjoy welcome coconut drink, traditional Kerala lunch, and scenic gliding past paddy fields and village canals. Candlelight dinner onboard.',
            activities: 'Houseboat embarkation, Backwater gliding, Sunset watching, Candlelight dinner',
            meals: 'Breakfast, Traditional Lunch, High Tea & Candlelight Dinner',
          },
          {
            dayNumber: 4,
            title: 'Houseboat Checkout & Cochin Departure',
            description: 'Enjoy a morning cruise and breakfast onboard. Disembark at 9:00 AM. Transfer to Cochin Airport or Railway Station with memorable souvenir gifts from Layali Kerala.',
            activities: 'Morning canal cruise, Houseboat check-out, Airport drop',
            meals: 'Breakfast',
          },
        ],
      },
    },
  });

  await prisma.package.create({
    data: {
      title: 'Classic Kerala Golden Experience',
      slug: 'classic-kerala-golden-experience',
      overview: 'The definitive 6-day Kerala holiday: historical Cochin, cool Munnar hills, wildlife and spice plantations of Thekkady, and peaceful backwaters of Alleppey.',
      price: 38900,
      durationDays: 6,
      durationNights: 5,
      destinationName: 'Cochin, Munnar, Thekkady & Alleppey',
      category: 'Popular',
      destinationId: munnar.id,
      coverImage: '/assets/img/1.jpg',
      featured: true,
      active: true,
      inclusions: 'Private AC Chauffeur-driven vehicle for entire tour\nAccommodation in handpicked 4-star hotels & resorts\nDaily buffet breakfast + All meals in Alleppey houseboat\nSpice plantation tour tickets\nHouseboat backwater cruise\nAll taxes, toll, parking and 24/7 travel concierge',
      exclusions: 'Flight/Train tickets\nOptional activities (Kalari shows, elephant ride)\nPersonal laundry and telephone expenses',
      accommodation: '1N Cochin, 2N Munnar, 1N Thekkady, 1N Alleppey Houseboat',
      images: {
        create: [
          { url: '/assets/img/1.jpg', caption: 'Kerala lush hills', isCover: true, order: 1 },
          { url: '/assets/img/8.jpg', caption: 'Thekkady wilderness', isCover: false, order: 2 },
          { url: '/assets/img/6.jpg', caption: 'Fort Kochi fishing nets', isCover: false, order: 3 },
        ],
      },
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Welcome to Cochin - Queen of Arabian Sea',
            description: 'Arrive at Cochin International Airport. Visit Fort Kochi, Jewish Synagogue, and historic Chinese Fishing Nets. Overnight stay in Cochin.',
            activities: 'Heritage city tour, Chinese fishing nets sunset',
            meals: 'Breakfast',
          },
          {
            dayNumber: 2,
            title: 'Cochin to Misty Munnar (135 km / 4 hrs)',
            description: 'Scenic journey through rubber, pineapple and spice gardens into the Western Ghats. Check in to Munnar resort.',
            activities: 'Hill drive, Cheeyappara falls stop, Resort relaxation',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 3,
            title: 'Munnar Sightseeing Tour',
            description: 'Visit Mattupetty Dam, Kundala Lake, Top Station, and Tea Museum.',
            activities: 'Tea tasting, boating, mountain photography',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 4,
            title: 'Munnar to Thekkady Wildlife Sanctuary',
            description: 'Drive to Thekkady. Enjoy a guided spice plantation walk, elephant bathing experience, and Periyar lake boat safari.',
            activities: 'Spice walk, Periyar wildlife safari, Kalaripayattu martial arts show',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 5,
            title: 'Thekkady to Alleppey Houseboat',
            description: 'Board your private houseboat for an unforgettable voyage through Kerala’s palm-fringed lagoons.',
            activities: 'Houseboat cruise, village lifestyle observation, chef prepared dinner',
            meals: 'All meals onboard',
          },
          {
            dayNumber: 6,
            title: 'Alleppey to Cochin Departure',
            description: 'Disembark and transfer to Cochin Airport for your onward journey.',
            activities: 'Breakfast, shopping stop, airport transfer',
            meals: 'Breakfast',
          },
        ],
      },
    },
  });

  await prisma.package.create({
    data: {
      title: 'Arab-Kerala Luxury Family Tour',
      slug: 'arab-kerala-luxury-family-tour',
      overview: 'Specially designed for Gulf families with Arabic-speaking chauffeur/guide, private luxury family suites, halal dining options, spacious transport, and child-friendly activities.',
      price: 59000,
      durationDays: 7,
      durationNights: 6,
      destinationName: 'Cochin, Munnar, Thekkady & Kumarakom',
      category: 'Luxury',
      destinationId: munnar.id,
      coverImage: '/assets/img/2.jpg',
      featured: true,
      active: true,
      inclusions: 'Luxury tempo traveller / luxury SUV\nArabic speaking coordinator and guide\nCertified Halal food arrangements\n5-Star luxury resort stays with interconnected rooms\nPrivate family houseboat cruise\nVIP airport meet and assist service',
      exclusions: 'International flights\nPersonal shopping and tips',
      accommodation: '5-Star luxury heritage and lakeside properties',
      images: {
        create: [
          { url: '/assets/img/2.jpg', caption: 'Luxury family resort', isCover: true, order: 1 },
          { url: '/assets/img/4.jpg', caption: 'Munnar hills', isCover: false, order: 2 },
          { url: '/assets/img/5.jpg', caption: 'Serene nature', isCover: false, order: 3 },
        ],
      },
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Airport VIP Welcome & Cochin 5-Star Check-in',
            description: 'Warm airport reception by Arabic-speaking Layali Kerala team. Transfer to 5-star hotel in Cochin. Evening relaxing Marine Drive walk or Lulu Mall shopping.',
            activities: 'VIP reception, luxury check-in, shopping at Lulu Mall',
            meals: 'Dinner',
          },
          {
            dayNumber: 2,
            title: 'Cochin to Munnar Luxury Mountain Resort',
            description: 'Travel through pristine waterfalls to Munnar. Check in to secluded villa resort nestled in tea plantations.',
            activities: 'Scenic mountain voyage, waterfall stops, family campfire',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 3,
            title: 'Private Munnar Family Tour',
            description: 'Visit Mattupetty Dam, take private speed boat, visit Lockhart tea factory, and enjoy horseback riding for kids.',
            activities: 'Private speedboat ride, horse riding, tea tasting',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 4,
            title: 'Munnar to Thekkady Spice Hills',
            description: 'Scenic journey to Thekkady. Private family elephant interaction and private jeep safari in spice country.',
            activities: 'Elephant shower, spice garden exploration, cultural show',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 5,
            title: 'Thekkady to Kumarakom Lake Resort',
            description: 'Drive down to Kumarakom. Check in to award-winning lakeside luxury resort. Infinity pool, Ayurvedic spa session for parents.',
            activities: 'Ayurvedic wellness consultation, sunset cruise on Vembanad lake',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 6,
            title: 'Day Cruise in Private Luxury Houseboat',
            description: 'Exclusive 5-star private houseboat day-cruise with gourmet fresh seafood and Arabic menu options.',
            activities: 'Private cruising, relaxation, fishing, photography',
            meals: 'Breakfast, Lunch & Dinner',
          },
          {
            dayNumber: 7,
            title: 'Departure Transfer with Souvenirs',
            description: 'Breakfast at resort, checkout, and luxury transfer to Cochin Airport with special Kerala gifts.',
            activities: 'Resort breakfast, airport drop-off',
            meals: 'Breakfast',
          },
        ],
      },
    },
  });

  await prisma.package.create({
    data: {
      title: 'Wayanad Nature & Wildlife Expedition',
      slug: 'wayanad-nature-wildlife-expedition',
      overview: 'Immerse yourself in northern Kerala’s untamed nature: treehouses, ancient stone caves, bamboo rafting, and elephant sanctuary safaris.',
      price: 18500,
      durationDays: 3,
      durationNights: 2,
      destinationName: 'Wayanad',
      category: 'Nature',
      destinationId: wayanad.id,
      coverImage: '/assets/img/5.jpg',
      featured: true,
      active: true,
      inclusions: '2 Nights in Rainforest Treehouse / Nature Resort\nAll transfers in AC vehicle\nJeep safari inside Wayanad Wildlife Sanctuary\nEntry tickets to Edakkal Caves & Banasura Dam\nDaily breakfast & dinner',
      exclusions: 'Lunch and personal expenses',
      accommodation: 'Eco-Luxury Rainforest Resort in Wayanad',
      images: {
        create: [
          { url: '/assets/img/5.jpg', caption: 'Wayanad rainforest stream', isCover: true, order: 1 },
        ],
      },
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Arrival in Calicut & Transfer to Wayanad Ghats',
            description: 'Pickup from Calicut (Kozhikode) Airport. Ascend the famous 9 hairpin bends of Thamarassery Churam. Visit Pookode Lake and check in to treehouse resort.',
            activities: 'Churam viewpoint, Pookode lake boating, resort nature walk',
            meals: 'Dinner',
          },
          {
            dayNumber: 2,
            title: 'Edakkal Caves & Banasura Sagar Dam',
            description: 'Trek up to Edakkal Caves with Neolithic petroglyphs. Afternoon visit to Asia’s second largest earthen dam, Banasura Sagar.',
            activities: 'Cave exploration, speed boat on reservoir, zip line option',
            meals: 'Breakfast & Dinner',
          },
          {
            dayNumber: 3,
            title: 'Muthanga Wildlife Safari & Departure',
            description: 'Early morning open jeep safari in Muthanga Wildlife Sanctuary to spot wild elephants and deer. Transfer to Calicut airport.',
            activities: 'Morning jungle safari, transfer to airport',
            meals: 'Breakfast',
          },
        ],
      },
    },
  });

  await prisma.package.create({
    data: {
      title: 'Ayurveda & Medical Wellness Rejuvenation',
      slug: 'ayurveda-medical-wellness-rejuvenation',
      overview: 'Combine world-class Kerala medical consultations with authentic Panchakarma and Ayurvedic rejuvenation therapies under the supervision of qualified physicians.',
      price: 68000,
      durationDays: 8,
      durationNights: 7,
      destinationName: 'Perinthalmanna & Kovalam',
      category: 'Medical',
      destinationId: kovalam.id,
      coverImage: '/assets/img/medical.png',
      featured: false,
      active: true,
      inclusions: 'Initial doctor consultation & daily Ayurvedic doctor supervision\nPersonalized Ayurvedic herbal treatments (Abhyangam, Shirodhara, Kizhi)\nHerbal vegetarian diet prepared according to body constitution\nAccommodation in serene Ayurvedic hospital/wellness resort\nAirport pick up and drop with wheelchair/medical assistance if needed',
      exclusions: 'Specialist hospital investigations or prescription medicines taken home',
      accommodation: '7 Nights at accredited Ayurvedic Hospital / Wellness Retreat',
      images: {
        create: [
          { url: '/assets/img/medical.png', caption: 'Ayurvedic Rejuvenation & Healing', isCover: true, order: 1 },
        ],
      },
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Medical Arrival & Doctor Consultation',
            description: 'Reception at Calicut/Cochin airport. Transfer to wellness centre. Detailed Prakrithi diagnosis and customized therapy planning.',
            activities: 'Doctor consultation, therapy plan preparation',
            meals: 'Doctor-prescribed Diet',
          },
          {
            dayNumber: 2,
            title: 'Daily Therapy - Rejuvenation & Detox',
            description: 'Morning yoga, personalized herbal oil massage (Abhyanga), herbal steam bath, and relaxation.',
            activities: 'Yoga session, therapeutic herbal massage',
            meals: 'Ayurvedic Meals',
          },
        ],
      },
    },
  });

  console.log('Tour packages seeded.');

  // 6. Enquiries (Sample data for admin workflow)
  await prisma.enquiry.deleteMany({});
  await prisma.enquiry.createMany({
    data: [
      {
        customerName: 'Saeed Al-Wadaie',
        phoneNumber: '+966 50 123 4567',
        email: 'saeed.alwadaie@gmail.com',
        travelDate: '2026-12-15',
        numberOfTravellers: 5,
        packageName: 'Arab-Kerala Luxury Family Tour',
        message: 'Looking for a 7-day luxury tour with private Arabic chauffeur and halal meals for my family (2 adults, 3 kids).',
        status: 'New',
        adminNotes: 'High priority Gulf inquiry. Needs Arabic speaking driver.',
      },
      {
        customerName: 'Waleed Al-Balushi',
        phoneNumber: '+968 91 876 543',
        email: 'waleed.b@hotmail.com',
        travelDate: '2027-01-10',
        numberOfTravellers: 2,
        packageName: 'Munnar & Alleppey Honeymoon Delight',
        message: 'Planning our honeymoon trip to Munnar and houseboat. Please share final quote with 5-star resorts.',
        status: 'Contacted',
        adminNotes: 'Sent WhatsApp itinerary. Client requested quote for pool villa.',
      },
      {
        customerName: 'Mohammed Al-Sayed',
        phoneNumber: '+971 55 987 6543',
        email: 'm.alsayed@yahoo.com',
        travelDate: '2026-12-28',
        numberOfTravellers: 4,
        packageName: 'Classic Kerala Golden Experience',
        message: 'Interested in Munnar, Thekkady and Alleppey houseboat. Can you arrange airport pickup from Cochin?',
        status: 'Follow-up',
        adminNotes: 'Call scheduled on WhatsApp tomorrow 4 PM UAE time.',
      },
      {
        customerName: 'Rahul Verma',
        phoneNumber: '+91 98765 43210',
        email: 'rahul.verma@delhi.in',
        travelDate: '2026-12-20',
        numberOfTravellers: 2,
        packageName: 'Wayanad Nature & Wildlife Expedition',
        message: 'Need treehouse accommodation confirmed for 2 nights.',
        status: 'Confirmed',
        adminNotes: 'Advance payment of 50% received via bank transfer. Booking confirmed.',
      },
    ],
  });
  console.log('Enquiries seeded.');

  // 7. Contact Messages
  await prisma.contactMessage.deleteMany({});
  await prisma.contactMessage.createMany({
    data: [
      {
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed.m@outlook.com',
        phone: '+971 50 443 2110',
        subject: 'Medical Tourism & Ayurvedic Treatment Inquiry',
        message: 'My father requires knee joint consultation and Ayurvedic therapy in Kerala. Can Layali Kerala coordinate hospital appointments and stay?',
        status: 'Unread',
      },
      {
        name: 'Priya Nambiar',
        email: 'priya.n@gmail.com',
        phone: '+91 94471 22334',
        subject: 'Custom Family Package for 8 people',
        message: 'We are planning a family reunion in Munnar this December. Please call back.',
        status: 'Replied',
      },
    ],
  });
  console.log('Contact messages seeded.');

  console.log('Layali Kerala database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
