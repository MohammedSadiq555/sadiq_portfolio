import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "skills", label: "Skills" },
];

const SKILLS_GET_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/Skillsget";

const SKILLS_POST_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/SkillPost";

const SKILLS_PUT_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/SkillsUpdate";

export default function Admin() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("dashboard");

  // =====================================================
  // SKILLS
  // =====================================================

  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillError, setSkillError] = useState("");

  // =====================================================
  // ADD SKILL
  // =====================================================

  const [showAddSkill, setShowAddSkill] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [addingSkill, setAddingSkill] = useState(false);

  // =====================================================
  // EDIT SKILL
  // =====================================================

  const [showEditSkill, setShowEditSkill] = useState(false);

  const [editingSkill, setEditingSkill] = useState(null);

  const [updatingSkill, setUpdatingSkill] = useState(false);

  const isDark = theme === "dark";

  // =====================================================
  // GET SKILLS
  // =====================================================

  const fetchSkills = async () => {
    try {
      setSkillsLoading(true);
      setSkillError("");

      const response = await fetch(SKILLS_GET_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();

      const formattedSkills = data.map((item) => ({
        id: item.Skills.Id,
        name: item.Skills.skillname,
        icon: item.Skills.imagelink,
      }));

      setSkills(formattedSkills);
    } catch (error) {
      console.error("Failed to fetch skills:", error);

      setSkillError(
        "Failed to load skills from OutSystems."
      );
    } finally {
      setSkillsLoading(false);
    }
  };

  // =====================================================
  // LOAD SKILLS
  // =====================================================

  useEffect(() => {
    if (activeTab === "skills") {
      fetchSkills();
    }
  }, [activeTab]);

  // =====================================================
  // ADD SKILL
  // =====================================================

  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!skillName.trim()) {
      setSkillError("Please enter a skill name.");
      return;
    }

    if (!imageLink.trim()) {
      setSkillError("Please enter an image link.");
      return;
    }

    try {
      setAddingSkill(true);
      setSkillError("");

      const url =
        `${SKILLS_POST_API}` +
        `?ImageLink=${encodeURIComponent(imageLink.trim())}` +
        `&SkillName=${encodeURIComponent(skillName.trim())}`;

      const response = await fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      setSkillName("");
      setImageLink("");
      setShowAddSkill(false);

      await fetchSkills();
    } catch (error) {
      console.error("Failed to add skill:", error);

      setSkillError(
        "Failed to add skill. Please try again."
      );
    } finally {
      setAddingSkill(false);
    }
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddSkill = () => {
    setSkillName("");
    setImageLink("");
    setSkillError("");
    setShowAddSkill(true);
  };

  // =====================================================
  // CLOSE ADD MODAL
  // =====================================================

  const closeAddSkill = () => {
    if (addingSkill) return;

    setShowAddSkill(false);
    setSkillName("");
    setImageLink("");
    setSkillError("");
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditSkill = (skill) => {
    setEditingSkill({
      id: skill.id,
      name: skill.name,
      icon: skill.icon,
    });

    setSkillError("");
    setShowEditSkill(true);
  };

  // =====================================================
  // CLOSE EDIT MODAL
  // =====================================================

  const closeEditSkill = () => {
    if (updatingSkill) return;

    setShowEditSkill(false);
    setEditingSkill(null);
    setSkillError("");
  };

  // =====================================================
  // UPDATE SKILL
  // =====================================================

  const handleEditSkill = async (e) => {
    e.preventDefault();

    if (!editingSkill) {
      return;
    }

    if (!editingSkill.name.trim()) {
      setSkillError("Please enter a skill name.");
      return;
    }

    if (!editingSkill.icon.trim()) {
      setSkillError("Please enter an image link.");
      return;
    }

    try {
      setUpdatingSkill(true);
      setSkillError("");

      /*
       * YOUR ACTUAL OUTSYSTEMS API:
       *
       * SkillsUpdate
       *
       * Parameters:
       * SkillId
       * Name
       * InputURL
       */

      const url =
        `${SKILLS_PUT_API}` +
        `?SkillId=${encodeURIComponent(editingSkill.id)}` +
        `&Name=${encodeURIComponent(editingSkill.name.trim())}` +
        `&InputURL=${encodeURIComponent(editingSkill.icon.trim())}`;

      console.log("Updating skill:", url);

      const response = await fetch(url, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      console.log("Skill updated successfully.");

      // Close modal
      setShowEditSkill(false);
      setEditingSkill(null);

      // Refresh data from OutSystems
      await fetchSkills();

    } catch (error) {
      console.error(
        "Failed to update skill:",
        error
      );

      setSkillError(
        "Failed to update skill. Please try again."
      );
    } finally {
      setUpdatingSkill(false);
    }
  };

  return (
    <div
      className={
        isDark
          ? "theme-dark"
          : "theme-light"
      }
    >

      {/* =====================================================
          STYLES
          ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        button,
        input {
          font-family: inherit;
        }

        /* =================================================
           DARK THEME
           ================================================= */

        .theme-dark {
          --bg: #0C0F15;
          --surface: #171C27;
          --surface-2: #1D2330;
          --border: #262C3A;
          --text: #E8EAF0;
          --text-muted: #8D93A3;
          --accent: #3B5FE0;

          min-height: 100vh;

          background: var(--bg);
          color: var(--text);
        }

        /* =================================================
           LIGHT THEME
           ================================================= */

        .theme-light {
          --bg: #F1F2F5;
          --surface: #FFFFFF;
          --surface-2: #FAFAFC;
          --border: #DFE2E8;
          --text: #14171F;
          --text-muted: #62687A;
          --accent: #3B5FE0;

          min-height: 100vh;

          background: var(--bg);
          color: var(--text);
        }

        /* =================================================
           NAVBAR
           ================================================= */

        .admin-nav {
          position: sticky;
          top: 0;

          z-index: 50;

          height: 64px;

          padding:
            0 24px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          border-bottom:
            1px solid var(--border);

          background:
            var(--bg);
        }

        .admin-logo {
          font-size: 19px;

          font-weight: 700;
        }

        .admin-nav-right {
          display: flex;

          align-items: center;

          gap: 14px;
        }

        /* =================================================
           THEME BUTTON
           ================================================= */

        .theme-toggle {
          width: 44px;
          height: 24px;

          border:
            1px solid var(--border);

          border-radius: 999px;

          background:
            var(--surface);

          cursor: pointer;

          padding: 2px;
        }

        .theme-toggle-knob {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 18px;
          height: 18px;

          border-radius: 50%;

          background:
            var(--accent);

          font-size: 10px;

          transition:
            transform .25s ease;
        }

        .theme-light
        .theme-toggle-knob {
          transform:
            translateX(18px);
        }

        /* =================================================
           LOGOUT
           ================================================= */

        .logout-btn {
          padding:
            8px 15px;

          border:
            1px solid var(--border);

          border-radius: 8px;

          background:
            var(--surface);

          color:
            var(--text-muted);

          cursor: pointer;

          font-size: 13px;
        }

        .logout-btn:hover {
          border-color:
            var(--accent);

          color:
            var(--text);
        }

        /* =================================================
           LAYOUT
           ================================================= */

        .admin-layout {
          display: flex;

          min-height:
            calc(100vh - 64px);
        }

        .admin-sidebar {
          width: 220px;

          flex-shrink: 0;

          padding:
            24px 12px;

          border-right:
            1px solid var(--border);
        }

        .sidebar-item {
          width: 100%;

          padding:
            11px 14px;

          margin-bottom: 4px;

          border: none;

          border-radius: 8px;

          background:
            transparent;

          color:
            var(--text-muted);

          text-align: left;

          cursor: pointer;

          font-size: 14px;
        }

        .sidebar-item:hover {
          background:
            var(--surface);

          color:
            var(--text);
        }

        .sidebar-item.active {
          background:
            var(--surface);

          color:
            var(--text);

          border-left:
            2px solid var(--accent);
        }

        .admin-content {
          flex: 1;

          padding:
            32px;
        }

        /* =================================================
           TITLE
           ================================================= */

        .content-title {
          margin:
            0 0 8px;

          font-size: 25px;

          font-weight: 700;
        }

        .content-sub {
          margin:
            0 0 28px;

          color:
            var(--text-muted);

          font-size: 14px;
        }

        /* =================================================
           SKILLS HEADER
           ================================================= */

        .skills-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom:
            25px;
        }

        .skills-header-text h1 {
          margin-bottom: 7px;
        }

        .skills-header-text p {
          margin: 0;

          color:
            var(--text-muted);

          font-size: 14px;
        }

        /* =================================================
           ADD BUTTON
           ================================================= */

        .add-skill-btn {
          padding:
            11px 18px;

          border:
            1px solid var(--accent);

          border-radius: 9px;

          background:
            var(--accent);

          color: white;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          transition:
            transform .2s ease;
        }

        .add-skill-btn:hover {
          transform:
            translateY(-2px);
        }

        /* =================================================
           SKILLS GRID
           ================================================= */

        .admin-skills-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(260px, 1fr)
            );

          gap: 16px;
        }

        /* =================================================
           SKILL CARD
           ================================================= */

        .admin-skill-card {
          display: flex;

          align-items: center;

          gap: 14px;

          padding:
            16px;

          border:
            1px solid var(--border);

          border-radius: 14px;

          background:
            var(--surface);

          transition:
            transform .2s ease,
            border-color .2s ease;
        }

        .admin-skill-card:hover {
          transform:
            translateY(-2px);

          border-color:
            var(--accent);
        }

        .admin-skill-image {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          object-fit: contain;

          padding: 7px;

          border:
            1px solid var(--border);

          border-radius: 10px;

          background:
            var(--surface-2);
        }

        .admin-skill-info {
          flex: 1;

          min-width: 0;
        }

        .admin-skill-name {
          font-size: 14px;

          font-weight: 600;

          word-break: break-word;
        }

        .admin-skill-id {
          margin-top: 4px;

          color:
            var(--text-muted);

          font-size: 11px;
        }

        /* =================================================
           EDIT BUTTON
           ================================================= */

        .edit-skill-btn {
          flex-shrink: 0;

          padding:
            7px 12px;

          border:
            1px solid var(--border);

          border-radius: 7px;

          background:
            var(--surface-2);

          color:
            var(--text-muted);

          font-size: 12px;

          font-weight: 600;

          cursor: pointer;

          transition:
            all .2s ease;
        }

        .edit-skill-btn:hover {
          border-color:
            var(--accent);

          color:
            var(--accent);
        }

        /* =================================================
           LOADING
           ================================================= */

        .skills-loading {
          padding:
            60px 20px;

          border:
            1px dashed var(--border);

          border-radius: 12px;

          text-align: center;

          color:
            var(--text-muted);

          background:
            var(--surface);
        }

        /* =================================================
           EMPTY
           ================================================= */

        .empty-state {
          padding:
            60px 20px;

          border:
            1px dashed var(--border);

          border-radius: 12px;

          text-align: center;

          background:
            var(--surface);

          color:
            var(--text-muted);
        }

        .empty-state h3 {
          margin:
            0 0 8px;

          color:
            var(--text);
        }

        .empty-state p {
          margin: 0;
        }

        /* =================================================
           ERROR
           ================================================= */

        .skill-error {
          margin-bottom:
            18px;

          padding:
            12px 14px;

          border:
            1px solid #ef4444;

          border-radius: 9px;

          background:
            rgba(239, 68, 68, .08);

          color:
            #ef4444;

          font-size: 13px;
        }

        /* =================================================
           MODAL BACKDROP
           ================================================= */

        .skill-modal-backdrop {
          position: fixed;

          inset: 0;

          z-index: 100;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 20px;

          background:
            rgba(0, 0, 0, .65);

          backdrop-filter:
            blur(8px);
        }

        /* =================================================
           MODAL
           ================================================= */

        .skill-modal {
          width: 100%;

          max-width: 460px;

          padding:
            28px;

          border:
            1px solid var(--border);

          border-radius: 18px;

          background:
            var(--surface);

          box-shadow:
            0 30px 80px
            rgba(0, 0, 0, .45);
        }

        /* =================================================
           MODAL HEADER
           ================================================= */

        .skill-modal-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom:
            24px;
        }

        .skill-modal-header h2 {
          margin: 0;

          font-size: 21px;
        }

        .skill-modal-close {
          width: 34px;
          height: 34px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid var(--border);

          border-radius: 50%;

          background:
            var(--surface-2);

          color:
            var(--text);

          font-size: 21px;

          cursor: pointer;
        }

        .skill-modal-close:hover {
          border-color:
            var(--accent);

          color:
            var(--accent);
        }

        /* =================================================
           FORM
           ================================================= */

        .skill-form-group {
          display: flex;

          flex-direction: column;

          gap: 7px;

          margin-bottom:
            18px;
        }

        .skill-form-group label {
          font-size: 13px;

          font-weight: 600;
        }

        .skill-form-group input {
          width: 100%;

          padding:
            12px 14px;

          border:
            1px solid var(--border);

          border-radius: 9px;

          outline: none;

          background:
            var(--surface-2);

          color:
            var(--text);

          font-size: 13px;
        }

        .skill-form-group input:focus {
          border-color:
            var(--accent);

          box-shadow:
            0 0 0 3px
            rgba(59, 95, 224, .15);
        }

        /* =================================================
           SUBMIT
           ================================================= */

        .skill-submit-btn {
          width: 100%;

          padding:
            12px;

          margin-top: 5px;

          border:
            1px solid var(--accent);

          border-radius: 9px;

          background:
            var(--accent);

          color: white;

          font-size: 13px;

          font-weight: 700;

          cursor: pointer;
        }

        .skill-submit-btn:hover {
          opacity: .9;
        }

        .skill-submit-btn:disabled {
          opacity: .55;

          cursor:
            not-allowed;
        }

        /* =================================================
           MOBILE
           ================================================= */

        @media (max-width: 720px) {

          .admin-sidebar {
            width: 70px;
          }

          .admin-content {
            padding:
              24px 18px;
          }

          .skills-header {
            align-items:
              flex-start;

            flex-direction:
              column;

            gap: 16px;
          }

          .add-skill-btn {
            width: 100%;
          }

          .admin-skills-grid {
            grid-template-columns:
              1fr;
          }

        }

      `}</style>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <nav className="admin-nav">

        <div className="admin-logo">
          Mohammed Sadiq Admin Panel
        </div>

        <div className="admin-nav-right">

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(
                isDark
                  ? "light"
                  : "dark"
              )
            }
            aria-label="Toggle theme"
          >

            <span className="theme-toggle-knob">
              {isDark
                ? "🌙"
                : "☀️"}
            </span>

          </button>

          <button className="logout-btn">
            Logout
          </button>

        </div>

      </nav>

      {/* =====================================================
          MAIN LAYOUT
          ===================================================== */}

      <div className="admin-layout">

        {/* SIDEBAR */}

        <aside className="admin-sidebar">

          {NAV_ITEMS.map((item) => (

            <button
              key={item.id}
              className={
                "sidebar-item" +
                (
                  activeTab === item.id
                    ? " active"
                    : ""
                )
              }
              onClick={() =>
                setActiveTab(item.id)
              }
            >

              <span className="label">
                {item.label}
              </span>

            </button>

          ))}

        </aside>

        {/* ===================================================
            CONTENT
            =================================================== */}

        <main className="admin-content">

          {/* =================================================
              DASHBOARD
              ================================================= */}

          {activeTab === "dashboard" && (

            <>

              <h1 className="content-title">
                Dashboard
              </h1>

              <p className="content-sub">
                Overview of your portfolio content.
              </p>

              <div className="empty-state">

                <h3>
                  Nothing here yet
                </h3>

                <p>
                  Dashboard widgets will go here later.
                </p>

              </div>

            </>

          )}

          {/* =================================================
              SKILLS
              ================================================= */}

          {activeTab === "skills" && (

            <>

              <div className="skills-header">

                <div className="skills-header-text">

                  <h1 className="content-title">
                    Skills
                  </h1>

                  <p>
                    Manage the skills shown
                    on your portfolio.
                  </p>

                </div>

                <button
                  className="add-skill-btn"
                  onClick={openAddSkill}
                >
                  + Add Skill
                </button>

              </div>

              {/* ERROR */}

              {skillError && (
                <div className="skill-error">
                  {skillError}
                </div>
              )}

              {/* LOADING */}

              {skillsLoading && (

                <div className="skills-loading">
                  Loading skills...
                </div>

              )}

              {/* SKILL LIST */}

              {!skillsLoading &&
                !skillError &&
                skills.length > 0 && (

                  <div className="admin-skills-grid">

                    {skills.map((skill) => (

                      <div
                        className="admin-skill-card"
                        key={skill.id}
                      >

                        <img
                          className="admin-skill-image"
                          src={skill.icon}
                          alt={skill.name}
                        />

                        <div className="admin-skill-info">

                          <div className="admin-skill-name">
                            {skill.name}
                          </div>

                          <div className="admin-skill-id">
                            ID: {skill.id}
                          </div>

                        </div>

                        {/* EDIT */}

                        <button
                          type="button"
                          className="edit-skill-btn"
                          onClick={() =>
                            openEditSkill(skill)
                          }
                        >
                          Edit
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              {/* NO SKILLS */}

              {!skillsLoading &&
                !skillError &&
                skills.length === 0 && (

                  <div className="empty-state">

                    <h3>
                      No skills found
                    </h3>

                    <p>
                      Click "+ Add Skill"
                      to add your first skill.
                    </p>

                  </div>

                )}

            </>

          )}

        </main>

      </div>

      {/* =====================================================
          ADD SKILL MODAL
          ===================================================== */}

      {showAddSkill && (

        <div
          className="skill-modal-backdrop"
          onClick={closeAddSkill}
        >

          <div
            className="skill-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="skill-modal-header">

              <h2>
                Add Skill
              </h2>

              <button
                type="button"
                className="skill-modal-close"
                onClick={closeAddSkill}
                disabled={addingSkill}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddSkill}>

              {/* NAME */}

              <div className="skill-form-group">

                <label>
                  Skill Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. React"
                  value={skillName}
                  onChange={(e) =>
                    setSkillName(
                      e.target.value
                    )
                  }
                  disabled={addingSkill}
                  required
                />

              </div>

              {/* IMAGE */}

              <div className="skill-form-group">

                <label>
                  Image Link
                </label>

                <input
                  type="url"
                  placeholder="https://example.com/react.svg"
                  value={imageLink}
                  onChange={(e) =>
                    setImageLink(
                      e.target.value
                    )
                  }
                  disabled={addingSkill}
                  required
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="skill-submit-btn"
                disabled={addingSkill}
              >
                {addingSkill
                  ? "Adding Skill..."
                  : "Submit"}
              </button>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT SKILL MODAL
          ===================================================== */}

      {showEditSkill &&
        editingSkill && (

          <div
            className="skill-modal-backdrop"
            onClick={closeEditSkill}
          >

            <div
              className="skill-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="skill-modal-header">

                <h2>
                  Edit Skill
                </h2>

                <button
                  type="button"
                  className="skill-modal-close"
                  onClick={closeEditSkill}
                  disabled={updatingSkill}
                >
                  ×
                </button>

              </div>

              <form
                onSubmit={handleEditSkill}
              >

                {/* =================================================
                    SKILL NAME
                    ================================================= */}

                <div className="skill-form-group">

                  <label>
                    Skill Name
                  </label>

                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        name:
                          e.target.value,
                      })
                    }
                    disabled={updatingSkill}
                    required
                  />

                </div>

                {/* =================================================
                    IMAGE LINK
                    ================================================= */}

                <div className="skill-form-group">

                  <label>
                    Image Link
                  </label>

                  <input
                    type="url"
                    value={editingSkill.icon}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        icon:
                          e.target.value,
                      })
                    }
                    disabled={updatingSkill}
                    required
                  />

                </div>

                {/* =================================================
                    ERROR
                    ================================================= */}

                {skillError && (

                  <div className="skill-error">
                    {skillError}
                  </div>

                )}

                {/* =================================================
                    UPDATE BUTTON
                    ================================================= */}

                <button
                  type="submit"
                  className="skill-submit-btn"
                  disabled={updatingSkill}
                >

                  {updatingSkill
                    ? "Updating..."
                    : "Update Skill"}

                </button>

              </form>

            </div>

          </div>

        )}

    </div>
  );
}
