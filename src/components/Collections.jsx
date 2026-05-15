import { useNavigate } from "react-router-dom";

import { KEYS, defaultCollections, loadData } from "../data/store";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Collections() {
  const navigate = useNavigate();

  const collections = loadData(KEYS.collections, defaultCollections);

  return (
    <section className="collections" id="collections">
      <div className="section-header">
        <div className="section-tag">✨ Shop by Category</div>

        <h2>
          Our <span>Collections</span>
        </h2>

        <p>
          Handpicked categories crafted with passion. Every product tells a
          story - let yours begin here.
        </p>
      </div>
      <motion.div
        className="collection-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {collections.map((item) => (
          <motion.div
            className="collection-card"
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -10 }}
          >
            <div className="card-icon-wrap">{item.emoji}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <button
              className="card-link"
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(item.title)}`)
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Explore {item.title} →
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
