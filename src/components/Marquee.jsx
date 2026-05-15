const items = [
  "FREE SHIPPING OVER ₹2499",
  "PURELY HANDMADE",
  "PREMIUM QUALITY",
  "SECURE CHECKOUT",
  "24/7 SUPPORT",
  "HANDPICKED STYLES",
  "100% CUSTOMIZED",
  "RESIN ART",
  "PERSONALIZED GIFTS",
  "WATERPROOF NAME SLIPS",
];
export default function Marquee() {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items];
  return (
    <div className="marquee">
      {" "}
      <div className="marquee-track">
        {" "}
        <div className="marquee-content">
          {" "}
          {allItems.map((item, index) => (
            <span className="marquee-item" key={index}>
              {" "}
              <span className="marquee-dot">✦</span> {item}{" "}
            </span>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
