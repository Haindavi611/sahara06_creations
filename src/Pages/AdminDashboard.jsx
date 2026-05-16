import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaImage,
  FaBoxOpen,
  FaLayerGroup,
  FaStar,
  FaHome,
} from "react-icons/fa";
import {
  KEYS,
  defaultProducts,
  defaultCollections,
  defaultReviews,
  loadData,
  saveData,
} from "../data/store";
// ─── Helpers ─────────────────────────────────────────────────────
const BADGE_OPTIONS = [
  "",
  "Best Seller",
  "New",
  "Trending",
  "Sale",
  "Most Loved",
];
const BADGE_CLASS = { "": "", New: "new", Sale: "sale" };
function emptyProduct(firstCategory = "Resin Art") {
  return {
    id: Date.now(),
    categories: [firstCategory],
    emoji: "✨",
    images: [],
    name: "",
    desc: "",
    price: "",
    originalPrice: "",
    badge: "",
    badgeClass: "",
  };
}
// Toggle a category in/out of the categories array
function toggleCategory(current = [], cat) {
  return current.includes(cat)
    ? current.filter((c) => c !== cat)
    : [...current, cat];
}
function emptyCollection() {
  return { id: Date.now(), emoji: "✨", title: "", desc: "", tag: "" };
}
// ─── Confirm Dialog ───────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="admin-overlay">
      {" "}
      <div className="admin-confirm">
        {" "}
        <p>{message}</p>{" "}
        <div className="admin-confirm-btns">
          {" "}
          <button className="admin-btn danger" onClick={onConfirm}>
            Delete
          </button>{" "}
          <button className="admin-btn ghost" onClick={onCancel}>
            Cancel
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
// ─── Products Manager ─────────────────────────────────────────────
function ProductsManager() {
  const [products, setProducts] = useState(() =>
    loadData(KEYS.products, defaultProducts),
  );
  const [editing, setEditing] = useState(null);
  // null | product object
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef();
  // Dynamic categories from collections
  const collections = loadData(KEYS.collections, defaultCollections);
  const dynamicCategories = collections.map((c) => c.title);
  const firstCategory = dynamicCategories[0] || "Resin Art";
  const persist = (data) => {
    setProducts(data);
    saveData(KEYS.products, data);
  };
  const startAdd = () => {
    setEditing(emptyProduct(firstCategory));
    setIsNew(true);
  };
  const startEdit = (p) => {
    setEditing({ ...p });
    setIsNew(false);
  };
  const cancelEdit = () => {
    setEditing(null);
    setIsNew(false);
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setEditing((p) => ({
          ...p,
          images: [...(p.images || []), ev.target.result],
        }));
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };
  const removeImage = (idx) =>
    setEditing((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  const handleSave = () => {
    if (!editing.name.trim() || !editing.price.trim()) return;
    if (!editing.categories?.length) return;
    const badgeClass = BADGE_CLASS[editing.badge] ?? "";
    // Migrate legacy single image → images array
    const images = editing.images?.length
      ? editing.images
      : editing.image
        ? [editing.image]
        : [];
    // Migrate legacy single category → categories array
    const categories = editing.categories?.length
      ? editing.categories
      : editing.category
        ? [editing.category]
        : [dynamicCategories[0]];
    const updated = {
      ...editing,
      categories,
      category: undefined,
      images,
      image: undefined,
      badgeClass,
    };
    if (isNew) {
      persist([...products, updated]);
    } else {
      persist(products.map((p) => (p.id === updated.id ? updated : p)));
    }
    cancelEdit();
  };
  const handleDelete = () => {
    persist(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };
  return (
    <div className="admin-section">
      {" "}
      <div className="admin-section-header">
        {" "}
        <h2>
          <FaBoxOpen /> Products{" "}
          <span className="admin-count">{products.length}</span>
        </h2>{" "}
        <button className="admin-btn primary" onClick={startAdd}>
          <FaPlus /> Add Product
        </button>{" "}
      </div>{" "}
      <div className="admin-table-wrap">
        {" "}
        <table className="admin-table">
          {" "}
          <thead>
            {" "}
            <tr>
              {" "}
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Badge</th>
              <th>Actions</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {products.map((p) => (
              <tr key={p.id}>
                {" "}
                <td>
                  {" "}
                  {p.images?.[0] || p.image ? (
                    <img
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      className="admin-thumb"
                    />
                  ) : (
                    <span className="admin-emoji-cell">{p.emoji}</span>
                  )}{" "}
                </td>{" "}
                <td className="admin-name-cell">{p.name}</td>{" "}
                <td>
                  {" "}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {" "}
                    {(p.categories || (p.category ? [p.category] : [])).map(
                      (c) => (
                        <span key={c} className="admin-tag">
                          {c}
                        </span>
                      ),
                    )}{" "}
                  </div>{" "}
                </td>{" "}
                <td>
                  {p.price}
                  {p.originalPrice && (
                    <del className="admin-del">{p.originalPrice}</del>
                  )}
                </td>{" "}
                <td>
                  {p.badge && (
                    <span className={`product-badge ${p.badgeClass}`}>
                      {p.badge}
                    </span>
                  )}
                </td>{" "}
                <td className="admin-actions">
                  {" "}
                  <button
                    className="admin-icon-btn edit"
                    onClick={() => startEdit(p)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>{" "}
                  <button
                    className="admin-icon-btn delete"
                    onClick={() => setDeleteId(p.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      {/* Edit / Add Modal */}{" "}
      {editing && (
        <div className="admin-overlay">
          {" "}
          <div className="admin-modal">
            {" "}
            <div className="admin-modal-header">
              {" "}
              <h3>{isNew ? "Add Product" : "Edit Product"}</h3>{" "}
              <button className="admin-icon-btn" onClick={cancelEdit}>
                <FaTimes />
              </button>{" "}
            </div>{" "}
            <div className="admin-modal-body">
              {" "}
              {/* Multi-Image Upload */}{" "}
              <div className="admin-multi-images">
                {" "}
                {(editing.images || []).map((img, i) => (
                  <div key={i} className="admin-img-thumb-wrap">
                    {" "}
                    <img
                      src={img}
                      alt={`img-${i}`}
                      className="admin-img-thumb"
                    />{" "}
                    <button
                      className="admin-img-remove"
                      onClick={() => removeImage(i)}
                      title="Remove"
                    >
                      ✕
                    </button>{" "}
                    {i === 0 && (
                      <span className="admin-img-primary-badge">Main</span>
                    )}{" "}
                  </div>
                ))}{" "}
                <div
                  className="admin-img-add"
                  onClick={() => fileRef.current.click()}
                >
                  {" "}
                  <FaImage /> <span>Add Images</span>{" "}
                </div>{" "}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />{" "}
              </div>{" "}
              {editing.images?.length > 0 && (
                <p className="admin-img-hint">
                  First image is the main display image. Click ✕ to remove.
                </p>
              )}{" "}
              <div className="admin-form-grid">
                {" "}
                <div className="admin-field">
                  {" "}
                  <label>Product Name *</label>{" "}
                  <input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Product name"
                  />{" "}
                </div>{" "}
                <div className="admin-field full">
                  {" "}
                  <label>
                    Collections *{" "}
                    <span
                      style={{ fontWeight: 400, color: "var(--text-light)" }}
                    >
                      (select one or more)
                    </span>
                  </label>{" "}
                  <div className="admin-category-checks">
                    {" "}
                    {dynamicCategories.map((c) => {
                      const checked = (editing.categories || []).includes(c);
                      return (
                        <label
                          key={c}
                          className={`admin-cat-check ${checked ? "checked" : ""}`}
                        >
                          {" "}
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setEditing((p) => ({
                                ...p,
                                categories: toggleCategory(
                                  p.categories || [],
                                  c,
                                ),
                              }))
                            }
                          />{" "}
                          {c}{" "}
                        </label>
                      );
                    })}{" "}
                  </div>{" "}
                  {!editing.categories?.length && (
                    <span style={{ fontSize: 12, color: "var(--rose)" }}>
                      Select at least one collection.
                    </span>
                  )}{" "}
                </div>{" "}
                <div className="admin-field">
                  {" "}
                  <label>Emoji (if no image)</label>{" "}
                  <input
                    value={editing.emoji}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, emoji: e.target.value }))
                    }
                    placeholder="e.g. 🌊"
                  />{" "}
                </div>{" "}
                <div className="admin-field">
                  {" "}
                  <label>Price *</label>{" "}
                  <div className="admin-price-wrap">
                    {" "}
                    <span className="admin-price-prefix">₹</span>{" "}
                    <input
                      value={String(editing.price || "").replace(/^₹/, "")}
                      onChange={(e) =>
                        setEditing((p) => ({
                          ...p,
                          price: `₹${e.target.value.replace(/^₹/, "")}`,
                        }))
                      }
                      placeholder="899"
                      style={{ paddingLeft: 28 }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="admin-field">
                  {" "}
                  <label>Original Price (optional)</label>{" "}
                  <div className="admin-price-wrap">
                    {" "}
                    <span className="admin-price-prefix">₹</span>{" "}
                    <input
                      value={String(editing.originalPrice || "").replace(
                        /^₹/,
                        "",
                      )}
                      onChange={(e) =>
                        setEditing((p) => ({
                          ...p,
                          originalPrice: e.target.value
                            ? `₹${e.target.value.replace(/^₹/, "")}`
                            : "",
                        }))
                      }
                      placeholder="1,199"
                      style={{ paddingLeft: 28 }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="admin-field">
                  {" "}
                  <label>Badge</label>{" "}
                  <select
                    value={editing.badge}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, badge: e.target.value }))
                    }
                  >
                    {" "}
                    {BADGE_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b || "None"}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
                <div className="admin-field full">
                  {" "}
                  <label>Description *</label>{" "}
                  <textarea
                    rows={3}
                    value={editing.desc}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, desc: e.target.value }))
                    }
                    placeholder="Product description..."
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="admin-modal-footer">
              {" "}
              <button className="admin-btn primary" onClick={handleSave}>
                <FaSave /> Save
              </button>{" "}
              <button className="admin-btn ghost" onClick={cancelEdit}>
                Cancel
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {deleteId && (
        <ConfirmDialog
          message="Delete this product? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}{" "}
    </div>
  );
}
// ─── Collections Manager ──────────────────────────────────────────
function CollectionsManager() {
  const [collections, setCollections] = useState(() =>
    loadData(KEYS.collections, defaultCollections),
  );
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saveError, setSaveError] = useState("");
  // Count products per collection
  const allProducts = loadData(KEYS.products, defaultProducts);
  const productCountByCategory = allProducts.reduce((acc, p) => {
    const cats = p.categories || (p.category ? [p.category] : []);
    cats.forEach((c) => {
      acc[c] = (acc[c] || 0) + 1;
    });
    return acc;
  }, {});
  const persist = (data) => {
    const saved = saveData(KEYS.collections, data);
    if (!saved) {
      setSaveError(
        "Collection could not be saved. Your browser storage may be full, especially if many product images were uploaded.",
      );
      return false;
    }
    setSaveError("");
    setCollections(data);
    return true;
  };
  const startAdd = () => {
    setSaveError("");
    setEditing(emptyCollection());
    setIsNew(true);
  };
  const startEdit = (c) => {
    setSaveError("");
    setEditing({ ...c });
    setIsNew(false);
  };
  const cancelEdit = () => {
    setEditing(null);
    setIsNew(false);
  };
  const handleSave = () => {
    if (!editing.title.trim()) return;
    const nextCollections = isNew
      ? [...collections, editing]
      : collections.map((c) => (c.id === editing.id ? editing : c));
    if (persist(nextCollections)) cancelEdit();
  };
  const handleDelete = () => {
    persist(collections.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  return (
    <div className="admin-section">
      {" "}
      <div className="admin-section-header">
        {" "}
        <h2>
          <FaLayerGroup /> Collections{" "}
          <span className="admin-count">{collections.length}</span>
        </h2>{" "}
        <button className="admin-btn primary" onClick={startAdd}>
          <FaPlus /> Add Collection
        </button>{" "}
      </div>{" "}
      <div className="admin-cards-grid">
        {" "}
        {collections.map((c) => (
          <div className="admin-collection-card" key={c.id}>
            {" "}
            <div className="admin-collection-emoji">{c.emoji}</div>{" "}
            <div className="admin-collection-info">
              {" "}
              <strong>{c.title}</strong> <p>{c.desc}</p>{" "}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {" "}
                {c.tag && <span className="admin-tag">{c.tag}</span>}{" "}
                <span
                  className="admin-tag"
                  style={{ background: "#f0fdf4", color: "#16a34a" }}
                >
                  {" "}
                  📦 {productCountByCategory[c.title] || 0} product
                  {productCountByCategory[c.title] !== 1 ? "s" : ""}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="admin-card-actions">
              {" "}
              <button
                className="admin-icon-btn edit"
                onClick={() => startEdit(c)}
              >
                <FaEdit />
              </button>{" "}
              <button
                className="admin-icon-btn delete"
                onClick={() => setDeleteId(c.id)}
              >
                <FaTrash />
              </button>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {editing && (
        <div className="admin-overlay">
          {" "}
          <div className="admin-modal">
            {" "}
            <div className="admin-modal-header">
              {" "}
              <h3>{isNew ? "Add Collection" : "Edit Collection"}</h3>{" "}
              <button className="admin-icon-btn" onClick={cancelEdit}>
                <FaTimes />
              </button>{" "}
            </div>{" "}
            <div className="admin-modal-body">
              {" "}
              {saveError && <div className="admin-error">{saveError}</div>}{" "}
              <div className="admin-form-grid">
                {" "}
                <div className="admin-field">
                  {" "}
                  <label>Title *</label>{" "}
                  <input
                    value={editing.title}
                    onChange={(e) =>
                      setEditing((c) => ({ ...c, title: e.target.value }))
                    }
                    placeholder="e.g. Resin Art"
                  />{" "}
                </div>{" "}
                <div className="admin-field">
                  {" "}
                  <label>Emoji</label>{" "}
                  <input
                    value={editing.emoji}
                    onChange={(e) =>
                      setEditing((c) => ({ ...c, emoji: e.target.value }))
                    }
                    placeholder="e.g. ✨"
                  />{" "}
                </div>{" "}
                <div className="admin-field">
                  {" "}
                  <label>Tag</label>{" "}
                  <input
                    value={editing.tag}
                    onChange={(e) =>
                      setEditing((c) => ({ ...c, tag: e.target.value }))
                    }
                    placeholder="e.g. Best Seller"
                  />{" "}
                </div>{" "}
                <div className="admin-field full">
                  {" "}
                  <label>Description</label>{" "}
                  <textarea
                    rows={3}
                    value={editing.desc}
                    onChange={(e) =>
                      setEditing((c) => ({ ...c, desc: e.target.value }))
                    }
                    placeholder="Collection description..."
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="admin-modal-footer">
              {" "}
              <button className="admin-btn primary" onClick={handleSave}>
                <FaSave /> Save
              </button>{" "}
              <button className="admin-btn ghost" onClick={cancelEdit}>
                Cancel
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {deleteId && (
        <ConfirmDialog
          message="Delete this collection?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}{" "}
    </div>
  );
}
// ─── Reviews Manager ──────────────────────────────────────────────
function ReviewsManager() {
  const [reviews, setReviews] = useState(() =>
    loadData(KEYS.reviews, defaultReviews),
  );
  const [deleteId, setDeleteId] = useState(null);
  const persist = (data) => {
    setReviews(data);
    saveData(KEYS.reviews, data);
  };
  const handleDelete = () => {
    persist(reviews.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  };
  return (
    <div className="admin-section">
      {" "}
      <div className="admin-section-header">
        {" "}
        <h2>
          <FaStar /> Reviews{" "}
          <span className="admin-count">{reviews.length}</span>
        </h2>{" "}
      </div>{" "}
      <div className="admin-table-wrap">
        {" "}
        <table className="admin-table">
          {" "}
          <thead>
            {" "}
            <tr>
              <th>Rating</th>
              <th>Name</th>
              <th>Location</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {reviews.map((r) => (
              <tr key={r.id}>
                {" "}
                <td>{"★".repeat(r.rating)}</td>{" "}
                <td>
                  <strong>{r.name}</strong>
                </td>{" "}
                <td>{r.location}</td>{" "}
                <td className="admin-review-text">"{r.quote}"</td>{" "}
                <td>
                  {" "}
                  <button
                    className="admin-icon-btn delete"
                    onClick={() => setDeleteId(r.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      {deleteId && (
        <ConfirmDialog
          message="Delete this review?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}{" "}
    </div>
  );
}
// ─── Dashboard Shell ──────────────────────────────────────────────
const TABS = [
  { key: "products", label: "Products", icon: <FaBoxOpen /> },
  { key: "collections", label: "Collections", icon: <FaLayerGroup /> },
  { key: "reviews", label: "Reviews", icon: <FaStar /> },
];
export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);
  if (!isAdmin) return null;
  const handleLogout = () => {
    logout();
    navigate("/admin");
  };
  return (
    <div className="admin-dashboard">
      {" "}
      {/* Sidebar */}{" "}
      <aside className="admin-sidebar">
        {" "}
        <div className="admin-sidebar-brand">
          {" "}
          <span>🛡️</span>{" "}
          <div>
            {" "}
            <strong>Admin Panel</strong> <small>{user?.username}</small>{" "}
          </div>{" "}
        </div>{" "}
        <nav className="admin-sidebar-nav">
          {" "}
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`admin-nav-item ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {" "}
              {t.icon} {t.label}{" "}
            </button>
          ))}{" "}
        </nav>{" "}
        <div className="admin-sidebar-footer">
          {" "}
          <button className="admin-nav-item" onClick={() => navigate("/")}>
            {" "}
            <FaHome /> View Site{" "}
          </button>{" "}
          <button className="admin-nav-item logout" onClick={handleLogout}>
            {" "}
            <FaSignOutAlt /> Logout{" "}
          </button>{" "}
        </div>{" "}
      </aside>{" "}
      {/* Main Content */}{" "}
      <main className="admin-main">
        {" "}
        <div className="admin-topbar">
          {" "}
          <h1>
            {" "}
            {TABS.find((t) => t.key === activeTab)?.icon}{" "}
            {TABS.find((t) => t.key === activeTab)?.label} Management{" "}
          </h1>{" "}
        </div>{" "}
        <div className="admin-content">
          {" "}
          {activeTab === "products" && <ProductsManager />}{" "}
          {activeTab === "collections" && <CollectionsManager />}{" "}
          {activeTab === "reviews" && <ReviewsManager />}{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
