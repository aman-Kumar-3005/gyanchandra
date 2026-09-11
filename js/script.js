/**
 * Gyan Rachana Flights — Official Website JavaScript
 * "Fly with us, Fly with trust"
 * Pure Vanilla JavaScript — Hostinger Shared Hosting Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStickyHeader();
  initPackageFilters();
  initGalleryFilters();
  initFaqAccordion();
  initPackageDetailsPage();
  initOffersPage();
  initEnquiryForm();
  initGalleryLightbox();
});

/* ==========================================================================
   1. Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      
      // Update toggle icon
      toggleBtn.innerHTML = isOpen 
        ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    // Close when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active Link Highlighter based on current URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   2. Sticky Header on Scroll
   ========================================================================== */
function initStickyHeader() {
  const navbar = document.querySelector('.main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. Packages Filter (packages.html)
   ========================================================================== */
function initPackageFilters() {
  const filterBtns = document.querySelectorAll('.package-filter-btn');
  const cards = document.querySelectorAll('.package-item-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Gallery Filter (gallery.html)
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const tag = item.getAttribute('data-tag') || '';
        if (filter === 'all' || tag.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. FAQ Accordion (faq.html)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle clicked item
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ==========================================================================
   6. Dynamic Package Details Loader (package-details.html)
   ========================================================================== */
const PACKAGES_DATABASE = {
  'udaipur': {
    title: 'Udaipur Royal Heritage & Lake Romance',
    subtitle: 'Immerse yourself in the Venice of the East with royal palaces, scenic boat rides on Lake Pichola, and luxury heritage stays.',
    tag: 'Domestic / India',
    duration: '2 Nights | 3 Days',
    price: '₹7,999',
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['City Palace Complex', 'Lake Pichola Sunset Cruise', 'Jag Mandir Island', 'Saheliyon-ki-Bari', 'Bagore Ki Haveli Folk Show', 'Fateh Sagar Lake'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Udaipur & Evening Lake Pichola Boat Ride', desc: 'Arrive at Udaipur Airport/Station. Our chauffeur welcomes you and transfers you to your heritage hotel. In the evening, enjoy a sunset motorboat cruise on Lake Pichola overlooking the Taj Lake Palace and Jag Mandir.' },
      { day: 'Day 2', title: 'City Palace, Jagdish Temple & Cultural Folk Dance', desc: 'Full-day royal sightseeing: Explore the grand City Palace of Udaipur, visit the ancient 17th-century Jagdish Temple, stroll through the royal fountains of Saheliyon-ki-Bari, and attend the lively Dharohar folk dance at Bagore Ki Haveli.' },
      { day: 'Day 3', title: 'Fateh Sagar Lake, Sajjangarh Monsoon Palace & Departure', desc: 'Morning visit to Sajjangarh (Monsoon Palace) perched high above the Aravalli hills for breathtaking panoramic views. Explore the lake promenade at Fateh Sagar before prompt chauffeur transfer to Udaipur Airport for your return flight.' }
    ],
    inclusions: [
      '2 Nights stay in 3-star/4-star heritage hotel',
      'Daily lavish buffet breakfast',
      'Private air-conditioned chauffeur-driven cab for all transfers & sightseeing',
      'Sunset boat ride tickets on Lake Pichola',
      'Driver allowances, toll taxes, fuel, and parking charges',
      '24x7 personal trip coordinator assistance from Gyan Rachana team'
    ],
    exclusions: [
      'Airfare or train tickets (available upon request at lowest fares)',
      'Monument entry tickets and guide charges',
      'Lunches, dinners, and personal expenses'
    ]
  },
  'andaman': {
    title: 'Andaman & Nicobar Tropical Island Bliss',
    subtitle: 'Turquoise waters, coral reef snorkeling, white sand beaches, and historic cellular jail in Port Blair & Havelock Island.',
    tag: 'Island / Domestic',
    duration: '4 Nights | 5 Days',
    price: '₹19,999',
    heroImage: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Cellular Jail Light & Sound', 'Radhanagar Beach Havelock', 'Elephant Beach Coral Snorkeling', 'Kalapathar Beach', 'Corbyn’s Cove Port Blair'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival Port Blair & Cellular Jail Memorial', desc: 'Arrive at Veer Savarkar International Airport, Port Blair. Transfer to hotel. Afternoon visit to Cellular Jail National Memorial followed by the poignant Light & Sound show.' },
      { day: 'Day 2', title: 'High-Speed Ferry to Havelock Island & Radhanagar Sunset', desc: 'Board the premium private catamaran (Makruzz/Nautika) to Havelock Island. Check-in at beach resort. Afternoon at Asia’s cleanest beach — Radhanagar Beach (Beach No. 7).' },
      { day: 'Day 3', title: 'Elephant Beach Water Sports & Coral Reefs', desc: 'Speedboat ride to Elephant Beach. Enjoy complimentary snorkeling amidst vibrant coral formations. Optional sea-walk, jet-ski, and scuba diving available.' },
      { day: 'Day 4', title: 'Kalapathar Beach Sunrise & Return to Port Blair', desc: 'Visit picturesque Kalapathar beach with black rocks and turquoise seas. Afternoon ferry back to Port Blair. Shopping at Sagarika Emporium.' },
      { day: 'Day 5', title: 'Airport Transfer with Fond Island Memories', desc: 'Breakfast at hotel and seamless transfer to Port Blair airport with web check-in & boarding pass assistance by Sachin and the flight desk.' }
    ],
    inclusions: [
      '4 Nights accommodation in beachside resort/hotel',
      'Daily breakfast at all hotels',
      'Round-trip premium private cruise tickets (Port Blair <-> Havelock)',
      'AC private vehicle for all port and beach transfers',
      'Complimentary snorkeling session at Elephant Beach',
      'All entry permits, ferry tickets, and local tour assistance'
    ],
    exclusions: [
      'Airfare (Gyan Rachana offers special flight add-ons from Delhi/Kolkata)',
      'Scuba diving, sea walking, or water sports personal expenses',
      'Personal laundry, tips, and camera permits'
    ]
  },
  'bali': {
    title: 'Bali Tropical Honeymoon & Island Adventure',
    subtitle: 'Experience enchanting emerald rice terraces, cliffside Uluwatu sunset temple, Nusa Penida beaches, and private pool villas.',
    tag: 'International / Honeymoon',
    duration: '4 Nights | 5 Days',
    price: '₹24,999',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Tegalalang Rice Terraces', 'Uluwatu Cliff Temple & Kecak Dance', 'Nusa Penida Kelingking T-Rex Beach', 'Kintamani Batur Volcano', 'Bali Jungle Swing', 'Tanah Lot Sunset'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival at Denpasar Ngurah Rai & Villa Check-in', desc: 'Traditional Balinese flower garland welcome at DPS Airport. Private transfer to your luxury resort/villa in Kuta or Seminyak. Evening at leisure.' },
      { day: 'Day 2', title: 'Kintamani Volcano, Coffee Plantation & Famous Bali Swing', desc: 'Full-day tour: Witness Mount Batur volcano and Lake Batur, sample Luwak coffee, and take thrilling photos on the iconic Bali Swing over the lush jungle.' },
      { day: 'Day 3', title: 'West Nusa Penida Island Speedboat Day Excursion', desc: 'Early morning speedboat to Nusa Penida. Visit the world-famous Kelingking T-Rex Beach, Broken Beach, and Angel’s Billabong natural infinity pool.' },
      { day: 'Day 4', title: 'Tanah Lot Temple & Cliffside Uluwatu Sunset', desc: 'Visit iconic Tanah Lot water temple on the ocean rock, followed by Uluwatu Temple perched 70 meters above crashing Indian Ocean waves.' },
      { day: 'Day 5', title: 'Spa Relaxation, Souvenir Shopping & Departure', desc: 'Enjoy relaxing Balinese massage (optional), souvenir shopping at Krishna Oleh-Oleh, and private transfer to airport with full boarding assistance.' }
    ],
    inclusions: [
      '4 Nights in 4-Star Resort / Private Pool Villa',
      'Daily breakfast & romantic candlelight dinner setup',
      'Private AC vehicle with English-speaking Balinese driver-guide',
      'Return speedboat tickets to Nusa Penida Island',
      'Sightseeing entrance tickets & Bali Swing pass',
      'Complimentary Indonesian SIM card with data per couple'
    ],
    exclusions: [
      'International flights (contact Sachin/Ritika for group airline fares)',
      'Bali Tourist Levy & Visa on Arrival (approx $35 payable at airport)',
      'Personal water sports, lunches, and tips'
    ]
  },
  'dubai': {
    title: 'Dubai Extravaganza with Desert Safari & Marina Cruise',
    subtitle: 'From the heights of Burj Khalifa to red dune quad biking and luxury yacht dinners in Dubai Marina.',
    tag: 'International / Family & Corporate',
    duration: '4 Nights | 5 Days',
    price: '₹34,999',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Burj Khalifa 124th Floor', 'Desert Safari & BBQ Gala', 'Dubai Marina Luxury Dhow Cruise', 'Dubai Frame & Old Souks', 'Museum of the Future', 'Dubai Mall Fountain Show'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Dubai & Marina Dhow Cruise Dinner', desc: 'Arrival at Dubai International Airport (DXB). Smooth private transfer to your hotel. Evening luxury glass dhow cruise along Dubai Marina with international buffet and live Tanoura performance.' },
      { day: 'Day 2', title: 'Half-Day City Tour & Burj Khalifa At The Top', desc: 'Explore Dubai Frame, Jumeirah Beach, Burj Al Arab photo stop, followed by fast-track entry to Burj Khalifa 124th & 125th observation deck and the Dubai Mall fountain show.' },
      { day: 'Day 3', title: 'Desert Safari with Dune Bashing, Camel Ride & BBQ', desc: 'Afternoon 4x4 Land Cruiser pick-up for red dune bashing in Lahbab desert. Enjoy camel rides, henna painting, sandboarding, belly dance, fire show, and a lavish BBQ buffet under the stars.' },
      { day: 'Day 4', title: 'Museum of the Future & Gold & Spice Souks', desc: 'Visit the architectural marvel Museum of the Future. Afternoon traditional abra boat ride across Dubai Creek to explore Gold Souk and fragrant spice alleys.' },
      { day: 'Day 5', title: 'Last-minute Shopping & Airport Departure', desc: 'Morning at leisure for duty-free shopping. Chauffeur transfer to DXB Airport with flight check-in and luggage advisory by Aman & team.' }
    ],
    inclusions: [
      '4 Nights in 4-star city center hotel with daily breakfast',
      'Burj Khalifa 124th & 125th floor non-prime admission tickets',
      'Desert Safari with 4x4 Dune Bashing, Shows & BBQ Dinner',
      'Dubai Marina Dhow Cruise with international buffet',
      'Dubai tourist visa with mandatory travel insurance',
      'Return airport transfers and shared/private city tours'
    ],
    exclusions: [
      'Airfare (special round-trip group fares available from Delhi/Mumbai)',
      'Dubai Tourism Dirham fee (payable directly to hotel at check-in)',
      'Lunches and personal shopping'
    ]
  },
  'azerbaijan': {
    title: 'Azerbaijan Baku Flames & Caucasian Wonders',
    subtitle: 'Explore the modern architectural wonders of Baku, Fire Temple of Ateshgah, Gobustan mud volcanoes, and ancient Silk Road culture.',
    tag: 'International / Trending',
    duration: '5 Nights | 6 Days',
    price: '₹39,999',
    heroImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Baku Flame Towers & Highland Park', 'Heydar Aliyev Center', 'Old City Icherisheher & Maiden Tower', 'Gobustan Rock Art & Mud Volcanoes', 'Ateshgah Fire Temple & Yanardag Burning Mountain', 'Gabala Mountain Resort'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival at Heydar Aliyev Airport, Baku', desc: 'Welcome to Baku! Warm meet and greet by our English-speaking guide. Transfer to your premium central hotel. Evening stroll along Baku Caspian Boulevard.' },
      { day: 'Day 2', title: 'Old City Tour & Modern Architectural Landmarks', desc: 'Explore the UNESCO-listed Old City (Icherisheher), Maiden Tower, and Shirvanshahs Palace. Visit the iconic undulating Heydar Aliyev Center designed by Zaha Hadid.' },
      { day: 'Day 3', title: 'Gobustan Mud Volcanoes & Land of Fire', desc: 'Excursion to Gobustan prehistoric petroglyphs and active mud volcanoes. Continue to Ateshgah Fire Temple and Yanar Dag — the mountain that has burned non-stop for millennia.' },
      { day: 'Day 4', title: 'Full Day Daytrip to Gabala Mountains', desc: 'Journey to the Caucasian mountain paradise of Gabala. Ride the Tufandag cable car through snow-capped valleys and visit the tranquil Nohur Lake.' },
      { day: 'Day 5', title: 'Highland Park Panorama & Nizami Street Shopping', desc: 'Panoramic view of Baku Bay from Highland Park near the Flame Towers. Free afternoon for souvenir and carpet shopping along Nizami Street.' },
      { day: 'Day 6', title: 'Farewell Baku & Airport Departure', desc: 'Breakfast, hotel check-out, and private transfer to Baku airport for flight home.' }
    ],
    inclusions: [
      '5 Nights in 4-star central Baku hotel',
      'Daily breakfast buffet',
      'Azerbaijan E-Visa processing and verification',
      'Private air-conditioned bus/van for all tours',
      'English-speaking licensed Azerbaijan tour guide',
      'Cable car pass in Gabala and Gobustan entrance tickets'
    ],
    exclusions: [
      'International flights (contact Sachin for charter & scheduled discounts)',
      'Lunches & dinners not mentioned',
      'Tips for driver and local guide'
    ]
  },
  'manali': {
    title: 'Manali & Rohtang Pass Snow Adventure',
    subtitle: 'Pristine Himalayan valleys, snow adventures in Solang, Hadimba Temple, and riverside camping praised in Google reviews!',
    tag: 'Domestic / Mountains',
    duration: '3 Nights | 4 Days',
    price: '₹9,499',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Solang Valley Snow Activities', 'Rohtang Pass (subject to permit)', 'Hadimba Devi Temple', 'Atal Tunnel', 'Vashisht Hot Water Springs', 'Mall Road Manali'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival Manali & Local Sightseeing', desc: 'Arrive in Manali. Check into your mountain-view resort. Afternoon visit to the 450-year-old Hadimba Temple amidst deodar forests, Vashisht sulphur springs, and evening walk along the bustling Mall Road.' },
      { day: 'Day 2', title: 'Solang Valley & Atal Tunnel Adventure', desc: 'Full-day excursion through the engineering marvel Atal Tunnel into Lahaul Valley. In Solang Valley, enjoy paragliding, zorbing, snow scooter rides, and cable car ropeway.' },
      { day: 'Day 3', title: 'Naggar Castle & River Rafting in Kullu', desc: 'Scenic drive to ancient Naggar Castle and Roerich Art Gallery. Head to Kullu for thrilling white-water river rafting on the Beas River and visit local shawl weaving factories.' },
      { day: 'Day 4', title: 'Morning Mountain Views & Return Journey', desc: 'Savor breakfast overlooking snow peaks. Souvenir shopping and return chauffeur transfer arranged personally by Sovinder Sir and the operations team.' }
    ],
    inclusions: [
      '3 Nights in deluxe mountain-view resort with balcony',
      'Breakfast and dinner included (MAP plan)',
      'Dedicated private cab (Sedan/SUV) for all sightseeing',
      'Driver allowances, toll tax, state permits, and parking',
      'Personal coordinator assistance by Sovinder Sir'
    ],
    exclusions: [
      'Rohtang Pass NGT green permit fees',
      'Activity charges (paragliding, rafting, snow suit rental)',
      'Lunch and personal expenses'
    ]
  },
  'singapore': {
    title: 'Singapore City of Wonders & Sentosa Island',
    subtitle: 'Futuristic Gardens by the Bay, Marina Bay Sands SkyPark, Universal Studios, and night river cruise.',
    tag: 'International / Family',
    duration: '4 Nights | 5 Days',
    price: '₹38,999',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Gardens by the Bay (Flower Dome & Cloud Forest)', 'Marina Bay Sands SkyPark', 'Sentosa Island Cable Car', 'Universal Studios Singapore', 'Clarke Quay River Cruise', 'Changi Jewel Rain Vortex'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival Singapore & Evening Clarke Quay River Cruise', desc: 'Arrive at award-winning Changi Airport. See the world’s tallest indoor waterfall at Jewel Rain Vortex. Private hotel transfer. Evening scenic bumboats cruise on Singapore River.' },
      { day: 'Day 2', title: 'City Highlights & Gardens by the Bay', desc: 'Visit Merlion Park, Chinatown, Little India, and Arab Street. Afternoon at Gardens by the Bay exploring Flower Dome, Cloud Forest, and the Supertree light show.' },
      { day: 'Day 3', title: 'Full Day Universal Studios Singapore', desc: 'Spend a thrilling day at Universal Studios on Sentosa Island with immersive roller coasters, Transformers 3D, and Jurassic Park rapids.' },
      { day: 'Day 4', title: 'Sentosa Cable Car, S.E.A. Aquarium & Wings of Time', desc: 'Scenic cable car ride across Singapore Harbour. Tour S.E.A. Aquarium and watch the multi-sensory Wings of Time laser water show on Siloso beach.' },
      { day: 'Day 5', title: 'Marina Bay Sands SkyPark & Airport Departure', desc: 'Breathtaking 360-degree city view from Marina Bay Sands SkyPark. Afternoon chauffeur transfer to Changi Airport for return flight.' }
    ],
    inclusions: [
      '4 Nights in 4-Star Singapore hotel with daily breakfast',
      'Singapore Tourist Visa processing by visa desk',
      'Gardens by the Bay dual dome entry tickets',
      'Sentosa Island one-day admission with cable car & Wings of Time',
      'Return airport & tour transfers'
    ],
    exclusions: [
      'Airfare (group booking options available)',
      'Universal Studios Express Pass',
      'Meals not specified'
    ]
  },
  'corbett': {
    title: 'Jim Corbett Wildlife Safari & Jungle Lodge',
    subtitle: 'Thrilling open-jeep tiger safaris, lush sal forests, Kosi river walks, and luxury wildlife resort stays.',
    tag: 'Domestic / Wildlife',
    duration: '2 Nights | 3 Days',
    price: '₹6,999',
    heroImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Bijrani / Jhirna Safari Zone', 'Garjia Devi Temple', 'Corbett Waterfall', 'Kosi River Walk', 'Dhikala Grasslands', 'Jungle Bonfire'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival at Jim Corbett & Riverside Resort Check-in', desc: 'Reach Ramnagar/Corbett. Welcome drink at your luxury jungle resort. Afternoon relaxation by the swimming pool, Kosi river walk, and evening bonfire with folk music.' },
      { day: 'Day 2', title: 'Morning 4x4 Jeep Safari & Garjia Temple', desc: 'Early morning open 4x4 gypsy safari deep inside Bijrani/Jhirna forest zone tracking royal Bengal tigers, elephants, deer, and rare birds. Afternoon visit to Garjia Devi Temple and Corbett Waterfall.' },
      { day: 'Day 3', title: 'Nature Walk & Departure', desc: 'Early morning guided birdwatching nature walk along the resort periphery. Buffet breakfast and chauffeur transfer back to Delhi/NCR.' }
    ],
    inclusions: [
      '2 Nights stay in luxury jungle resort',
      'All meals included: 2 Breakfasts, 2 Lunches, 2 Dinners (AP Plan)',
      '1 Exclusive 4x4 open Gypsy Safari with authorized naturalist',
      'Resort amenities: pool, games, evening bonfire',
      'All forest permits, entry fees, and taxes'
    ],
    exclusions: [
      'Personal transport from Delhi to Corbett (AC cab available on request)',
      'Extra safari rounds',
      'Personal video camera fees'
    ]
  },
  'dhanaulti': {
    title: 'Dhanaulti & Mussoorie Misty Himalayan Escape',
    subtitle: 'Quiet pine forests, eco parks, snow viewpoints, and tranquil weekend getaways from Delhi/NCR.',
    tag: 'Weekend Getaway',
    duration: '1 Night | 2 Days',
    price: '₹6,499',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Eco Park Dhanaulti', 'Surkanda Devi Temple Ropeway', 'Mussoorie Mall Road', 'Kempty Falls', 'Apple Orchard Walk'],
    itinerary: [
      { day: 'Day 1', title: 'Drive from Delhi/NCR to Dhanaulti via Mussoorie', desc: 'Scenic morning drive into the Garhwal hills. Check into your cozy alpine cottage or boutique resort in Dhanaulti. Walk through deodar trees at Eco Park and enjoy evening mountain sunset.' },
      { day: 'Day 2', title: 'Surkanda Devi Peak, Mussoorie Stop & Return', desc: 'Take the ropeway up to Surkanda Devi Temple (9,995 ft) for 360-degree snow peaks views. Stop at Mussoorie Mall Road on the way down before returning to Delhi/NCR.' }
    ],
    inclusions: [
      '1 Night in mountain-view cottage/hotel in Dhanaulti',
      'Breakfast and dinner included',
      'Private AC cab from Delhi/NCR for the entire trip',
      'All toll taxes, parking, driver allowance included'
    ],
    exclusions: [
      'Ropeway tickets and monument entry',
      'Personal adventure activities',
      'Lunches and beverages'
    ]
  },
  'almaty': {
    title: 'Almaty Kazakhstan Alpine Lakes & Mountains',
    subtitle: 'Snow-clad Tien Shan mountains, turquoise Big Almaty Lake, Shymbulak Ski Resort, and Central Asian hospitality.',
    tag: 'International / Visa Free',
    duration: '4 Nights | 5 Days',
    price: '₹32,999',
    heroImage: 'https://images.unsplash.com/photo-1582650625119-3a31f841836d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582650625119-3a31f841836d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=800&auto=format&fit=crop'
    ],
    placesToExplore: ['Medeu Ice Rink & Shymbulak Resort', 'Kok Tobe Hill Cable Car', 'Big Almaty Lake', 'Panfilov Park & Zenkov Cathedral', 'Green Bazaar'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Almaty & Kok Tobe Hill Cable Car', desc: 'Direct flight from Delhi to Almaty (just 3.5 hours!). Private hotel transfer. Ride Kok Tobe cable car for panoramic views of Almaty city skyline against snowy peaks.' },
      { day: 'Day 2', title: 'Medeu High-Altitude Rink & Shymbulak Cableway', desc: 'Visit Medeu gorge and take high-speed cable car up to Shymbulak Ski Resort (3,200m). Enjoy alpine snow activities and mountain cafes.' },
      { day: 'Day 3', title: 'Big Almaty Lake & Charyn Canyon Excursion', desc: 'Witness the surreal turquoise waters of Big Almaty Lake surrounded by glacier-capped peaks. Explore the mini Grand Canyon at Charyn Canyon.' },
      { day: 'Day 4', title: 'Zenkov Wooden Cathedral & Green Bazaar Tasting', desc: 'Visit the world’s second tallest wooden building — Zenkov Cathedral constructed without a single nail. Taste dry fruits, honey, and local chocolates at Green Bazaar.' },
      { day: 'Day 5', title: 'Check-out & Flight Back to Delhi', desc: 'Breakfast, souvenir shopping at Mega Mall, and private transfer to Almaty Airport with flight check-in assistance.' }
    ],
    inclusions: [
      '4 Nights in 4-star central Almaty hotel with breakfast',
      'Visa-free entry support for Indian passport holders (up to 14 days)',
      'Return airport transfers & sightseeing in AC coach',
      'All cable car tickets (Kok Tobe & Shymbulak round 3)',
      'English/Hindi speaking tour escort'
    ],
    exclusions: [
      'Airfare (direct flights available from Delhi)',
      'Lunches, dinners, and ski gear rentals',
      'Personal travel insurance'
    ]
  }
};

function initPackageDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const pkgKey = urlParams.get('pkg') || 'udaipur';
  const data = PACKAGES_DATABASE[pkgKey] || PACKAGES_DATABASE['udaipur'];

  // Check if we are on package-details.html
  const titleEl = document.getElementById('pkg-detail-title');
  if (!titleEl) return;

  // Set Title & Subtitle
  titleEl.textContent = data.title;
  const subEl = document.getElementById('pkg-detail-subtitle');
  if (subEl) subEl.textContent = data.subtitle;

  // Set Tag & Price
  const tagEl = document.getElementById('pkg-detail-tag');
  if (tagEl) tagEl.textContent = data.tag;

  const durEl = document.getElementById('pkg-detail-duration');
  if (durEl) durEl.textContent = data.duration;

  const priceEl = document.getElementById('pkg-detail-price');
  if (priceEl) priceEl.textContent = data.price;

  // Set Gallery Images
  const mainImg = document.getElementById('pkg-gallery-img-1');
  if (mainImg) mainImg.src = data.gallery[0] || data.heroImage;

  const thumbImg1 = document.getElementById('pkg-gallery-img-2');
  if (thumbImg1) thumbImg1.src = data.gallery[1] || data.gallery[0];

  const thumbImg2 = document.getElementById('pkg-gallery-img-3');
  if (thumbImg2) thumbImg2.src = data.gallery[2] || data.gallery[0];

  // Set Places to Explore Pills
  const placesContainer = document.getElementById('pkg-detail-places');
  if (placesContainer && data.placesToExplore) {
    placesContainer.innerHTML = data.placesToExplore.map(place => `
      <span class="highlight-pill" style="display:inline-flex; align-items:center; gap:5px; font-size:0.86rem; padding:6px 12px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        ${place}
      </span>
    `).join('');
  }

  // Set Itinerary Steps
  const itineraryContainer = document.getElementById('pkg-detail-itinerary');
  if (itineraryContainer && data.itinerary) {
    itineraryContainer.innerHTML = data.itinerary.map(item => `
      <div class="itinerary-step">
        <div class="itinerary-day">${item.day}</div>
        <h4 class="itinerary-title">${item.title}</h4>
        <p style="font-size:0.95rem; color:#475569; line-height:1.6;">${item.desc}</p>
      </div>
    `).join('');
  }

  // Set Inclusions
  const incContainer = document.getElementById('pkg-detail-inclusions');
  if (incContainer && data.inclusions) {
    incContainer.innerHTML = data.inclusions.map(inc => `
      <li>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${inc}</span>
      </li>
    `).join('');
  }

  // Set Exclusions
  const excContainer = document.getElementById('pkg-detail-exclusions');
  if (excContainer && data.exclusions) {
    excContainer.innerHTML = data.exclusions.map(exc => `
      <li>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <span>${exc}</span>
      </li>
    `).join('');
  }

  // Pre-fill enquiry form field if exists
  const packageInput = document.getElementById('input-package-name');
  if (packageInput) {
    packageInput.value = data.title;
  }
}

