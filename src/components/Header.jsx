import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaShoppingBag, FaTimes } from "react-icons/fa";
export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const goToSection = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(`/#${sectionId}`);
  };
  const closeMenu = () => setMenuOpen(false);
  const goToProducts = () => {
    closeMenu();
    navigate("/products");
  };
  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`}>
      {" "}
      <Link to="/" className="brand">
        {" "}
        <img src="/logo.png" alt="Sahara06 Creations Logo" />{" "}
        <div className="brand-text">
          {" "}
          <h1>Sahara06_Creations</h1> <p>✨ Customized with love</p>{" "}
        </div>{" "}
      </Link>{" "}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>{" "}
      <nav className="header-nav">
        {" "}
        <Link to="/" onClick={closeMenu}>Home</Link>{" "}
        <a href="/#collections" onClick={(e) => goToSection(e, "collections")}>
          {" "}
          Collections{" "}
        </a>{" "}
        <a href="/#features" onClick={(e) => goToSection(e, "features")}>
          {" "}
          Why Us{" "}
        </a>{" "}
        <Link to="/products" onClick={closeMenu}>Products</Link>{" "}
        <a href="/#reviews" onClick={(e) => goToSection(e, "reviews")}>
          {" "}
          Reviews{" "}
        </a>{" "}
      </nav>{" "}
      <div className="header-actions">
        {" "}
        <button className="btn-shop" onClick={goToProducts}>
          {" "}
          <FaShoppingBag /> Shop Now{" "}
        </button>{" "}
      </div>{" "}
    </header>
  );
}
