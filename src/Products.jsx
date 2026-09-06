import React from "react";

export default function Products({ onBack }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px" }}>
      <button 
        onClick={onBack}
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "24px"
        }}
      >
        ← Back to Portfolio
      </button>

      <div className="section-head">
        <h2>Products</h2>
        <p>Explore standalone products and applications.</p>
      </div>

      <div className="project-grid">
        <div className="project-card" style={{ padding: "24px" }}>
          <h3>Product Name</h3>
          <p>Product description goes here...</p>
        </div>
      </div>
    </div>
  );
}
