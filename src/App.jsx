import React, { useState, useEffect, useRef } from "react";

const TYPE_WORDS = ["Programmer", "Web Developer", "Designer"];

const PROJECT_GET_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/ProjectsAPI/getProject";

const EXPERIENCE_GET_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/ExperienceAPI/getExperience";

const EDUCATION = [
  {
    id: 1,
    institution: "SSLC",
    degree: "",
    start: "2008",
    end: "2020",
    description:
      "Daniel Matriculation Higher Secondary School",
    achievements: [
    ],
  },
  {
    id: 2,
    institution: "HSC",
    degree: "Maths With Computer",
    start: "2020",
    end: "2022",
    description:
      "Daniel Matriculation Higher Secondary School",
    achievements: [
    ],
  },
  {
    id: 3,
    institution: "Bachelor Of Technology",
    degree: "Artificial Intelligence & Data Science",
    start: "2022",
    end: "2026",
    description:
      "Dhaanish Ahmed College Of Engineering, Anna University",
    achievements: [
    ],
  },
 
];

/* =========================================================
   EDUCATION AUTO-LAYOUT
   Positions each node automatically from its index and the
   total count, so the curve always fits however many
   education entries exist — no manual x/y needed.
   ========================================================= */

function layoutEduNodes(nodes) {
  const n = nodes.length;

  return nodes.map((node, i) => {
    const x =
      n > 1
        ? 8 + (84 * i) / (n - 1)
        : 50;

    const y =
      i % 2 === 0 ? 68 : 26;

    return { ...node, x, y };
  });
}

const NAV_LINKS = [
  "home",
  "projects",
  "education",
  "experience",
  "skills",
  "products",
  "contact",
];

/* =========================================================
   TYPEWRITER
   ========================================================= */

function useTypewriter(
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1400
) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (
      subIndex === words[index].length + 1 &&
      !deleting
    ) {
      const t = setTimeout(
        () => setDeleting(true),
        pause
      );

      return () => clearTimeout(t);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);

      setIndex(
        (prev) => (prev + 1) % words.length
      );

      return;
    }

    const t = setTimeout(
      () => {
        setSubIndex(
          (prev) =>
            prev + (deleting ? -1 : 1)
        );
      },
      deleting
        ? deletingSpeed
        : typingSpeed
    );

    return () => clearTimeout(t);
  }, [
    subIndex,
    deleting,
    index,
    words,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  useEffect(() => {
    const b = setInterval(
      () => setBlink((v) => !v),
      500
    );

    return () => clearInterval(b);
  }, []);

  return {
    text: words[index].substring(
      0,
      subIndex
    ),
    blink,
  };
}

/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

function useInView(threshold = 0.25) {
  const ref = useRef(null);

  const [inView, setInView] =
    useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const obs =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        },
        { threshold }
      );

    obs.observe(el);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* =========================================================
   EDUCATION PATH
   ========================================================= */

function pathFromNodes(nodes) {
  const pts = nodes.map((n) => ({
    x: n.x * 10,
    y: n.y * 3.2,
  }));

  if (pts.length < 2) return "";

  let d = `M ${pts[0].x},${pts[0].y} `;

  for (
    let i = 0;
    i < pts.length - 1;
    i++
  ) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;

    const cp1x =
      p1.x + (p2.x - p0.x) / 6;

    const cp1y =
      p1.y + (p2.y - p0.y) / 6;

    const cp2x =
      p2.x - (p3.x - p1.x) / 6;

    const cp2y =
      p2.y - (p3.y - p1.y) / 6;

    d +=
      `C ${cp1x},${cp1y} ` +
      `${cp2x},${cp2y} ` +
      `${p2.x},${p2.y} `;
  }

  return d;
}

/* =========================================================
   SKILLS DOCK
   ========================================================= */