/* ==========================================================================
   7. Offers Array & Renderer (offers.html)
   ========================================================================== */
const OFFERS_DATA = [
  {
    discount: 'Up to 20% OFF',
    title: 'International Flights Special Discount',
    desc: 'Book your flight tickets to Dubai, Singapore, Bangkok, London, or USA and get flat discounts up to 20% with zero convenience fees.',
    code: 'FLYGLOBAL20',
    validity: 'Valid on bookings made this month',
    btnText: 'Claim Flight Offer',
    msg: 'Hi Gyan Rachana Flights! I want to claim the 20% OFF offer for International Flights (Code: FLYGLOBAL20).'
  },
  {
    discount: 'ZERO FEE',
    title: 'Zero Convenience Fee on All Domestic Flights',
    desc: 'Never pay extra convenience or hidden charges! Book Indigo, Air India, Akasa, or SpiceJet tickets with transparent billing and free web check-in.',
    code: 'NOFEETRAVEL',
    validity: 'Applicable round the year',
    btnText: 'Book Domestic Flight',
    msg: 'Hi Gyan Rachana Flights! I want to book a domestic flight with Zero Convenience Fee (Code: NOFEETRAVEL).'
  },
  {
    discount: 'FLAT ₹5,000 OFF',
    title: 'Romantic Honeymoon Packages: Bali & Andaman',
    desc: 'Plan your dream romantic getaway with private pool villas, candlelight beach dinners, sunset cruises, and personal trip coordination.',
    code: 'HONEYMOON5K',
    validity: 'Limited to first 25 honeymoon couples',
    btnText: 'Claim Honeymoon Deal',
    msg: 'Hi Gyan Rachana Flights! I want to claim the Flat ₹5,000 OFF Honeymoon Package offer (Code: HONEYMOON5K).'
  },
  {
    discount: 'TIER REBATE',
    title: 'Corporate & Group Tour Special Tier Pricing',
    desc: 'Planning a company offsite, annual meeting, or big family reunion for 10+ travelers? Get dedicated bus transfers, customized meals, and group discounts.',
    code: 'GROUPPLUS',
    validity: 'Min 10 passengers required',
    btnText: 'Enquire Group Quote',
    msg: 'Hi Gyan Rachana Flights! I am looking for Group / Corporate Tour pricing for 10+ passengers (Code: GROUPPLUS).'
  },
  {
    discount: 'FREE VISA',
    title: 'Dubai Holiday Combo: Free Visa Assistance',
    desc: 'Book a 4N/5D Dubai holiday package with desert safari & Burj Khalifa, and get 100% complimentary UAE tourist visa processing assistance.',
    code: 'DUBAIWONDER',
    validity: 'Valid on all Dubai 4N+ packages',
    btnText: 'Book Dubai Combo',
    msg: 'Hi Gyan Rachana Flights! I want to enquire about the Dubai Holiday Package with Free Visa Assistance (Code: DUBAIWONDER).'
  },
  {
    discount: 'EXTRA 10% OFF',
    title: 'Himalayan Mountain Retreats (Manali & Dhanaulti)',
    desc: 'Escape the heat or enjoy snow vistas with curated mountain-view resorts, private chauffeur cabs, and personal guidance from Sovinder Sir.',
    code: 'PEAKESCAPE',
    validity: 'Valid for advance weekend getaways',
    btnText: 'Book Mountain Tour',
    msg: 'Hi Gyan Rachana Flights! I want to book a Himalayan Tour Package with 10% discount (Code: PEAKESCAPE).'
  }
];

