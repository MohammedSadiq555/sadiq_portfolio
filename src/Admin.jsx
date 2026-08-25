import React, { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "skills", label: "Skills" },
];

export default function Admin() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("dashboard");

  const isDark = theme === "dark";

  return (
    <div
      className={isDark ? "theme-dark" : "theme-light"}
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
        }

        button, input, textarea {
          font-family: inherit;
        }

        .theme-dark {
          --bg: #0C0F15;
          --surface: #171C27;
          --surface-2: #1D2330;
          --border: #262C3A;
          --text: #E8EAF0;
          --text-muted: #8D93A3;
          --accent: #3B5FE0;
          --warm: #C1793F;

          background: var(--bg);
          color: var(--text);

          transition: background-color .35s ease, color .35s ease;
        }

        .theme-light {
          --bg: #F1F2F5;
          --surface: #FFFFFF;
          --surface-2: #FAFAFC;
          --border: #DFE2E8;
          --text: #14171F;
          --text-muted: #62687A;
          --accent: #3B5FE0;
          --warm: #C1793F;

          background: var(--bg);
          color: var(--text);

          transition: background-color .35s ease, color .35s ease;
        }

        /* ===== TOP NAV ===== */

        .admin-nav {
          position: sticky;
          top: 0;
          z-index: 50;

          padding: 18px 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid var(--border);

          backdrop-filter: blur(10px);

          background: color-mix(in srgb, var(--bg) 88%, transparent);
        }

        .admin-logo {
          font-size: 20px;
          font-weight: 700;
        }

        .admin-nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .theme-toggle {
          width: 44px;
          height: 24px;

          border-radius: 999px;

          border: 1px solid var(--border);
          background: var(--surface);

          position: relative;

          cursor: pointer;
          padding: 0;
        }

        .theme-toggle-knob {
          position: absolute;

          top: 2px;
          left: 2px;

          width: 18px;
          height: 18px;

          border-radius: 50%;

          background: var(--accent);

          display: flex;
          align-items: center;
          justify-content: center;

          transition: transform .3s ease;

          font-size: 11px;
        }

        .theme-dark .theme-toggle-knob {
          transform: translateX(0);
        }

        .theme-light .theme-toggle-knob {
          transform: translateX(20px);
        }

        .logout-btn {
          padding: 8px 16px;

          border-radius: 8px;
          border: 1px solid var(--border);

          background: var(--surface);
          color: var(--text-muted);

          font-size: 13px;
          cursor: pointer;

          transition: all .2s ease;
        }

        .logout-btn:hover {
          color: var(--text);
          border-color: var(--accent);
        }

        /* ===== LAYOUT ===== */

        .admin-layout {
          display: flex;
          min-height: calc(100vh - 62px);
        }

        .admin-sidebar {
          width: 220px;
          flex-shrink: 0;

          border-right: 1px solid var(--border);

          padding: 24px 12px;
        }

        .sidebar-item {
          width: 100%;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 10px 14px;
          margin-bottom: 4px;

          border-radius: 8px;

          border: none;
          background: none;

          color: var(--text-muted);

          font-size: 14px;
          text-align: left;

          cursor: pointer;

          transition: all .2s ease;
        }

        .sidebar-item:hover {
          background: var(--surface);
          color: var(--text);
        }

        .sidebar-item.active {
          background: var(--surface);
          color: var(--text);
          border-left: 2px solid var(--accent);
        }

        .admin-content {
          flex: 1;
          padding: 32px;
        }

        .content-title {
          font-size: 24px;
          font-weight: 700;

          margin: 0 0 8px 0;
        }

        .content-sub {
          color: var(--text-muted);
          font-size: 14px;

          margin: 0 0 28px 0;
        }

        .empty-state {
          border: 1px dashed var(--border);
          border-radius: 12px;

          padding: 60px 24px;

          text-align: center;

          color: var(--text-muted);

          background: var(--surface);
        }

        .empty-state h3 {
          color: var(--text);
          margin: 0 0 6px 0;
        }

        @media (max-width: 720px) {
          .admin-sidebar {
            width: 72px;
          }

          .sidebar-item span.label {
            display: none;
          }
        }
      `}</style>

      {/* NAV */}
      <nav className="admin-nav">
        <div className="admin-logo">Mohammed Sadiq Admin Panel</div>

        <div className="admin-nav-right">
          <button
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <span className="theme-toggle-knob">
              {isDark ? "🌙" : "☀️"}
            </span>
          </button>

          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* LAYOUT */}
      <div className="admin-layout">
        <aside className="admin-sidebar">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                "sidebar-item" +
                (activeTab === item.id ? " active" : "")
              }
              onClick={() => setActiveTab(item.id)}
            >
              <span className="label">{item.label}</span>
            </button>
          ))}
        </aside>

        <main className="admin-content">
          {activeTab === "dashboard" && (
            <>
              <h1 className="content-title">Dashboard</h1>
              <p className="content-sub">
                Overview of your portfolio content.
              </p>

              <div className="empty-state">
                <h3>Nothing here yet</h3>
                <p>Dashboard widgets will go here later.</p>
              </div>
            </>
          )}

          {activeTab === "skills" && (
            <>
              <h1 className="content-title">Skills</h1>
              <p className="content-sub">
                Manage the skills shown on your homepage.
              </p>

              <div className="empty-state">
                <h3>No functionality yet</h3>
                <p>Skill management will be added here later.</p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
