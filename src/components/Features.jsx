import { motion } from "framer-motion";
const features = [
  { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹2499" },
  {
    icon: "🤲",
    title: "Purely Handmade",
    desc: "Crafted with care & precision",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    desc: "Only the finest materials used",
  },
  {
    icon: "🔒",
    title: "Secure Checkout",
    desc: "100% safe & encrypted payments",
  },
  { icon: "💬", title: "24/7 Support", desc: "Always here to help you" },
  { icon: "🎨", title: "100% Customized", desc: "Made exactly as you imagine" },
];
export default function Features() {
  return (
    <section className="features" id="features">
      {" "}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {" "}
        <h2>Why Choose Us? ✨</h2>{" "}
        <p>
          Everything we do is crafted with love, quality, and you in mind.
        </p>{" "}
      </motion.div>{" "}
      <div className="features-grid">
        {" "}
        {features.map((feature, index) => (
          <motion.div
            className="feature-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            {" "}
            <span className="feature-icon">{feature.icon}</span>{" "}
            <h4>{feature.title}</h4> <p>{feature.desc}</p>{" "}
          </motion.div>
        ))}{" "}
      </div>{" "}
    </section>
  );
}