function SkillsDock({ skills }) {
  const wrapRef = useRef(null);
  const tileRefs = useRef([]);

  const handleMouseMove = (e) => {
    const wrap = wrapRef.current;

    if (!wrap) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    tileRefs.current.forEach(
      (tile) => {
        if (!tile) return;

        const rect =
          tile.getBoundingClientRect();

        const cx =
          rect.left +
          rect.width / 2;

        const cy =
          rect.top +
          rect.height / 2;

        const dist = Math.hypot(
          mouseX - cx,
          mouseY - cy
        );

        const radius = 140;
        const maxScale = 1.6;
        const maxLift = -14;

        if (dist < radius) {
          const strength =
            1 - dist / radius;

          const scale =
            1 +
            strength *
              (maxScale - 1);

          const lift =
            strength * maxLift;

          tile.style.transform =
            `translateY(${lift}px) scale(${scale})`;

          tile.classList.add(
            "magnified"
          );
        } else {
          tile.style.transform =
            "translateY(0px) scale(1)";

          tile.classList.remove(
            "magnified"
          );
        }
      }
    );
  };

  const handleMouseLeave = () => {
    tileRefs.current.forEach(
      (tile) => {
        if (!tile) return;

        tile.style.transform =
          "translateY(0px) scale(1)";

        tile.classList.remove(
          "magnified"
        );
      }
    );
  };

  return (
    <div
      className="skills-wrap"
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {skills.map((s, i) => (
        <div
          key={s.name}
          className="skill-tile"
          ref={(el) =>
            (tileRefs.current[i] = el)
          }
        >
          <img
            src={s.icon}
            alt={s.name}
            loading="lazy"
          />

          <span className="skill-tile-label">
            {s.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */

export default function App() {
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 4000);

  return () => clearTimeout(timer);
}, []);
  const [theme, setTheme] =
    useState("dark");
  const [skills, setSkills] = useState([]);
const [skillsLoading, setSkillsLoading] = useState(true);
  useEffect(() => {
  const fetchSkills = async () => {
    try {
      const response = await fetch(
        "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/Skillsget"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
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
    } finally {
      setSkillsLoading(false);
    }
  };

  fetchSkills();
}, []);

  /* =======================================================
     PROJECTS (fetched from the live API)
     ======================================================= */

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError("");

        const response = await fetch(PROJECT_GET_API, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        let projectList = [];

        if (Array.isArray(data)) {
          projectList = data;
        } else if (Array.isArray(data.Projects)) {
          projectList = data.Projects;
        } else if (Array.isArray(data.List)) {
          projectList = data.List;
        } else if (Array.isArray(data.Data)) {
          projectList = data.Data;
        }

        const formattedProjects = projectList.map((item) => {
          const project =
            item.Projects || item.Project || item;

          const skillIds =
            project.SkillIds ||
            project.SkillIDs ||
            project.skillIds ||
            [];

          const description =
            project.Description ||
            project.description ||
            "";

          return {
            id:
              project.Id ||
              project.ID ||
              project.projectID,

            title:
              project.Name ||
              project.name ||
              "",

            image: project.ImageLink
              ? `data:image/png;base64,${project.ImageLink}`
              : "",

            description,
            longDescription: description,

            skillIds,

            github:
              project.GithubURL ||
              project.GithubLink ||
              project.githubURL ||
              project.githubLink ||
              "#",

            live:
              project.ProjectURL ||
              project.ProjectLink ||
              project.projectURL ||
              project.projectLink ||
              "#",
          };
        });

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Projects GET Error:", error);
        setProjectsError("Unable to load projects.");
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* Map a project's stored skill ids to skill names/icons
     using the skills already fetched above. */
  const getProjectTech = (skillIds) => {
    if (!Array.isArray(skillIds)) return [];

    return skills.filter((s) =>
      skillIds.includes(s.id)
    );
  };

  /* =======================================================
     EXPERIENCE (fetched from the live API)
     ======================================================= */

  const [experiences, setExperiences] = useState([]);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [experiencesError, setExperiencesError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setExperiencesLoading(true);
        setExperiencesError("");

        const response = await fetch(EXPERIENCE_GET_API, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log("Experience Response:", data);

        let experienceList = [];

        if (Array.isArray(data)) {
          experienceList = data;
        } else if (Array.isArray(data.Experience)) {
          experienceList = data.Experience;
        } else if (Array.isArray(data.Experiences)) {
          experienceList = data.Experiences;
        } else if (Array.isArray(data.List)) {
          experienceList = data.List;
        } else if (Array.isArray(data.Data)) {
          experienceList = data.Data;
        }

        const formattedExperiences = experienceList.map((item) => {
          const exp =
            item.Experience || item.Experiences || item;

          const isPresentRaw =
            exp.IsPresent !== undefined
              ? exp.IsPresent
              : exp.isPresent;

          const isPresent =
            isPresentRaw === true ||
            isPresentRaw === "true" ||
            isPresentRaw === 1;

          const startYear =
            exp.StartYear || exp.startYear || "";

          const endYear =
            exp.EndYear || exp.endYear || "";

          return {
            id:
              exp.Id ||
              exp.ID ||
              exp.Experienceid ||
              exp.experienceid ||
              exp.ExperienceId,

            company:
              exp.CompanyName ||
              exp.Compname ||
              exp.companyName ||
              exp.compname ||
              "",

            position:
              exp.JobTitle || exp.jobTitle || "",

            type:
              exp.JobRole || exp.jobRole || "",

            start: startYear,
            end: isPresent ? "Present" : endYear,
            current: isPresent,
          };
        });

        /* Most recent / current role first. */
        formattedExperiences.sort((a, b) => {
          if (a.current && !b.current) return -1;
          if (!a.current && b.current) return 1;

          return (
            (parseInt(b.start, 10) || 0) -
            (parseInt(a.start, 10) || 0)
          );
        });

        setExperiences(formattedExperiences);
      } catch (error) {
        console.error("Experience GET Error:", error);
        setExperiencesError("Unable to load experience.");
      } finally {
        setExperiencesLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [activeProject, setActiveProject] =
    useState(null);

  const [activeSection, setActiveSection] =
    useState("home");

  const [activeEduNode, setActiveEduNode] =
    useState(null);

  const [hoveredExperience, setHoveredExperience] =
    useState(null);

  const typed =
    useTypewriter(TYPE_WORDS);

  const [eduRef, eduInView] =
    useInView(0.2);

  const [
    experienceRef,
    experienceInView,
  ] = useInView(0.2);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setActiveProject(null);
        setActiveEduNode(null);
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKey
      );
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((id) =>
        document.getElementById(id)
      )
      .filter(Boolean);

    if (!sections.length) return;

    const obs =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setActiveSection(
                  entry.target.id
                );
              }
            }
          );
        },
        {
          rootMargin:
            "-40% 0px -50% 0px",
          threshold: 0,
        }
      );

    sections.forEach((s) =>
      obs.observe(s)
    );

    return () =>
      obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const isDark =
    theme === "dark";

  const eduLayout =
    layoutEduNodes(EDUCATION);

  const eduPath =
    pathFromNodes(eduLayout);

  const currentExperience =
    experiences.find(
      (e) => e.current
    );

  const previousExperience =
    experiences.filter(
      (e) => !e.current
    );

  return (
      <>
    {loading && (
      <div className="page-loader">
        <div className="loader-circle-wrap">
          <svg className="loader-ring-svg" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B5FE0" stopOpacity="0" />
                <stop offset="100%" stopColor="#3B5FE0" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle className="loader-ring-track" cx="60" cy="60" r="52" />
            <circle className="loader-ring-arc" cx="60" cy="60" r="52" />
          </svg>

          <div className="loader-orbit-dot"></div>
          <div className="loader-center-dot"></div>
        </div>
      </div>
    )}
    <div
      className={
        isDark
          ? "theme-dark"
          : "theme-light"
      }
      style={{
        fontFamily:
          "'Inter', sans-serif",
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
           NAV
           ================================================= */

        .nav {
          position: sticky;
          top: 0;
          z-index: 50;

          padding: 18px 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid transparent;

          transition: all .3s ease;

          backdrop-filter:
            blur(10px);
        }

        .nav.scrolled {
          background:
            color-mix(
              in srgb,
              var(--bg) 88%,
              transparent
            );

          border-bottom:
            1px solid var(--border);
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          gap: 28px;

          list-style: none;

          margin: 0;
          padding: 0;
        }

        .nav-links button {
          background: none;
          border: none;

          cursor: pointer;

          font-size: 14px;

          color: var(--text-muted);

          text-transform: capitalize;

          transition:
            color .2s ease;

          padding: 4px 0;

          position: relative;
        }

        .nav-links button:hover {
          color: var(--text);
        }

        .nav-links button.active {
          color: var(--text);
        }

        .nav-links button.active::after {
          content: '';

          position: absolute;

          left: 0;
          right: 0;

          bottom: -6px;

          height: 2px;

          background: var(--accent);

          border-radius: 2px;
        }

        .nav-right {
          display: flex;

          align-items: center;

          gap: 14px;
        }

        .theme-toggle {
          width: 44px;
          height: 24px;

          border-radius: 999px;

          border:
            1px solid var(--border);

          background:
            var(--surface);

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

          background:
            var(--accent);

          display: flex;

          align-items: center;
          justify-content: center;

          transition:
            transform .3s ease;

          font-size: 11px;
        }

        .theme-dark
        .theme-toggle-knob {
          transform:
            translateX(0);
        }

        .theme-light
        .theme-toggle-knob {
          transform:
            translateX(20px);
        }

        /* =================================================
           HAMBURGER
           ================================================= */

        .hamburger {
          display: none;

          flex-direction: column;

          justify-content: center;

          gap: 5px;

          width: 32px;
          height: 32px;

          background: none;
          border: none;

          cursor: pointer;

          z-index: 100;

          padding: 0;
        }

        .bar {
          width: 100%;
          height: 2px;

          background:
            var(--text);

          border-radius: 2px;

          transition:
            transform .3s ease,
            opacity .3s ease;
        }

        .hamburger.open
        .bar:nth-child(1) {
          transform:
            translateY(7px)
            rotate(45deg);
        }

        .hamburger.open
        .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open
        .bar:nth-child(3) {
          transform:
            translateY(-7px)
            rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;

          inset: 0;

          background:
            var(--bg);

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 26px;

          transform:
            translateX(100%);

          transition:
            transform .35s ease;

          z-index: 90;
        }

        .mobile-menu.open {
          transform:
            translateX(0);
        }

        .mobile-menu button {
          font-size: 26px;

          color: var(--text);

          cursor: pointer;

          background: none;

          border: none;

          text-transform:
            capitalize;
        }

        /* =================================================
           HERO
           ================================================= */

        .hero {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 60px;

          padding: 100px 60px;

          max-width: 1200px;

          margin: 0 auto;
        }

        .hero-circle-wrap {
          position: relative;

          flex-shrink: 0;

          width: 380px;
          height: 380px;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .hero-circle {
          width: 100%;
          height: 100%;

          border-radius: 50%;

          background:
            linear-gradient(
              155deg,
              var(--surface),
              var(--bg)
            );

          border:
            1px solid var(--border);

          box-shadow:
            0 30px 60px -20px
            rgba(0,0,0,.5);
        }

        .hero-text {
          flex: 1;
        }

        .hero-text h1 {
          font-size:
            clamp(
              34px,
              4.5vw,
              54px
            );

          font-weight: 700;

          line-height: 1.1;

          margin: 0 0 20px;
        }

        .hero-typed {
          color:
            var(--accent);
        }

        .cursor {
          color:
            var(--accent);
        }

        .hero-text p {
          color:
            var(--text-muted);

          font-size: 16px;

          line-height: 1.7;

          max-width: 460px;

          margin-bottom: 28px;
        }

        /* =================================================
           GENERAL SECTIONS
           ================================================= */

        section {
          padding: 80px 60px;

          max-width: 1200px;

          margin: 0 auto;

          border-top:
            1px solid var(--border);
        }

        .section-head {
          margin-bottom: 40px;
        }

        .section-head h2 {
          font-size:
            clamp(
              26px,
              3vw,
              36px
            );

          margin:
            0 0 10px;
        }

        .section-head p {
          color:
            var(--text-muted);

          margin: 0;
        }

        /* =================================================
           PROJECTS
           ================================================= */

        .project-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 20px;
        }

        .project-status {
          padding: 40px 20px;

          text-align: center;

          color: var(--text-muted);

          border: 1px dashed var(--border);

          border-radius: 16px;
        }

        .project-card {
          background:
            var(--surface);

          border:
            1px solid var(--border);

          border-radius: 16px;

          overflow: hidden;

          cursor: pointer;

          transition:
            transform .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;

          text-align: left;

          padding: 0;
        }

        .project-card:hover {
          transform:
            translateY(-4px);

          border-color:
            var(--accent);

          box-shadow:
            0 20px 40px -24px
            rgba(0,0,0,.4);
        }

        .project-card-img {
          width: 100%;

          height: 170px;

          object-fit: cover;

          display: block;

          background: var(--surface-2);

          transition:
            transform .35s ease;
        }

        .project-card:hover
        .project-card-img {
          transform:
            scale(1.04);
        }

        .project-card-body {
          padding:
            22px 26px 26px;
        }

        .project-card h3 {
          font-size: 20px;

          margin:
            0 0 10px;
        }

        .project-card p {
          color:
            var(--text-muted);

          font-size: 14.5px;

          line-height: 1.6;

          margin:
            0 0 16px;
        }

        .project-tech {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;
        }

        .tag {
          font-size: 12px;

          padding:
            5px 10px;

          border-radius: 8px;

          background:
            var(--surface-2);

          border:
            1px solid var(--border);

          color:
            var(--text-muted);
        }

        /* =================================================
           MODAL
           ================================================= */

        .modal-backdrop {
          position: fixed;

          inset: 0;

          z-index: 100;

          background:
            rgba(0,0,0,.55);

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 24px;

          animation:
            fadeIn .2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .modal-card {
          background:
            var(--surface);

          border:
            1px solid var(--border);

          border-radius: 20px;

          max-width: 580px;

          width: 100%;

          max-height: 88vh;

          overflow-y: auto;

          position: relative;

          animation:
            popIn .25s ease;
        }

        @keyframes popIn {
          from {
            opacity: 0;

            transform:
              scale(.94)
              translateY(10px);
          }

          to {
            opacity: 1;

            transform:
              scale(1)
              translateY(0);
          }
        }

        .modal-img {
          width: 100%;

          height: 240px;

          object-fit: cover;

          display: block;
        }

        .modal-body {
          padding:
            34px 40px 40px;
        }

        .modal-close {
          position: absolute;

          top: 16px;
          right: 16px;

          width: 34px;
          height: 34px;

          border-radius: 50%;

          background:
            rgba(0,0,0,.5);

          border:
            1px solid
            rgba(255,255,255,.2);

          color: #fff;

          cursor: pointer;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .modal-card h3 {
          font-size: 28px;

          margin:
            0 0 14px;
        }

        .modal-card p.long {
          color:
            var(--text-muted);

          font-size: 15px;

          line-height: 1.8;

          margin:
            0 0 20px;
        }

        .modal-tech {
          display: flex;

          flex-wrap: wrap;

          gap: 8px;

          margin-bottom: 26px;
        }

        .modal-links {
          display: flex;

          gap: 14px;
        }

        .modal-links a {
          padding:
            10px 18px;

          border-radius: 10px;

          font-size: 14px;

          font-weight: 600;

          text-decoration: none;
        }

        .modal-links a.primary {
          background:
            var(--accent);

          color: white;
        }

        .modal-links a.ghost {
          border:
            1px solid var(--border);

          color:
            var(--text);
        }

        /* =================================================
           EDUCATION
           ================================================= */

        .edu-map-wrap {
          position: relative;

          height: 340px;
        }

        .edu-map-svg {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;
        }

        .edu-path {
          fill: none;

          stroke:
            var(--border);

          stroke-width: 2;

          stroke-dasharray:
            4 7;

          stroke-linecap: round;
        }

        .edu-path-draw {
          fill: none;

          stroke:
            var(--accent);

          stroke-width: 2;

          stroke-dasharray: 1000;

          stroke-dashoffset: 1000;

          stroke-linecap: round;

          transition:
            stroke-dashoffset
            1.8s ease;
        }

        .edu-path-draw.in-view {
          stroke-dashoffset: 0;
        }

        .edu-node {
          position: absolute;

          transform:
            translate(-50%, -50%);

          width: 18px;
          height: 18px;

          border-radius: 50%;

          background:
            var(--surface);

          border:
            2px solid
            var(--border);

          cursor: pointer;

          opacity: 0;

          transition:
            opacity .4s ease,
            transform .2s ease,
            border-color .2s ease;
        }

        .edu-node.in-view {
          opacity: 1;
        }

        .edu-node:hover,
        .edu-node.active {
          border-color:
            var(--accent);

          transform:
            translate(-50%, -50%)
            scale(1.3);
        }

        .edu-node.current {
          border-color:
            var(--warm);

          background:
            var(--warm);
        }

        .edu-node.current::after {
          content: '';

          position: absolute;

          inset: -6px;

          border-radius: 50%;

          border:
            1.5px solid
            var(--warm);

          animation:
            pulse 2.2s
            ease-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(.8);
            opacity: .8;
          }

          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .edu-node-label {
          position: absolute;

          transform:
            translate(-50%, 16px);

          white-space: nowrap;

          font-size: 12px;

          color:
            var(--text-muted);

          opacity: 0;

          transition:
            opacity .4s ease .2s;

          pointer-events: none;

          text-align: center;
        }

        .edu-node-label.in-view {
          opacity: 1;
        }

        .edu-card {
          position: absolute;

          width: 280px;

          background:
            var(--surface);

          border:
            1px solid var(--border);

          border-radius: 14px;

          padding: 18px;

          z-index: 20;

          box-shadow:
            0 24px 50px -20px
            rgba(0,0,0,.5);

          animation:
            popIn .18s ease;
        }

        .edu-card-badge {
          display: inline-block;

          font-size: 10px;

          letter-spacing: .06em;

          color:
            var(--warm);

          border:
            1px solid var(--warm);

          border-radius: 999px;

          padding:
            2px 8px;

          margin-bottom: 10px;
        }

        .edu-card h4 {
          font-size: 17px;

          margin:
            0 0 2px;
        }

        .edu-card .degree {
          font-size: 13px;

          color:
            var(--accent);

          font-weight: 600;
        }

        .edu-card .years {
          font-size: 12px;

          color:
            var(--text-muted);

          margin-bottom: 12px;
        }

        .edu-card p.desc {
          font-size: 13px;

          line-height: 1.6;

          color:
            var(--text-muted);

          margin:
            0 0 12px;
        }

        .edu-card ul {
          list-style: none;

          padding: 0;

          margin: 0;
        }

        .edu-card ul li {
          font-size: 12.5px;

          color:
            var(--text-muted);

          padding-left: 14px;

          position: relative;

          margin-bottom: 5px;
        }

        .edu-card ul li::before {
          content: '—';

          position: absolute;

          left: 0;

          color:
            var(--accent);
        }

        .edu-map-mobile {
          display: none;
        }

        .edu-mobile-item {
          display: flex;

          gap: 16px;

          margin-bottom: 24px;
        }

        .edu-mobile-rail {
          display: flex;

          flex-direction: column;

          align-items: center;

          flex-shrink: 0;
        }

        .edu-mobile-dot {
          width: 14px;
          height: 14px;

          border-radius: 50%;

          background: var(--surface);

          border: 2px solid var(--border);

          flex-shrink: 0;
        }

        .edu-mobile-dot.current {
          background: var(--warm);
          border-color: var(--warm);
        }

        .edu-mobile-line {
          flex: 1;

          width: 2px;

          background: var(--border);

          margin: 6px 0;
        }

        .edu-mobile-btn {
          width: 100%;

          text-align: left;

          background: var(--surface);

          border: 1px solid var(--border);

          border-radius: 12px;

          padding: 14px 16px;

          cursor: pointer;
        }

        .edu-mobile-btn h4 {
          margin: 0 0 2px;

          font-size: 15px;

          color: var(--text);
        }

        .edu-mobile-btn .degree {
          font-size: 13px;

          color: var(--accent);

          font-weight: 600;
        }

        .edu-mobile-btn .years {
          font-size: 12px;

          color: var(--text-muted);
        }

        .edu-mobile-card {
          margin-top: 8px;

          padding: 14px 16px;

          background: var(--surface-2);

          border: 1px solid var(--border);

          border-radius: 12px;
        }

        /* =================================================
           EXPERIENCE
           ================================================= */

        .experience-current {
          margin-bottom: 70px;
        }

        .experience-current-label {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 16px;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: .08em;

          text-transform: uppercase;

          color:
            var(--warm);
        }

        .experience-current-label::before {
          content: '';

          width: 8px;
          height: 8px;

          border-radius: 50%;

          background:
            var(--warm);

          box-shadow:
            0 0 0 5px
            color-mix(
              in srgb,
              var(--warm) 15%,
              transparent
            );
        }

        .exp-card {
          display: grid;

          grid-template-columns:
            340px 1fr;

          gap: 44px;

          background:
            var(--surface);

          border:
            1px solid var(--border);

          border-radius: 20px;

          padding: 32px;

          align-items: center;

          transition:
            border-color .3s ease,
            box-shadow .3s ease,
            transform .3s ease;
        }

        .exp-card:hover {
          border-color:
            color-mix(
              in srgb,
              var(--accent) 55%,
              var(--border)
            );

          box-shadow:
            0 30px 60px -35px
            rgba(0,0,0,.55);
        }

        .exp-photo-wrap {
          position: relative;
        }

        .exp-photo {
          width: 100%;

          aspect-ratio: 4/5;

          object-fit: cover;

          border-radius: 14px;

          border:
            1px solid var(--border);

          display: block;
        }

        .exp-photo-placeholder {
          display: flex;

          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              155deg,
              var(--surface-2),
              var(--bg)
            );

          color:
            var(--text-muted);

          font-size: 48px;

          font-weight: 700;

          text-transform: uppercase;
        }

        .experience-status {
          padding: 40px 20px;

          text-align: center;

          color: var(--text-muted);

          border: 1px dashed var(--border);

          border-radius: 16px;
        }

        .exp-badge {
          position: absolute;

          top: 14px;
          left: 14px;

          display: inline-flex;

          align-items: center;

          gap: 6px;

          background:
            var(--warm);

          color: #fff;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: .05em;

          padding:
            5px 10px;

          border-radius: 999px;
        }

        .exp-badge::before {
          content: '';

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #fff;
        }

        .exp-details h3 {
          font-size: 26px;

          margin:
            0 0 4px;
        }

        .exp-details .role {
          font-size: 15px;

          color:
            var(--accent);

          font-weight: 600;

          margin-bottom: 4px;
        }

        .exp-details .meta {
          font-size: 13px;

          color:
            var(--text-muted);

          margin-bottom: 18px;
        }

        .exp-details p.desc {
          font-size: 14.5px;

          line-height: 1.75;

          color:
            var(--text-muted);

          margin:
            0 0 20px;
        }

        .exp-tech {
          display: flex;

          flex-wrap: wrap;

          gap: 8px;

          margin-bottom: 22px;
        }

        .exp-details ul {
          list-style: none;

          padding: 0;

          margin: 0;
        }

        .exp-details ul li {
          font-size: 14px;

          color:
            var(--text-muted);

          padding-left: 16px;

          position: relative;

          margin-bottom: 8px;
        }

        .exp-details ul li::before {
          content: '—';

          position: absolute;

          left: 0;

          color:
            var(--accent);
        }

        /* -------------------------------------------------
           CAREER TIMELINE
           ------------------------------------------------- */

        .career-timeline {
          position: relative;

          margin-top: 30px;

          padding:
            15px 0 15px;
        }

        .career-timeline-title {
          margin-bottom: 35px;

          font-size: 14px;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: .12em;

          color:
            var(--text-muted);
        }

        .career-timeline-content {
          position: relative;

          display: grid;

          grid-template-columns:
            90px 1fr;

          column-gap: 35px;
        }

        /* Vertical line */

        .career-line {
          position: absolute;

          left: 34px;

          top: 20px;

          bottom: 20px;

          width: 2px;

          background:
            var(--border);

          overflow: hidden;

          border-radius: 10px;
        }

        .career-line-progress {
          position: absolute;

          left: 0;

          top: 0;

          width: 100%;

          height: 100%;

          background:
            linear-gradient(
              to bottom,
              var(--warm),
              var(--accent)
            );

          transform-origin:
            top center;

          transform:
            scaleY(0);

          transition:
            transform
            1.8s
            cubic-bezier(
              .22,
              1,
              .36,
              1
            );
        }

        .career-line-progress.in-view {
          transform:
            scaleY(1);
        }

        .career-nodes {
          position: relative;

          display: flex;

          flex-direction: column;

          gap: 36px;

          z-index: 2;
        }

        .career-node {
          width: 70px;

          min-height: 110px;

          display: flex;

          align-items: flex-start;

          justify-content: center;

          position: relative;
        }

        .career-dot {
          width: 18px;
          height: 18px;

          border-radius: 50%;

          background:
            var(--bg);

          border:
            2px solid
            var(--border);

          position: relative;

          margin-top: 5px;

          transition:
            all .3s ease;
        }

        .career-dot.current {
          background:
            var(--warm);

          border-color:
            var(--warm);

          box-shadow:
            0 0 0 6px
            color-mix(
              in srgb,
              var(--warm) 12%,
              transparent
            );
        }

        .career-dot.current::after {
          content: '';

          position: absolute;

          inset: -5px;

          border-radius: 50%;

          border:
            1px solid
            var(--warm);

          animation:
            careerPulse
            2s
            ease-out
            infinite;
        }

        @keyframes careerPulse {
          0% {
            transform: scale(.8);

            opacity: .8;
          }

          100% {
            transform: scale(1.9);

            opacity: 0;
          }
        }

        .career-dot.completed {
          border-color:
            var(--accent);

          background:
            var(--surface);
        }

        .career-node.active
        .career-dot.completed {
          background:
            var(--accent);

          box-shadow:
            0 0 0 6px
            color-mix(
              in srgb,
              var(--accent) 12%,
              transparent
            );
        }

        .career-node-year {
    position: absolute;
    top: 31px;

    /* Move year to the LEFT of the timeline */
    right: calc(50% + 25px);

    /* Prevent it from being centered on the line */
    left: auto;
    transform: none;

    font-size: 10px;
    white-space: nowrap;
    text-align: right;

    color: var(--text-muted);
    opacity: .8;
}

        /* Previous cards */

        .career-cards {
          display: flex;

          flex-direction: column;

          gap: 36px;
        }

        .previous-company-card {
          min-height: 110px;

          background:
            var(--surface);

          border:
            1px solid var(--border);

          border-radius: 16px;

          padding:
            22px 24px;

          position: relative;

          cursor: default;

          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease,
            background .3s ease;

          opacity: 0;

          transform:
            translateX(30px);
        }

        .previous-company-card.in-view {
          opacity: 1;

          transform:
            translateX(0);
        }

        .previous-company-card:hover,
        .previous-company-card.active {
          transform:
            translateX(6px);

          border-color:
            var(--accent);

          background:
            color-mix(
              in srgb,
              var(--surface) 94%,
              var(--accent)
            );

          box-shadow:
            0 18px 40px -28px
            var(--accent);
        }

        .previous-company-card.in-view:hover,
        .previous-company-card.in-view.active {
          transform:
            translateX(6px);
        }

        .previous-company-top {
          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 5px;
        }

        .previous-company-name {
          font-size: 18px;

          font-weight: 700;

          color:
            var(--text);

          margin: 0;
        }

        .previous-company-years {
          flex-shrink: 0;

          font-size: 11px;

          padding:
            4px 8px;

          border-radius: 999px;

          background:
            var(--surface-2);

          border:
            1px solid var(--border);

          color:
            var(--text-muted);
        }

        .previous-company-role {
          color:
            var(--accent);

          font-size: 13px;

          font-weight: 600;

          margin-bottom: 10px;
        }

        .previous-company-description {
          color:
            var(--text-muted);

          font-size: 13px;

          line-height: 1.6;

          margin:
            0 0 13px;

          max-width: 700px;
        }

        .previous-company-tech {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;
        }

        .previous-company-tech
        .tag {
          font-size: 10px;

          padding:
            4px 8px;
        }

        .previous-company-achievements {
          display: none;
        }

        /* =================================================
           SKILLS
           ================================================= */

        .skills-wrap {
          display: flex;

          flex-wrap: wrap;

          justify-content: center;

          align-items: flex-end;

          gap: 22px;

          padding:
            40px 0 20px;

          min-height: 200px;
        }

        .skill-tile {
          width: 74px;
          height: 74px;

          border-radius: 20px;

          background:
            var(--surface);

          border:
            1px solid var(--border);

          display: flex;

          align-items: center;
          justify-content: center;

          position: relative;

          cursor: pointer;

          transition:
            transform .18s
              cubic-bezier(
                .34,
                1.56,
                .64,
                1
              ),
            box-shadow .18s ease,
            border-color .18s ease;

          will-change:
            transform;
        }

        .skill-tile img {
          width: 38px;
          height: 38px;

          object-fit: contain;
        }

        .skill-tile:hover,
        .skill-tile.magnified {
          border-color:
            var(--accent);

          box-shadow:
            0 18px 34px -14px
            rgba(59,95,224,.45);
        }

        .skill-tile-label {
          position: absolute;

          bottom: -26px;

          left: 50%;

          transform:
            translateX(-50%);

          font-size: 11px;

          color:
            var(--text-muted);

          white-space: nowrap;

          opacity: 0;

          transition:
            opacity .15s ease;

          pointer-events: none;
        }

        .skill-tile:hover
        .skill-tile-label {
          opacity: 1;
        }

        /* =================================================
           FOOTER
           ================================================= */

        .footer {
          max-width: 1200px;

          margin: 0 auto;

          padding:
            80px 60px 30px;

          border-top:
            1px solid var(--border);
        }

        .footer-main {
          display: grid;

          grid-template-columns:
            1.5fr 1fr 1fr;

          gap: 60px;

          padding-bottom: 55px;
        }

        .footer-brand h2 {
          font-size: 30px;

          margin:
            0 0 14px;
        }

        .footer-brand p {
          color:
            var(--text-muted);

          max-width: 380px;

          line-height: 1.7;

          font-size: 14px;

          margin-bottom: 25px;
        }

        .footer-title {
          font-size: 13px;

          text-transform: uppercase;

          letter-spacing: .08em;

          color:
            var(--text-muted);

          margin-bottom: 18px;
        }

        .footer-links {
          display: flex;

          flex-direction: column;

          gap: 12px;
        }

        .footer-links a {
          color:
            var(--text);

          text-decoration: none;

          font-size: 14px;

          transition:
            color .2s ease,
            transform .2s ease;

          width: fit-content;
        }

        .footer-links a:hover {
          color:
            var(--accent);

          transform:
            translateX(4px);
        }

        .footer-socials {
          display: flex;

          gap: 10px;

          flex-wrap: wrap;
        }

        .footer-social {
          width: 42px;
          height: 42px;

          border-radius: 12px;

          border:
            1px solid var(--border);

          background:
            var(--surface);

          display: flex;

          align-items: center;
          justify-content: center;

          text-decoration: none;

          color:
            var(--text);

          font-size: 14px;

          font-weight: 700;

          transition:
            all .25s ease;
        }

        .footer-social:hover {
          border-color:
            var(--accent);

          color:
            var(--accent);

          transform:
            translateY(-4px);

          box-shadow:
            0 12px 25px -15px
            var(--accent);
        }

        .footer-bottom {
          border-top:
            1px solid var(--border);

          padding-top: 22px;

          display: flex;

          justify-content:
            space-between;

          align-items: center;

          gap: 20px;

          color:
            var(--text-muted);

          font-size: 12px;
        }

        .footer-bottom a {
          color:
            var(--text-muted);

          text-decoration: none;
        }

        .footer-bottom a:hover {
          color:
            var(--accent);
        }

        /* =================================================
           RESPONSIVE
           ================================================= */

        @media (max-width: 900px) {

          .hero {
            flex-direction:
              column-reverse;

            text-align: center;

            padding:
              60px 24px;
          }

          .hero-circle-wrap {
            width: 240px;
            height: 240px;
          }

          .hero-text p {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 850px) {

          .exp-card {
            grid-template-columns:
              1fr;

            gap: 28px;
          }

          .exp-photo {
            aspect-ratio:
              16 / 9;
          }

          .career-timeline-content {
            grid-template-columns:
              70px 1fr;

            column-gap: 25px;
          }

          .career-line {
            left: 26px;
          }

          .career-node {
            width: 55px;
          }
        }

        @media (max-width: 800px) {

          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .edu-map-wrap {
            display: none;
          }

          .edu-map-mobile {
            display: block;
          }

          .footer-main {
            grid-template-columns:
              1fr;

            gap: 40px;
          }
        }

        @media (max-width: 700px) {

          section {
            padding:
              60px 24px;
          }

          .project-grid {
            grid-template-columns:
              1fr;
          }

          .career-timeline {
            margin-top: 15px;
          }

          .career-timeline-content {
            grid-template-columns:
              42px 1fr;

            column-gap: 18px;
          }

          .career-line {
            left: 18px;

            top: 15px;

            bottom: 15px;
          }

          .career-nodes {
            gap: 22px;
          }

          .career-node {
            width: 38px;

            min-height: 140px;
          }

          .career-dot {
            width: 15px;
            height: 15px;

            margin-top: 7px;
          }

          .career-node-year {
            top: 30px;

            font-size: 9px;

            transform:
              translateX(-50%)
              rotate(-90deg);

            display: none;
          }

          .career-cards {
            gap: 22px;
          }

          .previous-company-card {
            min-height: 140px;

            padding:
              18px 18px;
          }

          .previous-company-card:hover,
          .previous-company-card.active {
            transform:
              translateX(3px);
          }

          .previous-company-card.in-view:hover,
          .previous-company-card.in-view.active {
            transform:
              translateX(3px);
          }

          .previous-company-top {
            flex-direction:
              column;

            gap: 8px;
          }

          .previous-company-years {
            align-self:
              flex-start;
          }

          .footer {
            padding:
              60px 24px 25px;
          }

          .footer-bottom {
            flex-direction:
              column;

            align-items:
              flex-start;
          }
        }

        @media (max-width: 500px) {

          .hero-circle-wrap {
            width: 200px;
            height: 200px;
          }

          .hero {
            padding-top: 45px;
          }

          .modal-body {
            padding:
              28px 22px 30px;
          }

          .modal-links {
            flex-direction:
              column;
          }

          .modal-links a {
            text-align:
              center;
          }

          .footer-brand h2 {
            font-size: 26px;
          }

          .career-timeline-content {
            grid-template-columns:
              30px 1fr;

            column-gap: 14px;
          }

          .career-line {
            left: 14px;
          }

          .career-node {
            width: 30px;
          }

          .career-dot {
            width: 13px;
            height: 13px;
          }
        }

        /* =========================================================
           INITIAL PAGE LOADER
           ========================================================= */

        .page-loader {
          position: fixed;
          inset: 0;

          z-index: 999999;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle at 50% 40%,
              #10131b,
              #050505
            );

          color: #ffffff;

          animation: loaderFadeOut 0.6s ease 3.4s forwards;
        }

        .loader-circle-wrap {
          position: relative;

          width: 130px;
          height: 130px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-ring-svg {
          width: 100%;
          height: 100%;

          animation: loaderSpin 1.4s linear infinite;

          filter: drop-shadow(0 0 16px rgba(59,95,224,.55));
        }

        .loader-ring-track {
          fill: none;

          stroke: rgba(255,255,255,.08);

          stroke-width: 3;
        }

        .loader-ring-arc {
          fill: none;

          stroke: url(#loaderGradient);

          stroke-width: 3;

          stroke-linecap: round;

          stroke-dasharray: 105 240;

          transform-origin: 60px 60px;
        }

        .loader-center-dot {
          position: absolute;

          width: 14px;
          height: 14px;

          border-radius: 50%;

          background: linear-gradient(135deg, #3B5FE0, #C1793F);

          animation: loaderPulseDot 1.4s ease-in-out infinite;
        }

        .loader-orbit-dot {
          position: absolute;

          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: #C1793F;

          box-shadow: 0 0 10px 2px rgba(193,121,63,.7);

          top: 50%;
          left: 50%;

          transform-origin: -1px 65px;

          animation: loaderOrbit 2.1s linear infinite reverse;
        }

        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes loaderPulseDot {
          0%, 100% {
            transform: scale(.7);
            opacity: .6;
          }

          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes loaderOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Remove loader */

        @keyframes loaderFadeOut {
          from {
            opacity: 1;
            visibility: visible;
          }

          to {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
        }

      `}</style>


      {/* =================================================
          NAVIGATION
          ================================================= */}

      <nav
        className={`nav ${
          scrolled
            ? "scrolled"
            : ""
        }`}
      >

        <div className="logo">
          Mohammed Sadiq K
        </div>


        <ul className="nav-links">

          {NAV_LINKS.map(
            (id) => (

              <li key={id}>

                <button
                  className={
                    activeSection === id
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    scrollTo(id)
                  }
                >
                  {id}
                </button>

              </li>

            )
          )}

        </ul>


        <div className="nav-right">

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(
                isDark
                  ? "light"
                  : "dark"
              )
            }
            aria-label=
              "Toggle day and night mode"
          >

            <span className=
              "theme-toggle-knob"
            >
              {isDark
                ? "🌙"
                : "☀️"}
            </span>

          </button>


          <button
            className={`hamburger ${
              menuOpen
                ? "open"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            aria-label=
              "Toggle menu"
          >

            <span className="bar" />
            <span className="bar" />
            <span className="bar" />

          </button>

        </div>

      </nav>


      {/* =================================================
          MOBILE MENU
          ================================================= */}

      <div
        className={`mobile-menu ${
          menuOpen
            ? "open"
            : ""
        }`}
      >

        {NAV_LINKS.map(
          (id) => (

            <button
              key={id}
              onClick={() =>
                scrollTo(id)
              }
            >
              {id}
            </button>

          )
        )}

      </div>


      {/* =================================================
          HERO
          ================================================= */}

      <header
        id="home"
        className="hero"
        style={{
          borderTop:
            "none",
        }}
      >

        <div
          className=
            "hero-circle-wrap"
        >

          <div
            className=
              "hero-circle"
          />

        </div>


        <div
          className=
            "hero-text"
        >

          <h1>

            I am a
            <br />

            <span
              className=
                "hero-typed"
            >
              {typed.text}
            </span>

            <span
              className="cursor"
              style={{
                opacity:
                  typed.blink
                    ? 1
                    : 0,
              }}
            >
              |
            </span>

          </h1>


          <p>
            I build software and
            the systems around it —
            from interface to
            infrastructure. Ten years
            designing and shipping
            products that stay legible
            as they grow.
          </p>

        </div>

      </header>


      {/* =================================================
          PROJECTS
          ================================================= */}

      <section id="projects">

        <div className=
          "section-head"
        >

          <h2>
            Selected Projects
          </h2>

          <p>
            Click a card to see
            the full details.
          </p>

        </div>


        {projectsLoading ? (

          <div className="project-status">
            Loading projects...
          </div>

        ) : projectsError ? (

          <div className="project-status">
            {projectsError}
          </div>

        ) : projects.length === 0 ? (

          <div className="project-status">
            No projects yet.
          </div>

        ) : (

          <div
            className=
              "project-grid"
          >

            {projects.map(
              (p) => (

                <button
                  className=
                    "project-card"
                  key={p.id}
                  onClick={() =>
                    setActiveProject(p)
                  }
                >

                  <img
                    className=
                      "project-card-img"
                    src={p.image}
                    alt={p.title}
                  />


                  <div
                    className=
                      "project-card-body"
                  >

                    <h3>
                      {p.title}
                    </h3>

                    <p>
                      {p.description}
                    </p>


                    <div
                      className=
                        "project-tech"
                    >

                      {getProjectTech(p.skillIds).map(
                        (t) => (

                          <span
                            key={t.id}
                            className=
                              "tag"
                          >
                            {t.name}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                </button>

              )
            )}

          </div>

        )}

      </section>


      {/* =================================================
          EDUCATION
          ================================================= */}

      <section
        id="education"
        ref={eduRef}
      >

        <div
          className=
            "section-head"
        >

          <h2>
            Education
          </h2>

          <p>
            Hover a point on desktop,
            or tap it on mobile,
            for the full story.
          </p>

        </div>


        <div
          className=
            "edu-map-wrap"
        >

          <svg
            className=
              "edu-map-svg"
            viewBox=
              "0 0 1000 320"
            preserveAspectRatio=
              "none"
          >

            <path
              className=
                "edu-path"
              d={eduPath}
            />

            <path
              className={`
                edu-path-draw
                ${
                  eduInView
                    ? "in-view"
                    : ""
                }
              `}
              d={eduPath}
            />

          </svg>


          {eduLayout.map(
            (n, i) => {

              const isCurrent =
                n.end ===
                "Present";

              return (
                <React.Fragment
                  key={n.id}
                >

                  <button
                    className={`
                      edu-node
                      ${
                        isCurrent
                          ? "current"
                          : ""
                      }
                      ${
                        activeEduNode ===
                        n.id
                          ? "active"
                          : ""
                      }
                      ${
                        eduInView
                          ? "in-view"
                          : ""
                      }
                    `}
                    style={{
                      left:
                        `${n.x}%`,
                      top:
                        `${n.y}%`,
                      transitionDelay:
                        `${
                          .3 +
                          i *
                            .25
                        }s`,
                    }}
                    onMouseEnter={() =>
                      setActiveEduNode(
                        n.id
                      )
                    }
                    onMouseLeave={() =>
                      setActiveEduNode(
                        null
                      )
                    }
                    onFocus={() =>
                      setActiveEduNode(
                        n.id
                      )
                    }
                    onBlur={() =>
                      setActiveEduNode(
                        null
                      )
                    }
                  />


                  <div
                    className={`
                      edu-node-label
                      ${
                        eduInView
                          ? "in-view"
                          : ""
                      }
                    `}
                    style={{
                      left:
                        `${n.x}%`,
                      top:
                        `${n.y}%`,
                    }}
                  >
                    {n.institution}
                  </div>


                  {activeEduNode ===
                    n.id && (

                    <div
                      className=
                        "edu-card"
                      style={{
                        left:
                          `${n.x}%`,
                        top:
                          `${
                            n.y > 50
                              ? n.y -
                                8
                              : n.y +
                                8
                          }%`,
                        transform:
                          `translate(
                            ${
                              n.x >
                              65
                                ? "-100%"
                                : n.x <
                                  15
                                ? "0%"
                                : "-50%"
                            },
                            ${
                              n.y >
                              50
                                ? "-100%"
                                : "0%"
                            }
                          )`,
                      }}
                      onMouseEnter={() =>
                        setActiveEduNode(
                          n.id
                        )
                      }
                      onMouseLeave={() =>
                        setActiveEduNode(
                          null
                        )
                      }
                    >

                      {isCurrent && (
                        <span
                          className=
                            "edu-card-badge"
                        >
                          CURRENT
                        </span>
                      )}

                      <h4>
                        {n.institution}
                      </h4>

                      <div
                        className=
                          "degree"
                      >
                        {n.degree}
                      </div>

                      <div
                        className=
                          "years"
                      >
                        {n.start}—
                        {n.end}
                      </div>

                      <p
                        className=
                          "desc"
                      >
                        {n.description}
                      </p>

                      <ul>

                        {n.achievements.map(
                          (a, i2) => (
                            <li
                              key={i2}
                            >
                              {a}
                            </li>
                          )
                        )}

                      </ul>

                    </div>
                  )}

                </React.Fragment>
              );
            }
          )}

        </div>


        {/* MOBILE EDUCATION */}

        <div
          className=
            "edu-map-mobile"
        >

          {EDUCATION.map(
            (n, i) => {

              const isCurrent =
                n.end ===
                "Present";

              return (
                <div
                  className=
                    "edu-mobile-item"
                  key={n.id}
                >

                  <div
                    className=
                      "edu-mobile-rail"
                  >

                    <div
                      className={`
                        edu-mobile-dot
                        ${
                          isCurrent
                            ? "current"
                            : ""
                        }
                      `}
                    />

                    {i <
                      EDUCATION.length -
                        1 && (
                      <div
                        className=
                          "edu-mobile-line"
                      />
                    )}

                  </div>


                  <div
                    style={{
                      flex: 1,
                    }}
                  >

                    <button
                      className=
                        "edu-mobile-btn"
                      onClick={() =>
                        setActiveEduNode(
                          activeEduNode ===
                            n.id
                            ? null
                            : n.id
                        )
                      }
                    >

                      <h4>
                        {n.institution}
                      </h4>

                      <div
                        className=
                          "degree"
                      >
                        {n.degree}
                      </div>

                      <div
                        className=
                          "years"
                      >
                        {n.start}—
                        {n.end}
                      </div>

                    </button>


                    {activeEduNode ===
                      n.id && (

                      <div
                        className=
                          "edu-mobile-card"
                      >

                        <p
                          className=
                            "desc"
                        >
                          {n.description}
                        </p>

                        <ul>

                          {n.achievements.map(
                            (a, i2) => (
                              <li
                                key={i2}
                              >
                                {a}
                              </li>
                            )
                          )}

                        </ul>

                      </div>
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>


      {/* =================================================
          EXPERIENCE
          ================================================= */}

      <section
        id="experience"
        ref={experienceRef}
      >

        <div
          className=
            "section-head"
        >

          <h2>
            Experience
          </h2>

          <p>
            My professional journey,
            from where I started to
            where I am today.
          </p>

        </div>


        {experiencesLoading ? (

          <div className="experience-status">
            Loading experience...
          </div>

        ) : experiencesError ? (

          <div className="experience-status">
            {experiencesError}
          </div>

        ) : experiences.length === 0 ? (

          <div className="experience-status">
            No experience yet.
          </div>

        ) : (

          <>

        {/* CURRENT COMPANY */}

        {currentExperience && (

          <div
            className=
              "experience-current"
          >

            <div
              className=
                "experience-current-label"
            >
              Currently working at
            </div>


            <div
              className=
                "exp-card"
            >

              <div
                className=
                  "exp-photo-wrap"
              >

                <div
                  className=
                    "exp-photo exp-photo-placeholder"
                >
                  {
                    currentExperience.company?.[0] ||
                    "?"
                  }
                </div>


                <span
                  className=
                    "exp-badge"
                >
                  CURRENT
                </span>

              </div>


              <div
                className=
                  "exp-details"
              >

                <h3>
                  {
                    currentExperience.company
                  }
                </h3>

                <div
                  className=
                    "role"
                >
                  {
                    currentExperience.position
                  }
                </div>

                <div
                  className=
                    "meta"
                >
                  {
                    currentExperience.type
                  }
                  {" · "}
                  {
                    currentExperience.start
                  }
                  —
                  {
                    currentExperience.end
                  }
                </div>

              </div>

            </div>

          </div>
        )}


        {/* CAREER TIMELINE */}

        <div
          className=
            "career-timeline"
        >

          <div
            className=
              "career-timeline-title"
          >
            Career Journey
          </div>


          <div
            className=
              "career-timeline-content"
          >

            {/* TIMELINE LINE */}

            <div
              className=
                "career-line"
            >

              <div
                className={`
                  career-line-progress
                  ${
                    experienceInView
                      ? "in-view"
                      : ""
                  }
                `}
              />

            </div>


            {/* TIMELINE NODES */}

            <div
              className=
                "career-nodes"
            >

              {/* CURRENT NODE */}

              <div
                className=
                  "career-node"
              >

                <div
                  className=
                    "career-dot current"
                />

                <span
                  className=
                    "career-node-year"
                >
                  Present
                </span>

              </div>


              {/* PREVIOUS NODES */}

              {previousExperience.map(
                (company) => (

                  <div
                    key={company.id}
                    className={`
                      career-node
                      ${
                        hoveredExperience ===
                        company.id
                          ? "active"
                          : ""
                      }
                    `}
                  >

                    <div
                      className=
                        "career-dot completed"
                    />

                    <span
                      className=
                        "career-node-year"
                    >
                      {
                        company.start
                      }
                    </span>

                  </div>

                )
              )}

            </div>


            {/* PREVIOUS COMPANY CARDS */}

            <div
              className=
                "career-cards"
            >

              {previousExperience.map(
                (company, index) => (

                  /*
                    IMPORTANT:
                    These are deliberately
                    DIV elements, NOT buttons.
                    They cannot be opened.
                  */

                  <div
                    key={company.id}
                    className={`
                      previous-company-card
                      ${
                        experienceInView
                          ? "in-view"
                          : ""
                      }
                      ${
                        hoveredExperience ===
                        company.id
                          ? "active"
                          : ""
                      }
                    `}
                    style={{
                      transitionDelay:
                        experienceInView
                          ? `${
                              .25 +
                              index *
                                .2
                            }s`
                          : "0s",
                    }}
                    onMouseEnter={() =>
                      setHoveredExperience(
                        company.id
                      )
                    }
                    onMouseLeave={() =>
                      setHoveredExperience(
                        null
                      )
                    }
                  >

                    <div
                      className=
                        "previous-company-top"
                    >

                      <h3
                        className=
                          "previous-company-name"
                      >
                        {
                          company.company
                        }
                      </h3>


                      <span
                        className=
                          "previous-company-years"
                      >
                        {
                          company.start
                        }
                        {" — "}
                        {
                          company.end
                        }
                      </span>

                    </div>


                    <div
                      className=
                        "previous-company-role"
                    >
                      {
                        company.position
                      }
                      {" · "}
                      {
                        company.type
                      }
                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

          </>

        )}

      </section>


      {/* =================================================
          SKILLS
          ================================================= */}

      <section id="skills">

        <div
          className=
            "section-head"
        >

          <h2>
            Skills
          </h2>

          <p>
            Move your cursor across
            the icons.
          </p>

        </div>


        {skillsLoading ? (
  <div className="skills-wrap">
    Loading skills...
  </div>
) : (
  <SkillsDock
    skills={skills}
  />
)}

      </section>


      {/* =================================================
          PROJECT MODAL
          ================================================= */}

      {activeProject && (

        <div
          className=
            "modal-backdrop"
          onClick={() =>
            setActiveProject(null)
          }
        >

          <div
            className=
              "modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className=
                "modal-close"
              onClick={() =>
                setActiveProject(null)
              }
            >
              ✕
            </button>


            <img
              className=
                "modal-img"
              src={
                activeProject.image
              }
              alt={
                activeProject.title
              }
            />


            <div
              className=
                "modal-body"
            >

              <h3>
                {
                  activeProject.title
                }
              </h3>


              <p
                className=
                  "long"
              >
                {
                  activeProject.longDescription
                }
              </p>


              <div
                className=
                  "modal-tech"
              >

                {getProjectTech(activeProject.skillIds).map(
                  (t) => (
                    <span
                      key={t.id}
                      className=
                        "tag"
                    >
                      {t.name}
                    </span>
                  )
                )}

              </div>


              <div
                className=
                  "modal-links"
              >

                <a
                  className=
                    "primary"
                  href={
                    activeProject.live
                  }
                  target="_blank"
                  rel=
                    "noopener noreferrer"
                >
                  Live Demo
                </a>


                <a
                  className=
                    "ghost"
                  href={
                    activeProject.github
                  }
                  target="_blank"
                  rel=
                    "noopener noreferrer"
                >
                  View Code
                </a>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* =================================================
          FOOTER
          ================================================= */}

      <footer
        className=
          "footer"
        id="contact"
      >

        <div
          className=
            "footer-main"
        >

          {/* BRAND */}

          <div
            className=
              "footer-brand"
          >

            <h2>
              Let's build something.
            </h2>


            <p>
              Have a project, idea,
              or opportunity in mind?
              Feel free to reach out.
              I'm always open to
              interesting conversations
              and collaborations.
            </p>


            <div
              className=
                "footer-socials"
            >

<a
  className="footer-social"
  href="https://github.com/MohammedSadiq555"
  target="_blank"
  rel="noopener noreferrer"
>
  <img 
    src="https://www.svgrepo.com/show/516640/github.svg" 
    alt="GitHub icon" 
    width="40" 
    height="40" 
    style={{
      backgroundColor: '#ffffff',
      borderRadius: '25%',
      border: '2px solid #000000',
      padding: '4px'
    }}
  />
</a>


<a
      className="footer-social"
      href="https://www.linkedin.com/in/mohammed-sadiq-81382b221?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn Profile"
    >
      <img 
        src="https://www.svgrepo.com/show/25824/linked-in-logo-of-two-letters.svg" 
        alt="LinkedIn logo" 
        width="40" 
        height="40" 
        style={{
      backgroundColor: '#ffffff',
      borderRadius: '25%',
      border: '2px solid #000000',
      padding: '4px'
    }}
      />
    </a>


              <a
                className=
                  "footer-social"
                href=
                  "https://www.instagram.com/sad.iq_555?igsi=MTNjcWZ2ZmQxMmJwZA=="
                target="_blank"
                rel=
                  "noopener noreferrer"
              >
                <img 
        src="https://www.svgrepo.com/show/521711/instagram.svg" 
        alt="LinkedIn logo" 
        width="40" 
        height="40" 
        style={{
      backgroundColor: '#ffffff',
      borderRadius: '25%',
      border: '2px solid #000000',
      padding: '4px'
    }}
      />
              </a>


            </div>

          </div>


          {/* CONTACT */}

          <div>

            <div
              className=
                "footer-title"
            >
              Contact
            </div>


            <div
              className=
                "footer-links"
            >

              <a
                href=
                  "mailto:sadiq.mohammed.dev@gmail.com"
              >
                ✉
                {" "}
                sadiq.mohammed.dev@gmail.com
              </a>


              <a
                href=
                  "tel:+919789935475"
              >
                ☎
                {" "}
                +91 97899 35475
              </a>

            </div>

          </div>


          {/* NAVIGATION */}

          <div>

            <div
              className=
                "footer-title"
            >
              Explore
            </div>


            <div
              className=
                "footer-links"
            >

              <a href="#home">
                Home
              </a>

              <a href="#projects">
                Projects
              </a>

              <a href="#education">
                Education
              </a>

              <a href="#experience">
                Experience
              </a>

              <a href="#skills">
                Skills
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

          </div>

        </div>


        <div
          className=
            "footer-bottom"
        >

          <span>
            ©{" "}
            {new Date().getFullYear()}
            {" "}
            A. Rivera.
            All rights reserved.
          </span>


          <a href="#home">
            Back to top ↑
          </a>

        </div>

      </footer>

    </div>
        </>
  );
}
