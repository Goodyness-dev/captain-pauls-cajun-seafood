export const BUSINESS_INFO = {
  name: "Captain Paul's Cajun Seafood",
  legalName: "Captain Paul's Cajun Seafood LLC",
  tagline: "Authentic Louisiana Cajun Seafood Boils, Fried Gulf Baskets & Southern Specialties in Corpus Christi",
  address: {
    street: "2743 Airline Rd",
    city: "Corpus Christi",
    state: "TX",
    zip: "78414",
    formatted: "2743 Airline Rd, Corpus Christi, TX 78414",
  },
  phone: "(361) 444-5086",
  secondaryPhone: "(361) 444-5087",
  website: "captainpaulscajunseafood.com",
  email: "info@captainpaulscajunseafood.com",
  googleMapsLink: "https://maps.google.com/?q=Captain+Paul%27s+Cajun+Seafood+2743+Airline+Rd+Corpus+Christi+TX+78414",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=2743%20Airline%20Rd%2C%20Corpus%20Christi%2C%20TX%2078414&t=&z=15&ie=UTF8&iwloc=&output=embed",
  
  hours: [
    { day: "Monday", open: "4:00 PM", close: "10:30 PM", note: "Dinner & Boils" },
    { day: "Tuesday", open: "4:00 PM", close: "10:30 PM", note: "Dinner & Boils" },
    { day: "Wednesday", open: "4:00 PM", close: "10:30 PM", note: "Dinner & Boils" },
    { day: "Thursday", open: "11:00 AM", close: "10:30 PM", note: "Lunch & Dinner" },
    { day: "Friday", open: "11:00 AM", close: "11:00 PM", note: "Late Night Boils" },
    { day: "Saturday", open: "11:00 AM", close: "11:00 PM", note: "Weekend Feast" },
    { day: "Sunday", open: "11:00 AM", close: "10:00 PM", note: "Family Sunday Boils" },
  ],

  history: [
    {
      year: "2021",
      title: "Bayou Heritage & Secret Recipes",
      description: "Founded on time-honored Louisiana Cajun traditions, hand-crafting a proprietary 14-spice seasoning blend and slow-steeped garlic butter boil recipe."
    },
    {
      year: "2023",
      title: "Grand Opening on Airline Road",
      description: "Established our welcoming Corpus Christi restaurant featuring spacious dining, family-style boil tables, and fresh Gulf seafood flown and hauled in daily."
    },
    {
      year: "2024",
      title: "Corpus Christi's Seafood Destination",
      description: "Recognized across the Coastal Bend for having the crispiest fried Gulf flounder, tender crawfish clusters, and hearty slow-simmered seafood gumbo."
    },
    {
      year: "Present",
      title: "Coastal Community Favorite",
      description: "Proudly serving local families, beach visitors, and seafood enthusiasts with unforgettable Cajun boils, takeout feasts, and true Southern hospitality."
    }
  ],

  owner: {
    name: "Captain Paul & The Boil Crew",
    role: "Founder & Cajun Pitmaster",
    quote: "Great Cajun seafood isn't a secret—it's fresh Gulf catch, bold bayou spices, and rich garlic butter served steaming hot with family and friends around the table."
  },

  reviews: [
    {
      author: "Carlos M.",
      location: "Corpus Christi, TX",
      source: "Yelp",
      rating: 5,
      date: "2 weeks ago",
      comment: "Hands down the best fried flounder and shrimp basket in Corpus Christi! The batter was perfectly crispy, not greasy, and the Cajun fries and hushpuppies hit the spot. Captain Paul's has earned our family's regular weekend spot."
    },
    {
      author: "Samantha K.",
      location: "Padre Island, TX",
      source: "Google Review",
      rating: 5,
      date: "1 month ago",
      comment: "The Snow Crab & Crawfish boil with Captain's Special garlic butter spice level medium was phenomenal! Juicy, packed with flavor, and generous portions of corn, sausage, and red potatoes. Service was top-notch."
    },
    {
      author: "Derrick L.",
      location: "Portland, TX",
      source: "Yelp",
      rating: 5,
      date: "3 weeks ago",
      comment: "If you're craving authentic Louisiana Cajun seafood in the Coastal Bend, this is it. The seafood gumbo had a rich, dark roux with genuine andouille sausage and crab. Will definitely be coming back for the King Crab!"
    },
    {
      author: "Amanda T.",
      location: "Corpus Christi, TX",
      source: "Google Review",
      rating: 5,
      date: "2 months ago",
      comment: "We held a family gathering with 12 people. The seafood boil combos were steaming hot, flavorful, and messy in the best possible way. Bibs, lemons, and garlic butter for days. Outstanding vibe and staff!"
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hour + minutes / 60;

  // Mon-Wed: 4:00 PM (16:00) to 10:30 PM (22.5)
  if (day >= 1 && day <= 3) {
    return currentTime >= 16 && currentTime < 22.5;
  }
  // Thu: 11:00 AM (11:00) to 10:30 PM (22.5)
  if (day === 4) {
    return currentTime >= 11 && currentTime < 22.5;
  }
  // Fri-Sat: 11:00 AM (11:00) to 11:00 PM (23:00)
  if (day === 5 || day === 6) {
    return currentTime >= 11 && currentTime < 23;
  }
  // Sun: 11:00 AM (11:00) to 10:00 PM (22:00)
  if (day === 0) {
    return currentTime >= 11 && currentTime < 22;
  }
  return false;
};
