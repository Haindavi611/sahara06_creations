// ─── Storage Keys ───────────────────────────────────────────────
export const KEYS = {
  products: "sahara06_products",
  collections: "sahara06_collections",
  reviews: "sahara06_reviews",
};
// ─── Default Products ────────────────────────────────────────────
export const defaultProducts = [
  {
    id: 1,
    categories: ["Resin Art"],
    emoji: "🌊",
    images: [],
    name: "Ocean Wave Resin Coaster Set",
    desc: "Set of 4 handcrafted ocean-themed resin coasters with gold flakes.",
    price: "₹899",
    originalPrice: "₹1,199",
    badge: "Best Seller",
    badgeClass: "",
  },
  {
    id: 2,
    categories: ["Resin Art"],
    emoji: "🌸",
    images: [],
    name: "Floral Resin Tray",
    desc: "Elegant serving tray with preserved flowers embedded in crystal-clear resin.",
    price: "₹1,299",
    originalPrice: "₹1,699",
    badge: "New",
    badgeClass: "new",
  },
  {
    id: 3,
    categories: ["Resin Art", "Customized Gifts"],
    emoji: "🔑",
    images: [],
    name: "Custom Resin Keychain",
    desc: "Personalized resin keychain with your name or initials, glitter finish.",
    price: "₹249",
    originalPrice: "",
    badge: "Trending",
    badgeClass: "",
  },
  {
    id: 4,
    categories: ["Resin Art"],
    emoji: "🖼️",
    images: [],
    name: "Resin Art Frame",
    desc: "Beautiful abstract resin art in a premium wooden frame. Wall-ready.",
    price: "₹1,599",
    originalPrice: "₹1,999",
    badge: "Sale",
    badgeClass: "sale",
  },
  {
    id: 5,
    categories: ["Customized Gifts"],
    emoji: "🎂",
    images: [],
    name: "Birthday Gift Hamper",
    desc: "Curated birthday hamper with resin keychain, name slip & custom card.",
    price: "₹699",
    originalPrice: "₹999",
    badge: "Most Loved",
    badgeClass: "",
  },
  {
    id: 6,
    categories: ["Customized Gifts"],
    emoji: "💝",
    images: [],
    name: "Anniversary Gift Box",
    desc: "Romantic anniversary gift set with personalized resin art & message card.",
    price: "₹1,199",
    originalPrice: "",
    badge: "New",
    badgeClass: "new",
  },
  {
    id: 7,
    categories: ["Name Slips"],
    emoji: "🏷️",
    images: [],
    name: "Waterproof Name Slip",
    desc: "Durable, stylish waterproof name slips for bags, bottles & stationery.",
    price: "₹99",
    originalPrice: "",
    badge: "Trending",
    badgeClass: "",
  },
  {
    id: 8,
    categories: ["Name Slips"],
    emoji: "✏️",
    images: [],
    name: "Premium Name Slip Set (5 pcs)",
    desc: "Set of 5 premium customized name slips with your choice of color & font.",
    price: "₹399",
    originalPrice: "₹499",
    badge: "Sale",
    badgeClass: "sale",
  },
  {
    id: 9,
    categories: ["Custom T-Shirts"],
    emoji: "👕",
    images: [],
    name: "Custom Name T-Shirt",
    desc: "High-quality cotton t-shirt with your name or quote printed in vibrant colors.",
    price: "₹549",
    originalPrice: "₹699",
    badge: "Best Seller",
    badgeClass: "",
  },
  {
    id: 10,
    categories: ["Custom T-Shirts"],
    emoji: "🎨",
    images: [],
    name: "Logo Print T-Shirt",
    desc: "Custom logo or design printed on premium fabric. Perfect for teams & events.",
    price: "₹649",
    originalPrice: "",
    badge: "New",
    badgeClass: "new",
  },
]; // ─── Default Collections ─────────────────────────────────────────
export const defaultCollections = [
  {
    id: 1,
    emoji: "✨",
    title: "Resin Art",
    desc: "Elegant handcrafted resin products — coasters, trays, keychains, and more, made specially for you.",
    tag: "Best Seller",
  },
  {
    id: 2,
    emoji: "🎁",
    title: "Customized Gifts",
    desc: "Personalized gifts for birthdays, anniversaries, and every special memory worth celebrating.",
    tag: "Most Loved",
  },
  {
    id: 3,
    emoji: "🖋️",
    title: "Name Slips",
    desc: "Waterproof, stylish, and fully customized name slips crafted to make a lasting impression.",
    tag: "Trending",
  },
  {
    id: 4,
    emoji: "👕",
    title: "Custom T-Shirts",
    desc: "Printed personalized t-shirts with your name, logo, or design — wear your story.",
    tag: "New",
  },
]; // ─── Default Reviews ─────────────────────────────────────────────
export const defaultReviews = [
  {
    id: 1,
    rating: 5,
    quote:
      "Absolutely stunning resin coasters! The quality is beyond what I expected. Will definitely order again for gifting.",
    name: "Priya Sharma",
    location: "Hyderabad",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "Got a customized name slip for my daughter's school bag — it's waterproof, beautiful, and she loves it! Super fast delivery too.",
    name: "Anita Reddy",
    location: "Bangalore",
  },
  {
    id: 3,
    rating: 5,
    quote:
      "Ordered a custom t-shirt for my husband's birthday. The print quality is amazing and the fit is perfect. Highly recommend!",
    name: "Meena Krishnan",
    location: "Chennai",
  },
  {
    id: 4,
    rating: 5,
    quote:
      "The resin tray I ordered is a masterpiece! Everyone who visits asks where I got it. Sahara06 never disappoints.",
    name: "Divya Nair",
    location: "Kochi",
  },
  {
    id: 5,
    rating: 5,
    quote:
      "Ordered a birthday hamper for my best friend — she was in tears! The packaging was gorgeous and everything was perfect.",
    name: "Sneha Patel",
    location: "Mumbai",
  },
]; // ─── Generic helpers ─────────────────────────────────────────────
export function loadData(key, defaults) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (error) {
    console.error(`Unable to load ${key}`, error);
  }
  return defaults;
}
export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("sahara06:data-change", { detail: { key } }));
    return true;
  } catch (error) {
    console.error(`Unable to save ${key}`, error);
    return false;
  }
}
