import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Marquee from "./components/Marquee";
import Collections from "./components/Collections";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Products from "./Pages/products";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
const whatsappOrderUrl =
  "https://api.whatsapp.com/send?phone=917382953453&text=Hi!%20I%20want%20to%20place%20an%20order";
function Home() {
  return (
    <>
      {" "}
      <Header /> <HeroSlider /> <Marquee /> <Collections /> <Features />{" "}
      <Testimonials /> <Footer />{" "}
      <a
        href={whatsappOrderUrl}
        className="whatsapp-float"
      >
        {" "}
        <FaWhatsapp /> WhatsApp Us{" "}
      </a>{" "}
    </>
  );
}
export default function App() {
  return (
    <AuthProvider>
      {" "}
      <BrowserRouter>
        {" "}
        <ScrollToTop />{" "}
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />{" "}
          <Route path="/products" element={<Products />} />{" "}
          <Route path="/admin" element={<AdminLogin />} />{" "}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </AuthProvider>
  );
}
