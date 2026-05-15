import { useNavigate, Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
export default function Header() {
  const navigate = useNavigate();
  const goToSection = (e, sectionId) => {
    e.preventDefault();
    navigate(`/#${sectionId}`);
  };
  return (
    <header className="header">
      {" "}
      <Link to="/" className="brand">
        {" "}
        <img src="/logo.png" alt="Sahara06 Creations Logo" />{" "}
        <div className="brand-text">
          {" "}
          <h1>Sahara06_Creations</h1> <p>✨ Customized with love</p>{" "}
        </div>{" "}
      </Link>{" "}
      <nav className="header-nav">
        {" "}
        <Link to="/">Home</Link>{" "}
        <a href="/#collections" onClick={(e) => goToSection(e, "collections")}>
          {" "}
          Collections{" "}
        </a>{" "}
        <a href="/#features" onClick={(e) => goToSection(e, "features")}>
          {" "}
          Why Us{" "}
        </a>{" "}
        <Link to="/products">Products</Link>{" "}
        <a href="/#reviews" onClick={(e) => goToSection(e, "reviews")}>
          {" "}
          Reviews{" "}
        </a>{" "}
      </nav>{" "}
      <div className="header-actions">
        {" "}
        <button className="btn-shop" onClick={() => navigate("/products")}>
          {" "}
          <FaShoppingBag /> Shop Now{" "}
        </button>{" "}
      </div>{" "}
    </header>
  );
}
