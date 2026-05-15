import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
const defaultReviews = [
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
];
const STORAGE_KEY = "sahara06_reviews";
const CARDS_PER_PAGE = 3;
function loadReviews() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return defaultReviews;
}
function saveReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (_) {}
}
function StarDisplay({ rating }) {
  return (
    <div className="stars">
      {" "}
      {"★".repeat(rating)} {"☆".repeat(5 - rating)}{" "}
    </div>
  );
}
function getInitial(name) {
  return name ? name.trim()[0].toUpperCase() : "?";
}
export default function Testimonials() {
  const [reviews, setReviews] = useState(loadReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 0,
    quote: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  // Persist reviews to localStorage whenever they change
  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);
  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);
  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + CARDS_PER_PAGE,
  );
  const canPrev = currentIndex > 0;
  const canNext = currentIndex + CARDS_PER_PAGE < reviews.length;
  const handlePrev = () => {
    if (canPrev) setCurrentIndex((i) => i - CARDS_PER_PAGE);
  };
  const handleNext = () => {
    if (canNext) setCurrentIndex((i) => i + CARDS_PER_PAGE);
  };
  const handleDot = (pageIndex) => {
    setCurrentIndex(pageIndex * CARDS_PER_PAGE);
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.rating) e.rating = "Please select a rating";
    if (!form.quote.trim() || form.quote.trim().length < 10)
      e.quote = "Review must be at least 10 characters";
    return e;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const newReview = {
      id: Date.now(),
      rating: form.rating,
      quote: form.quote.trim(),
      name: form.name.trim(),
      location: form.location.trim(),
    };
    setReviews((prev) => {
      const updated = [newReview, ...prev];
      return updated;
    });
    setCurrentIndex(0);
    setForm({ name: "", location: "", rating: 0, quote: "" });
    setHoverRating(0);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };
  const currentPage = Math.floor(currentIndex / CARDS_PER_PAGE);
  return (
    <section className="testimonials" id="reviews">
      {" "}
      <div className="section-header">
        {" "}
        <div className="section-tag">💬 Customer Love</div>{" "}
        <h2>
          {" "}
          What Our <span>Customers Say</span>{" "}
        </h2>{" "}
        <p>
          {" "}
          Real stories from real people who fell in love with our handcrafted
          creations.{" "}
        </p>{" "}
      </div>{" "}
      {/* ── Slider ── */}{" "}
      <div className="testimonials-slider-wrap">
        {" "}
        <div className="testimonials-slider-viewport">
          {" "}
          <AnimatePresence mode="wait">
            {" "}
            <motion.div
              className="testimonials-slider-track"
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {" "}
              {visibleReviews.map((t) => (
                <div className="testimonial-card" key={t.id}>
                  {" "}
                  <StarDisplay rating={t.rating} />{" "}
                  <blockquote>"{t.quote}"</blockquote>{" "}
                  <div className="testimonial-author">
                    {" "}
                    <div className="author-avatar">
                      {getInitial(t.name)}
                    </div>{" "}
                    <div className="author-info">
                      {" "}
                      <strong>{t.name}</strong>{" "}
                      <span>📍 {t.location}</span>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </motion.div>{" "}
          </AnimatePresence>{" "}
        </div>{" "}
        {/* Navigation */}{" "}
        <div className="testimonials-nav">
          {" "}
          <button
            className="testimonials-nav-btn"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous reviews"
          >
            {" "}
            <FaChevronLeft />{" "}
          </button>{" "}
          <div className="testimonials-nav-dots">
            {" "}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`nav-dot ${i === currentPage ? "active" : ""}`}
                onClick={() => handleDot(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}{" "}
          </div>{" "}
          <button
            className="testimonials-nav-btn"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next reviews"
          >
            {" "}
            <FaChevronRight />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* ── Review Form ── */}{" "}
      <div className="review-form-section">
        {" "}
        <h3>Share Your Experience ✨</h3>{" "}
        <p>Loved our products? We'd love to hear from you!</p>{" "}
        <form className="review-form" onSubmit={handleSubmit} noValidate>
          {" "}
          {/* Name */}{" "}
          <div className="form-group">
            {" "}
            <label htmlFor="rev-name">Your Name *</label>{" "}
            <input
              id="rev-name"
              type="text"
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                setErrors((er) => ({ ...er, name: "" }));
              }}
              style={errors.name ? { borderColor: "#e11d48" } : {}}
            />{" "}
            {errors.name && (
              <span style={{ color: "#e11d48", fontSize: "13px" }}>
                {" "}
                {errors.name}{" "}
              </span>
            )}{" "}
          </div>{" "}
          {/* Location */}{" "}
          <div className="form-group">
            {" "}
            <label htmlFor="rev-location">Your City *</label>{" "}
            <input
              id="rev-location"
              type="text"
              placeholder="e.g. Hyderabad"
              value={form.location}
              onChange={(e) => {
                setForm((f) => ({ ...f, location: e.target.value }));
                setErrors((er) => ({ ...er, location: "" }));
              }}
              style={errors.location ? { borderColor: "#e11d48" } : {}}
            />{" "}
            {errors.location && (
              <span style={{ color: "#e11d48", fontSize: "13px" }}>
                {" "}
                {errors.location}{" "}
              </span>
            )}{" "}
          </div>{" "}
          {/* Star Rating */}{" "}
          <div className="form-group full-width">
            {" "}
            <label>Your Rating *</label>{" "}
            <div className="star-rating-input">
              {" "}
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= (hoverRating || form.rating) ? "active" : ""}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => {
                    setForm((f) => ({ ...f, rating: star }));
                    setErrors((er) => ({ ...er, rating: "" }));
                  }}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  {" "}
                  <FaStar />{" "}
                </button>
              ))}{" "}
              {form.rating > 0 && (
                <span
                  style={{
                    marginLeft: "12px",
                    color: "var(--gold)",
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  {
                    ["", "Poor", "Fair", "Good", "Great", "Excellent!"][
                      form.rating
                    ]
                  }{" "}
                </span>
              )}{" "}
            </div>{" "}
            {errors.rating && (
              <span style={{ color: "#e11d48", fontSize: "13px" }}>
                {" "}
                {errors.rating}{" "}
              </span>
            )}{" "}
          </div>{" "}
          {/* Review Text */}{" "}
          <div className="form-group full-width">
            {" "}
            <label htmlFor="rev-quote">Your Review *</label>{" "}
            <textarea
              id="rev-quote"
              rows={4}
              placeholder="Tell us about your experience with our products..."
              value={form.quote}
              onChange={(e) => {
                setForm((f) => ({ ...f, quote: e.target.value }));
                setErrors((er) => ({ ...er, quote: "" }));
              }}
              style={errors.quote ? { borderColor: "#e11d48" } : {}}
            />{" "}
            {errors.quote && (
              <span style={{ color: "#e11d48", fontSize: "13px" }}>
                {" "}
                {errors.quote}{" "}
              </span>
            )}{" "}
          </div>{" "}
          {/* Success Message */}{" "}
          {submitted && (
            <div className="review-success">
              {" "}
              <FaCheckCircle
                style={{ fontSize: "20px", color: "#059669" }}
              />{" "}
              Thank you! Your review has been added and saved successfully.{" "}
            </div>
          )}{" "}
          {/* Submit */}{" "}
          <button type="submit" className="btn-submit-review">
            {" "}
            <FaPaperPlane /> Submit Review{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </section>
  );
}
