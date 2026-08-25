import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "skills", label: "Skills" },
];

const SKILLS_GET_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/Skillsget";

const SKILLS_POST_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/SkillPost";

export default function Admin() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("dashboard");

  /* =====================================================
     SKILLS STATE
     ===================================================== */

  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);

  const [showAddSkill, setShowAddSkill] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [addingSkill, setAddingSkill] = useState(false);

  const [skillError, setSkillError] = useState("");

  const isDark = theme === "dark";

  /* =====================================================
     GET SKILLS
     ===================================================== */

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

  /* =====================================================
     LOAD SKILLS WHEN SKILLS TAB IS OPENED
     ===================================================== */

  useEffect(() => {
    if (activeTab === "skills") {
      fetchSkills();
    }
  }, [activeTab]);

  /* =====================================================
     ADD SKILL
     ===================================================== */

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

      /* Clear form */

      setSkillName("");
      setImageLink("");

      /* Close modal */

      setShowAddSkill(false);

      /* Refresh skills */

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

  /* =====================================================
     OPEN ADD MODAL
     ===================================================== */

  const openAddSkill = () => {
    setSkillName("");
    setImageLink("");
    setSkillError("");
    setShowAddSkill(true);
  };

  /* =====================================================
     CLOSE ADD MODAL
     ===================================================== */

  const closeAddSkill = () => {
    if (addingSkill) return;

    setShowAddSkill(false);
    setSkillName("");
    setImageLink("");
    setSkillError("");
  };

  return (
    <div
      className={
        isDark ? "theme-dark" : "theme-light"
      }
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

        button,
        input,
        textarea {
          font-family: inherit;
        }


        /* =================================================
           THEMES
           ================================================= */

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

          transition:
            background-color .35s ease,
            color .35s ease;
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

          transition:
            background-color .35s ease,
            color .35s ease;
        }


        /* =================================================
           TOP NAV
           ================================================= */

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

          background:
            color-mix(
              in srgb,
              var(--bg) 88%,
              transparent
            );
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


        /* =================================================
           THEME TOGGLE
           ================================================= */

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


        /* =================================================
           LOGOUT
           ================================================= */

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


        /* =================================================
           LAYOUT
           ================================================= */

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

          border-left:
            2px solid var(--accent);
        }

        .admin-content {
          flex: 1;
          padding: 32px;
        }

        .content-title {
          font-size: 24px;
          font-weight: 700;

          margin:
            0 0 8px 0;
        }

        .content-sub {
          color: var(--text-muted);

          font-size: 14px;

          margin:
            0 0 28px 0;
        }


        /* =================================================
           EMPTY STATE
           ================================================= */

        .empty-state {
          border:
            1px dashed var(--border);

          border-radius: 12px;

          padding:
            60px 24px;

          text-align: center;

          color: var(--text-muted);

          background: var(--surface);
        }

        .empty-state h3 {
          color: var(--text);

          margin:
            0 0 6px 0;
        }


        /* =================================================
           SKILLS HEADER
           ================================================= */

        .skills-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 24px;
        }

        .skills-header-text h1 {
          margin: 0 0 8px 0;
        }

        .skills-header-text p {
          margin: 0;

          color: var(--text-muted);

          font-size: 14px;
        }


        /* =================================================
           ADD SKILL BUTTON
           ================================================= */

        .add-skill-btn {
          flex-shrink: 0;

          padding:
            10px 18px;

          border-radius: 9px;

          border:
            1px solid var(--accent);

          background:
            var(--accent);

          color: white;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          transition:
            transform .2s ease,
            box-shadow .2s ease,
            opacity .2s ease;
        }

        .add-skill-btn:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 10px 25px -12px
            var(--accent);
        }


        /* =================================================
           SKILLS GRID
           ================================================= */

        .admin-skills-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(180px, 1fr)
            );

          gap: 16px;
        }

        .admin-skill-card {
          position: relative;

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
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .admin-skill-card:hover {
          transform:
            translateY(-3px);

          border-color:
            var(--accent);

          box-shadow:
            0 15px 35px -25px
            var(--accent);
        }

        .admin-skill-image {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          object-fit: contain;

          border-radius: 10px;

          padding: 7px;

          background:
            var(--surface-2);

          border:
            1px solid var(--border);
        }

        .admin-skill-name {
          color: var(--text);

          font-size: 14px;

          font-weight: 600;

          word-break: break-word;
        }

        .admin-skill-id {
          margin-top: 4px;

          color: var(--text-muted);

          font-size: 11px;
        }


        /* =================================================
           ERROR
           ================================================= */

        .skill-error {
          margin-bottom: 18px;

          padding:
            12px 14px;

          border-radius: 9px;

          border:
            1px solid
            color-mix(
              in srgb,
              #ef4444 35%,
              var(--border)
            );

          background:
            color-mix(
              in srgb,
              #ef4444 8%,
              var(--surface)
            );

          color:
            #ef4444;

          font-size: 13px;
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

          color: var(--text-muted);

          background:
            var(--surface);
        }


        /* =================================================
           ADD SKILL MODAL
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

        .skill-modal {
          width: 100%;

          max-width: 460px;

          padding: 28px;

          border:
            1px solid var(--border);

          border-radius: 18px;

          background:
            var(--surface);

          box-shadow:
            0 30px 80px
            rgba(0, 0, 0, .4);

          animation:
            skillModalIn .2s ease;
        }

        @keyframes skillModalIn {

          from {
            opacity: 0;

            transform:
              translateY(15px)
              scale(.97);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }


        /* =================================================
           MODAL HEADER
           ================================================= */

        .skill-modal-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 24px;
        }

        .skill-modal-header h2 {
          margin: 0;

          color: var(--text);

          font-size: 21px;
        }

        .skill-modal-close {
          width: 34px;
          height: 34px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          border:
            1px solid var(--border);

          background:
            var(--surface-2);

          color:
            var(--text);

          font-size: 21px;

          cursor: pointer;

          transition:
            all .2s ease;
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

          margin-bottom: 18px;
        }

        .skill-form-group label {
          color:
            var(--text);

          font-size: 13px;

          font-weight: 600;
        }

        .skill-form-group input {
          width: 100%;

          padding:
            12px 14px;

          border-radius: 9px;

          border:
            1px solid var(--border);

          outline: none;

          background:
            var(--surface-2);

          color:
            var(--text);

          font-size: 13px;

          transition:
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .skill-form-group input::placeholder {
          color:
            var(--text-muted);
        }

        .skill-form-group input:focus {
          border-color:
            var(--accent);

          box-shadow:
            0 0 0 3px
            color-mix(
              in srgb,
              var(--accent) 15%,
              transparent
            );
        }


        /* =================================================
           SUBMIT BUTTON
           ================================================= */

        .skill-submit-btn {
          width: 100%;

          padding:
            12px;

          margin-top: 6px;

          border:
            1px solid var(--accent);

          border-radius: 9px;

          background:
            var(--accent);

          color: white;

          font-size: 13px;

          font-weight: 700;

          cursor: pointer;

          transition:
            transform .2s ease,
            opacity .2s ease;
        }

        .skill-submit-btn:hover {
          transform:
            translateY(-1px);
        }

        .skill-submit-btn:disabled {
          opacity: .6;

          cursor:
            not-allowed;

          transform:
            none;
        }


        /* =================================================
           MOBILE
           ================================================= */

        @media (max-width: 720px) {

          .admin-sidebar {
            width: 72px;
          }

          .sidebar-item span.label {
            display: none;
          }

          .admin-content {
            padding: 24px 18px;
          }

          .skills-header {
            align-items:
              flex-start;

            flex-direction:
              column;
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


      {/* =================================================
          NAV
          ================================================= */}

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
              {isDark ? "🌙" : "☀️"}
            </span>
          </button>

          <button className="logout-btn">
            Logout
          </button>

        </div>

      </nav>


      {/* =================================================
          LAYOUT
          ================================================= */}

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


        {/* =================================================
            CONTENT
            ================================================= */}

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
                    on your homepage.
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


              {/* SKILLS */}

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

                        <div>

                          <div className="admin-skill-name">
                            {skill.name}
                          </div>

                          <div className="admin-skill-id">
                            ID: {skill.id}
                          </div>

                        </div>

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
                      to create your first skill.
                    </p>

                  </div>

                )}

            </>

          )}

        </main>

      </div>


      {/* =================================================
          ADD SKILL MODAL
          ================================================= */}

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
                className="skill-modal-close"
                onClick={closeAddSkill}
                disabled={addingSkill}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleAddSkill}>

              {/* SKILL NAME */}

              <div className="skill-form-group">

                <label>
                  Skill Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Java"
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


              {/* IMAGE LINK */}

              <div className="skill-form-group">

                <label>
                  Image Link
                </label>

                <input
                  type="url"
                  placeholder="https://example.com/java.svg"
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

    </div>
  );
}
