import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa";
import { KEYS, defaultCollections, loadData } from "../data/store";
const whatsappUrl =
  "https://api.whatsapp.com/send?phone=917382953453&text=Hi!%20I%20want%20to%20place%20an%20order";
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  // ── Dynamic categories from localStorage ──────────────────────
  const collections = loadData(KEYS.collections, defaultCollections);
  // ── Scroll to a section — works from any page ─────────────────
  const goToSection = (sectionId) => {
    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };
  return (
    <footer className="footer">
      {" "}
      <div className="footer-grid">
        {" "}
        {/* Brand Column */}{" "}
        <div className="footer-brand">
          {" "}
          <h2>Sahara06_Creations</h2>{" "}
          <p>
            {" "}
            Your one-stop destination for customized resin products,
            personalized gifts, and handcrafted art — made with love, just for
            you.{" "}
          </p>{" "}
          <div className="footer-socials">
            {" "}
            <a
              href="https://www.instagram.com/sahara06_creations?igsh=Z2p1cjlwaG81NHpi&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Instagram"
            >
              {" "}
              <FaInstagram />{" "}
            </a>{" "}
            <a
              href={whatsappUrl}
              className="social-btn whatsapp-social"
              aria-label="WhatsApp"
            >
              {" "}
              <FaWhatsapp />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        {/* Quick Links */}{" "}
        <div className="footer-col">
          {" "}
          <h4>Quick Links</h4>{" "}
          <ul>
            {" "}
            <li>
              <Link to="/" className="footer-link-btn">
                Home
              </Link>
            </li>{" "}
            <li>
              {" "}
              <button
                className="footer-link-btn"
                onClick={() => goToSection("collections")}
              >
                {" "}
                Collections{" "}
              </button>{" "}
            </li>{" "}
            <li>
              <Link to="/products" className="footer-link-btn">
                Products
              </Link>
            </li>{" "}
            <li>
              {" "}
              <button
                className="footer-link-btn"
                onClick={() => goToSection("features")}
              >
                {" "}
                Why Us{" "}
              </button>{" "}
            </li>{" "}
            <li>
              {" "}
              <button
                className="footer-link-btn"
                onClick={() => goToSection("reviews")}
              >
                {" "}
                Reviews{" "}
              </button>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* Categories — loaded dynamically from localStorage */}{" "}
        <div className="footer-col">
          {" "}
          <h4>Categories</h4>{" "}
          <ul>
            {" "}
            {collections.map((col) => (
              <li key={col.id}>
                {" "}
                <Link
                  to={`/products?category=${encodeURIComponent(col.title)}`}
                  className="footer-link-btn"
                >
                  {" "}
                  {col.emoji} {col.title}{" "}
                </Link>{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>{" "}
        {/* Contact */}{" "}
        <div className="footer-col">
          {" "}
          <h4>Get in Touch</h4>{" "}
          <ul>
            {" "}
            <li>
              {" "}
              <a
                href={whatsappUrl}
              >
                {" "}
                📱 +91 73829 53453{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                href="https://www.instagram.com/sahara06_creations"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                📸 @sahara06_creations{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                href={whatsappUrl}
              >
                {" "}
                💬 WhatsApp Order{" "}
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      <div className="footer-bottom">
        {" "}
        <p>
          {" "}
          © 2026 Sahara06_Creations. Made with{" "}
          <FaHeart
            style={{
              color: "#e11d48",
              display: "inline",
              verticalAlign: "middle",
            }}
          />{" "}
          All rights reserved.{" "}
        </p>{" "}
        <div className="footer-bottom-links">
          {" "}
          <a href="#">Privacy Policy</a> <a href="#">Terms of Service</a>{" "}
          <a href="#">Refund Policy</a>{" "}
          <Link
            to="/admin"
            className="footer-link-btn"
            style={{ opacity: 0.4, fontSize: "12px" }}
          >
            {" "}
            🛡️ Admin{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
