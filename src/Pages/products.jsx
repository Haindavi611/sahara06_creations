import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  KEYS,
  defaultProducts,
  defaultCollections,
  loadData,
} from "../data/store";
const buildWhatsAppUrl = (message) =>
  `https://api.whatsapp.com/send?phone=917382953453&text=${encodeURIComponent(
    message,
  )}`;
// ─── Helper: ensure price starts with ₹ ─────────────────────────
function fmt(price) {
  if (!price) return "";
  const s = String(price).trim();
  return s.startsWith("₹") ? s : `₹${s}`;
}
// ─── Helper: get images array from product (supports old & new format) ──
function getImages(product) {
  if (product.images?.length) return product.images;
  if (product.image) return [product.image];
  return [];
}
// ─── Product Card Image Slider ───────────────────────────────────
function ProductImageSlider({ product, onExpand }) {
  const images = getImages(product);
  const [idx, setIdx] = useState(0);
  const prev = (e) => {
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };
  return (
    <div className="product-img-slider" onClick={onExpand}>
      {" "}
      {images.length > 0 ? (
        <img
          src={images[idx]}
          alt={product.name}
          className="product-slider-img"
        />
      ) : (
        <div className="product-img-placeholder-inner">
          {" "}
          <span className="product-emoji">{product.emoji}</span>{" "}
        </div>
      )}{" "}
      {/* Badge */}{" "}
      {product.badge && (
        <span className={`product-badge ${product.badgeClass}`}>
          {" "}
          {product.badge}{" "}
        </span>
      )}{" "}
      {/* Expand hint */}{" "}
      {images.length > 0 && (
        <div className="product-expand-hint">
          {" "}
          <FaExpand /> View{" "}
        </div>
      )}{" "}
      {/* Arrows — only if multiple images */}{" "}
      {images.length > 1 && (
        <>
          {" "}
          <button
            className="product-slider-arrow left"
            onClick={prev}
            aria-label="Previous"
          >
            {" "}
            <FaChevronLeft />{" "}
          </button>{" "}
          <button
            className="product-slider-arrow right"
            onClick={next}
            aria-label="Next"
          >
            {" "}
            <FaChevronRight />{" "}
          </button>{" "}
          {/* Dots */}{" "}
          <div className="product-slider-dots">
            {" "}
            {images.map((_, i) => (
              <button
                key={i}
                className={`product-slider-dot ${i === idx ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(i);
                }}
                aria-label={`Image ${i + 1}`}
              />
            ))}{" "}
          </div>{" "}
          {/* Counter */}{" "}
          <div className="product-slider-counter">
            {idx + 1} / {images.length}
          </div>{" "}
        </>
      )}{" "}
    </div>
  );
}
// ─── Lightbox ────────────────────────────────────────────────────
function Lightbox({ product, onClose }) {
  const images = getImages(product);
  const [idx, setIdx] = useState(0);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length],
  );
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);
  return (
    <AnimatePresence>
      {" "}
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {" "}
        <motion.div
          className="lightbox-content"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          {/* Close */}{" "}
          <button
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close"
          >
            {" "}
            <FaTimes />{" "}
          </button>{" "}
          {/* Left: Image area */}{" "}
          <div className="lightbox-img-area">
            {" "}
            {images.length > 0 ? (
              <AnimatePresence mode="wait">
                {" "}
                <motion.img
                  key={idx}
                  src={images[idx]}
                  alt={product.name}
                  className="lightbox-main-img"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                />{" "}
              </AnimatePresence>
            ) : (
              <div className="lightbox-emoji-placeholder">
                {" "}
                <span>{product.emoji}</span>{" "}
              </div>
            )}{" "}
            {images.length > 1 && (
              <>
                {" "}
                <button
                  className="lightbox-arrow left"
                  onClick={prev}
                  aria-label="Previous"
                >
                  {" "}
                  <FaChevronLeft />{" "}
                </button>{" "}
                <button
                  className="lightbox-arrow right"
                  onClick={next}
                  aria-label="Next"
                >
                  {" "}
                  <FaChevronRight />{" "}
                </button>{" "}
                <div className="lightbox-counter">
                  {idx + 1} / {images.length}
                </div>{" "}
              </>
            )}{" "}
          </div>{" "}
          {/* Right: Info panel */}{" "}
          <div className="lightbox-info">
            {" "}
            {product.badge && (
              <span
                className={`product-badge ${product.badgeClass}`}
                style={{ marginBottom: 12, display: "inline-block" }}
              >
                {" "}
                {product.badge}{" "}
              </span>
            )}{" "}
            <div className="lightbox-category">{product.category}</div>{" "}
            <h2 className="lightbox-title">{product.name}</h2>{" "}
            <p className="lightbox-desc">{product.desc}</p> {/* Thumbnails */}{" "}
            {images.length > 1 && (
              <div className="lightbox-thumbs">
                {" "}
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`lightbox-thumb-btn ${i === idx ? "active" : ""}`}
                    onClick={() => setIdx(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    {" "}
                    <img src={img} alt={thumb - `${i}`} />{" "}
                  </button>
                ))}{" "}
              </div>
            )}{" "}
            <div className="lightbox-price-row">
              {" "}
              <div className="product-price">
                {" "}
                <strong>{fmt(product.price)}</strong>{" "}
                {product.originalPrice && (
                  <del>{fmt(product.originalPrice)}</del>
                )}{" "}
              </div>{" "}
              <a
                href={buildWhatsAppUrl(`Hi! I want to order ${product.name}`)}
                className="btn-order"
                style={{ fontSize: 15, padding: "12px 24px" }}
              >
                {" "}
                <FaWhatsapp /> Order on WhatsApp{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>{" "}
      </motion.div>{" "}
    </AnimatePresence>
  );
}
// ─── Products Page ───────────────────────────────────────────────
export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lightboxProduct, setLightboxProduct] = useState(null);
  // Load categories dynamically from collections
  const collections = loadData(KEYS.collections, defaultCollections);
  const categories = ["All", ...collections.map((c) => c.title)];
  // Pre-select category from URL ?category=X
  const [activeFilter, setActiveFilter] = useState(() => {
    const cat = searchParams.get("category");
    return cat && collections.some((c) => c.title === cat) ? cat : "All";
  });
  // Re-sync filter whenever the URL ?category= param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    const cols = loadData(KEYS.collections, defaultCollections);
    if (cat && cols.some((c) => c.title === cat)) {
      setActiveFilter(cat);
    } else if (!cat) {
      setActiveFilter("All");
    }
  }, [searchParams]);
  // Load from localStorage (admin changes reflect here)
  const allProducts = loadData(KEYS.products, defaultProducts);
  const filtered =
    activeFilter === "All"
      ? allProducts
      : allProducts.filter((p) => {
          const cats = p.categories || (p.category ? [p.category] : []);
          return cats.includes(activeFilter);
        });
  return (
    <div className="products-page">
      {" "}
      <Header /> {/* Hero Banner */}{" "}
      <div className="products-hero">
        {" "}
        <h1>Our Products ✨</h1>{" "}
        <p>
          Handcrafted with love — browse our full collection and order via
          WhatsApp.
        </p>{" "}
      </div>{" "}
      <div className="products-body">
        {" "}
        {/* Back Button */}{" "}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            color: "var(--purple-light)",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            marginBottom: "32px",
            fontFamily: "inherit",
          }}
        >
          {" "}
          <FaArrowLeft /> Back to Home{" "}
        </button>{" "}
        {/* Filters */}{" "}
        <div className="products-filters">
          {" "}
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {" "}
              {cat}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        {/* Products Grid */}{" "}
        <motion.div className="products-grid" layout>
          {" "}
          <AnimatePresence>
            {" "}
            {filtered.map((product) => (
              <motion.div
                className="product-card"
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
              >
                {" "}
                {/* Image Slider */}{" "}
                <ProductImageSlider
                  product={product}
                  onExpand={() => setLightboxProduct(product)}
                />{" "}
                {/* Info */}{" "}
                <div className="product-info">
                  {" "}
                  <div className="product-category">
                    {product.category}
                  </div>{" "}
                  <h3>{product.name}</h3> <p>{product.desc}</p>{" "}
                  <div className="product-footer">
                    {" "}
                    <div className="product-price">
                      {" "}
                      <strong>{fmt(product.price)}</strong>{" "}
                      {product.originalPrice && (
                        <del>{fmt(product.originalPrice)}</del>
                      )}{" "}
                    </div>{" "}
                    <a
                      href={buildWhatsAppUrl(
                        `Hi! I want to order ${product.name}`,
                      )}
                      className="btn-order"
                    >
                      {" "}
                      <FaWhatsapp /> Order{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            ))}{" "}
          </AnimatePresence>{" "}
        </motion.div>{" "}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--text-light)",
            }}
          >
            {" "}
            <span style={{ fontSize: 48 }}>🔍</span>{" "}
            <p style={{ marginTop: 12, fontSize: 16 }}>
              No products in this category yet.
            </p>{" "}
          </div>
        )}{" "}
        {/* Custom Order Banner */}{" "}
        <div className="coming-soon-banner">
          {" "}
          <span className="emoji-big">🎨</span> <h2>Want Something Unique?</h2>{" "}
          <p>
            {" "}
            Don't see exactly what you're looking for? We create fully custom
            pieces tailored to your vision. Just reach out!{" "}
          </p>{" "}
          <a
            href={buildWhatsAppUrl("Hi! I want a custom order")}
            className="btn-whatsapp-order"
          >
            {" "}
            <FaWhatsapp /> Place a Custom Order{" "}
          </a>{" "}
        </div>{" "}
      </div>{" "}
      <Footer /> {/* Lightbox */}{" "}
      {lightboxProduct && (
        <Lightbox
          product={lightboxProduct}
          onClose={() => setLightboxProduct(null)}
        />
      )}{" "}
    </div>
  );
}