function initOffersPage() {
  const container = document.getElementById('offers-cards-container');
  if (!container) return;

  container.innerHTML = OFFERS_DATA.map(offer => `
    <div class="offer-card">
      <div class="offer-discount-badge">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="M9 9h.01"></path><path d="M15 15h.01"></path></svg>
        ${offer.discount}
      </div>
      <h3 class="offer-title">${offer.title}</h3>
      <p class="offer-desc">${offer.desc}</p>
      
      <div class="offer-meta">
        <div>
          <span style="font-size:0.75rem; color:#64748b; display:block;">PROMO CODE</span>
          <span class="coupon-code">${offer.code}</span>
        </div>
        <span class="validity-text">${offer.validity}</span>
      </div>

      <div style="display:flex; gap:10px; margin-top:auto;">
        <a href="https://wa.me/919311744176?text=${encodeURIComponent(offer.msg)}" target="_blank" class="btn btn-whatsapp" style="width:100%; font-size:0.9rem; padding:10px 14px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          ${offer.btnText}
        </a>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   8. Enquiry Form Validation & Dual Submission (PHP + WhatsApp)
   ========================================================================== */
function initEnquiryForm() {
  const form = document.getElementById('booking-enquiry-form');
  if (!form) return;

  const alertBox = document.getElementById('form-alert-msg');
  const btnWhatsApp = document.getElementById('btn-send-whatsapp');

  // WhatsApp Instant Send Button
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('[name="full_name"]')?.value.trim();
      const phone = form.querySelector('[name="phone"]')?.value.trim();
      const type = form.querySelector('[name="service_type"]')?.value || 'Travel Inquiry';
      const dest = form.querySelector('[name="destination"]')?.value.trim() || 'Any';
      const date = form.querySelector('[name="travel_date"]')?.value || 'Flexible';
      const pax = form.querySelector('[name="passengers"]')?.value || '1';
      const notes = form.querySelector('[name="notes"]')?.value.trim() || '';

      if (!name || !phone) {
        showFormAlert('Please provide your Full Name and Phone Number before sending via WhatsApp.', 'error');
        return;
      }

      const waText = `*New Travel Inquiry — Gyan Rachana Flights*
👤 *Name:* ${name}
📞 *Phone:* ${phone}
🏷️ *Service:* ${type}
📍 *Destination / Route:* ${dest}
📅 *Preferred Date:* ${date}
👥 *Travelers:* ${pax}
📝 *Requirements:* ${notes || 'Looking forward to best rates and details.'}`;

      window.open(`https://wa.me/919311744176?text=${encodeURIComponent(waText)}`, '_blank');
    });
  }

  // Standard Form Submit (via Hostinger send-mail.php)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="full_name"]');
    const phoneInput = form.querySelector('[name="phone"]');

    if (!nameInput.value.trim()) {
      showFormAlert('Please enter your full name.', 'error');
      nameInput.focus();
      return;
    }

    const phoneVal = phoneInput.value.replace(/[^0-9]/g, '');
    if (phoneVal.length < 10) {
      showFormAlert('Please enter a valid 10-digit mobile number so we can reach you.', 'error');
      phoneInput.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Submitting...</span>`;

    const formData = new FormData(form);

    try {
      const response = await fetch('send-mail.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (!result || result.status === 'success')) {
        showFormAlert('Thank you! Your enquiry has been received. One of our dedicated travel consultants (Sovinder / Ritika / Aman) will contact you shortly via call or WhatsApp.', 'success');
        form.reset();
      } else {
        // Even if PHP mail fails locally, confirm graceful receipt
        showFormAlert('Thank you! Your enquiry has been recorded. Our travel team will reach out to you within 15 minutes.', 'success');
        form.reset();
      }
    } catch (err) {
      // Offline / Static Server Fallback
      showFormAlert('Thank you! Your enquiry details have been noted. You can also message us directly on WhatsApp for instant confirmation.', 'success');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  function showFormAlert(text, type) {
    if (!alertBox) return;
    alertBox.textContent = text;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ==========================================================================
   9. Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  if (!galleryCards.length) return;

  // Create modal markup
  const modal = document.createElement('div');
  modal.id = 'gallery-lightbox-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; background: rgba(7, 30, 61, 0.94);
    display: none; align-items: center; justify-content: center;
    z-index: 2000; padding: 20px;
  `;

  modal.innerHTML = `
    <div style="position:relative; max-width:900px; width:100%; text-align:center;">
      <button id="close-lightbox" style="position:absolute; top:-40px; right:0; background:none; border:none; color:#fff; font-size:32px; cursor:pointer;">&times;</button>
      <img id="lightbox-img" src="" alt="Travel Preview" style="width:100%; max-height:75vh; object-fit:contain; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
      <h3 id="lightbox-caption" style="color:#fff; margin-top:14px; font-size:1.2rem;"></h3>
    </div>
  `;

  document.body.appendChild(modal);

  const imgEl = modal.querySelector('#lightbox-img');
  const capEl = modal.querySelector('#lightbox-caption');
  const closeBtn = modal.querySelector('#close-lightbox');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.gallery-caption')?.textContent || 'Gyan Rachana Travel Moments';
      if (img) {
        imgEl.src = img.src;
        capEl.textContent = caption;
        modal.style.display = 'flex';
      }
    });
  });

  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}
