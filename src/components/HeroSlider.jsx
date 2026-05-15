import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const slides = [
  {
    badge: "🎨 Handcrafted Resin Art",
    title: (
      <>
        {" "}
        Where Art Meets <span>Elegance</span>{" "}
      </>
    ),
    desc: "Discover our world of custom resin art — each piece uniquely crafted with love, color, and imagination just for you.",
    primaryBtn: "Explore Collections",
    secondaryBtn: "Learn More",
    className: "hero-slide-1",
  },
  {
    badge: "🛍️ Limited Time Offer",
    title: (
      <>
        {" "}
        Up to <span>20% Off</span> on Bulk Orders{" "}
      </>
    ),
    desc: "Elevate your home decor and gifting game without breaking the bank. Premium quality at unbeatable prices.",
    primaryBtn: "Shop the Sale",
    secondaryBtn: "View All Products",
    className: "hero-slide-2",
  },
  {
    badge: "✨ New Arrivals",
    title: (
      <>
        {" "}
        Fresh Styles <span>Every Week</span>{" "}
      </>
    ),
    desc: "Be the first to discover what's trending this season. Personalized gifts, name slips, t-shirts & more.",
    primaryBtn: "See What's New",
    secondaryBtn: "Custom Order",
    className: "hero-slide-3",
  },
];
const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "100%", label: "Handmade" },
  { value: "4.9★", label: "Avg. Rating" },
  { value: "50+", label: "Unique Designs" },
];
export default function HeroSlider() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      {" "}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={700}
      >
        {" "}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {" "}
            <div className={`hero-slide ${slide.className}`}>
              {" "}
              {/* Decorative orbs */} <div className="hero-orb hero-orb-1" />{" "}
              <div className="hero-orb hero-orb-2" />{" "}
              <div className="hero-badge">{slide.badge}</div>{" "}
              <h1>{slide.title}</h1> <p>{slide.desc}</p>{" "}
              <div className="hero-btns">
                {" "}
                <button
                  className="hero-btn-primary"
                  onClick={() => navigate("/products")}
                >
                  {" "}
                  {slide.primaryBtn}{" "}
                </button>{" "}
                <button
                  className="hero-btn-secondary"
                  onClick={() => navigate("/products")}
                >
                  {" "}
                  {slide.secondaryBtn}{" "}
                </button>{" "}
              </div>{" "}
              <div className="hero-stats">
                {" "}
                {stats.map((stat, i) => (
                  <div className="hero-stat" key={i}>
                    {" "}
                    <strong>{stat.value}</strong> <span>{stat.label}</span>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </SwiperSlide>
        ))}{" "}
      </Swiper>{" "}
    </section>
  );
}
