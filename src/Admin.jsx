import React, { useEffect, useState } from "react";

/* =========================================================
   SKILLS APIs
   ========================================================= */

const SKILLS_GET_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/Skillsget";

const SKILLS_CREATE_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/SkillsCreate";

const SKILLS_UPDATE_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/SkillsUpdate";

const SKILLS_DELETE_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/Skillsget/SkillDelete";


/* =========================================================
   PROJECT APIs
   ========================================================= */

const PROJECT_GET_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/ProjectsAPI/getProject";

const PROJECT_CREATE_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/ProjectsAPI/CreateProject";

const PROJECT_UPDATE_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/ProjectsAPI/UpdateProject";

const PROJECT_DELETE_API =
  "https://personal-zld4pieb.outsystemscloud.com/SadiqPortfolio/rest/ProjectsAPI/DeleteProject";


/* =========================================================
   ADMIN
   ========================================================= */

export default function Admin() {

  /* =======================================================
     GENERAL
     ======================================================= */

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [darkMode, setDarkMode] =
    useState(true);


  /* =======================================================
     SKILLS
     ======================================================= */

  const [skills, setSkills] =
    useState([]);

  const [skillsLoading, setSkillsLoading] =
    useState(false);

  const [skillsError, setSkillsError] =
    useState("");


  /* =======================================================
     ADD SKILL
     ======================================================= */

  const [showAddSkill, setShowAddSkill] =
    useState(false);

  const [newSkillName, setNewSkillName] =
    useState("");

  const [newSkillImage, setNewSkillImage] =
    useState("");

  const [addingSkill, setAddingSkill] =
    useState(false);


  /* =======================================================
     EDIT SKILL
     ======================================================= */

  const [selectedSkill, setSelectedSkill] =
    useState(null);

  const [editSkillName, setEditSkillName] =
    useState("");

  const [editSkillImage, setEditSkillImage] =
    useState("");

  const [updatingSkill, setUpdatingSkill] =
    useState(false);

  const [deletingSkill, setDeletingSkill] =
    useState(false);


  /* =======================================================
     PROJECTS
     ======================================================= */

  const [projects, setProjects] =
    useState([]);

  const [projectsLoading, setProjectsLoading] =
    useState(false);

  const [projectsError, setProjectsError] =
    useState("");


  /* =======================================================
     ADD PROJECT
     ======================================================= */

  const [showAddProject, setShowAddProject] =
    useState(false);

  const [creatingProject, setCreatingProject] =
    useState(false);

  const [projectError, setProjectError] =
    useState("");


  /* =======================================================
     CREATE PROJECT FORM
     ======================================================= */

  const [projectName, setProjectName] =
    useState("");

  const [projectDescription, setProjectDescription] =
    useState("");

  const [projectImage, setProjectImage] =
    useState(null);

  const [projectImagePreview, setProjectImagePreview] =
    useState("");

  const [projectGithubURL, setProjectGithubURL] =
    useState("");

  const [projectURL, setProjectURL] =
    useState("");

  const [projectYear, setProjectYear] =
    useState("");

  const [selectedSkillIds, setSelectedSkillIds] =
    useState([]);


  /* =======================================================
     EDIT PROJECT
     ======================================================= */

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [editProjectName, setEditProjectName] =
    useState("");

  const [editProjectDescription, setEditProjectDescription] =
    useState("");

  const [editProjectGithubURL, setEditProjectGithubURL] =
    useState("");

  const [editProjectURL, setEditProjectURL] =
    useState("");

  const [editProjectYear, setEditProjectYear] =
    useState("");

  const [updatingProject, setUpdatingProject] =
    useState(false);

  const [deletingProject, setDeletingProject] =
    useState(false);


  /* =======================================================
     GET SKILLS
     ======================================================= */

  const fetchSkills = async () => {

    try {

      setSkillsLoading(true);
      setSkillsError("");

      const response =
        await fetch(
          SKILLS_GET_API,
          {
            method: "GET"
          }
        );

      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }

      const data =
        await response.json();

      console.log(
        "Skills Response:",
        data
      );


      const formattedSkills =
        Array.isArray(data)
          ? data.map((item) => {

              const skill =
                item.Skills ||
                item;

              return {

                id:
                  skill.Id,

                name:
                  skill.skillname ||
                  skill.Name ||
                  "",

                icon:
                  skill.imagelink ||
                  skill.ImageURL ||
                  ""

              };

            })
          : [];


      setSkills(
        formattedSkills
      );

    } catch (error) {

      console.error(
        "Skills GET Error:",
        error
      );

      setSkillsError(
        "Unable to load skills."
      );

    } finally {

      setSkillsLoading(false);

    }

  };


  /* =======================================================
     GET PROJECTS
     ======================================================= */

  const fetchProjects = async () => {

    try {

      setProjectsLoading(true);
      setProjectsError("");

      const response =
        await fetch(
          PROJECT_GET_API,
          {
            method: "GET"
          }
        );


      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }


      /*
       Your API is expected to
       return JSON.
      */

      const data =
        await response.json();


      console.log(
        "Projects Response:",
        data
      );


      /*
       Handle different possible
       OutSystems response structures.
      */

      let projectList = [];

      if (Array.isArray(data)) {

        projectList =
          data;

      } else if (
        Array.isArray(
          data.Projects
        )
      ) {

        projectList =
          data.Projects;

      } else if (
        Array.isArray(
          data.List
        )
      ) {

        projectList =
          data.List;

      } else if (
        Array.isArray(
          data.Data
        )
      ) {

        projectList =
          data.Data;

      }


      const formattedProjects =
        projectList.map(
          (item) => {

            const project =
              item.Projects ||
              item.Project ||
              item;


            return {

              id:
                project.Id ||
                project.ID ||
                project.projectID,

              name:
                project.Name ||
                project.name ||
                "",

              description:
                project.Description ||
                project.description ||
                "",

              image:
                project.ImageLink ||
                project.Image ||
                project.image ||
                "",

              githubURL:
                project.GithubURL ||
                project.GithubLink ||
                project.githubURL ||
                project.githubLink ||
                "",

              projectURL:
                project.ProjectURL ||
                project.ProjectLink ||
                project.projectURL ||
                project.projectLink ||
                "",

              year:
                project.Year ||
                project.year ||
                "",

              skillIds:
                project.SkillIds ||
                project.SkillIDs ||
                project.skillIds ||
                []

            };

          }
        );


      setProjects(
        formattedProjects
      );

    } catch (error) {

      console.error(
        "Projects GET Error:",
        error
      );

      setProjectsError(
        "Unable to load projects."
      );

    } finally {

      setProjectsLoading(false);

    }
     console.log(
  "Projects Response:",
  data
);

  };


  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {

    fetchSkills();

    fetchProjects();

  }, []);


  /* =======================================================
     ADD SKILL
     ======================================================= */

  const openAddSkill = () => {

    setNewSkillName("");
    setNewSkillImage("");

    setShowAddSkill(true);

  };


  const closeAddSkill = () => {

    if (addingSkill) {
      return;
    }

    setShowAddSkill(false);

  };


  /* =======================================================
     CREATE SKILL
     ======================================================= */

  const handleCreateSkill =
    async (e) => {

      e.preventDefault();


      if (!newSkillName.trim()) {

        alert(
          "Please enter a skill name."
        );

        return;

      }


      if (!newSkillImage.trim()) {

        alert(
          "Please enter an image URL."
        );

        return;

      }


      try {

        setAddingSkill(true);


        const url =
          `${SKILLS_CREATE_API}` +
          `?Name=${encodeURIComponent(
            newSkillName.trim()
          )}` +
          `&InputURL=${encodeURIComponent(
            newSkillImage.trim()
          )}`;


        const response =
          await fetch(
            url,
            {
              method: "POST"
            }
          );


        if (!response.ok) {

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        alert(
          "Skill created successfully!"
        );


        closeAddSkill();

        await fetchSkills();

      } catch (error) {

        console.error(
          "Create Skill Error:",
          error
        );

        alert(
          "Failed to create skill."
        );

      } finally {

        setAddingSkill(false);

      }

    };


  /* =======================================================
     EDIT SKILL
     ======================================================= */

  const openEditSkill =
    (skill) => {

      setSelectedSkill(
        skill
      );

      setEditSkillName(
        skill.name
      );

      setEditSkillImage(
        skill.icon
      );

    };


  const closeEditSkill = () => {

    if (
      updatingSkill ||
      deletingSkill
    ) {

      return;

    }

    setSelectedSkill(null);

  };


  /* =======================================================
     UPDATE SKILL
     ======================================================= */

  const handleUpdateSkill =
    async (e) => {

      e.preventDefault();


      if (!selectedSkill) {
        return;
      }


      if (!editSkillName.trim()) {

        alert(
          "Please enter a skill name."
        );

        return;

      }


      if (!editSkillImage.trim()) {

        alert(
          "Please enter an image URL."
        );

        return;

      }


      try {

        setUpdatingSkill(true);


        const url =
          `${SKILLS_UPDATE_API}` +
          `?SkillId=${encodeURIComponent(
            selectedSkill.id
          )}` +
          `&Name=${encodeURIComponent(
            editSkillName.trim()
          )}` +
          `&InputURL=${encodeURIComponent(
            editSkillImage.trim()
          )}`;


        const response =
          await fetch(
            url,
            {
              method: "PUT"
            }
          );


        if (!response.ok) {

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        alert(
          "Skill updated successfully!"
        );


        closeEditSkill();

        await fetchSkills();

      } catch (error) {

        console.error(
          "Update Skill Error:",
          error
        );

        alert(
          "Failed to update skill."
        );

      } finally {

        setUpdatingSkill(false);

      }

    };


  /* =======================================================
     DELETE SKILL
     ======================================================= */

  const handleDeleteSkill =
    async () => {

      if (!selectedSkill) {
        return;
      }


      const confirmed =
        window.confirm(
          `Delete "${selectedSkill.name}"?`
        );


      if (!confirmed) {
        return;
      }


      try {

        setDeletingSkill(true);


        const url =
          `${SKILLS_DELETE_API}` +
          `?SkillId=${encodeURIComponent(
            selectedSkill.id
          )}`;


        const response =
          await fetch(
            url,
            {
              method: "DELETE"
            }
          );


        if (!response.ok) {

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        alert(
          "Skill deleted successfully!"
        );


        closeEditSkill();

        await fetchSkills();

      } catch (error) {

        console.error(
          "Delete Skill Error:",
          error
        );

        alert(
          "Failed to delete skill."
        );

      } finally {

        setDeletingSkill(false);

      }

    };


  /* =======================================================
     PROJECT IMAGE
     ======================================================= */

  const handleProjectImageChange =
    (e) => {

      const file =
        e.target.files?.[0];


      if (!file) {

        setProjectImage(null);
        setProjectImagePreview("");

        return;

      }


      const allowedTypes = [

        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp"

      ];


      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        alert(
          "Please upload PNG, JPG, JPEG or WEBP."
        );

        e.target.value = "";

        setProjectImage(null);
        setProjectImagePreview("");

        return;

      }


      const maxSize =
        10 * 1024 * 1024;


      if (
        file.size >
        maxSize
      ) {

        alert(
          "Image must be smaller than 10 MB."
        );

        e.target.value = "";

        setProjectImage(null);
        setProjectImagePreview("");

        return;

      }


      setProjectImage(
        file
      );


      const previewURL =
        URL.createObjectURL(
          file
        );


      setProjectImagePreview(
        previewURL
      );

    };


  /* =======================================================
     OPEN ADD PROJECT
     ======================================================= */

  const openAddProject = () => {

    setProjectName("");
    setProjectDescription("");

    setProjectImage(null);
    setProjectImagePreview("");

    setProjectGithubURL("");
    setProjectURL("");
    setProjectYear("");

    setSelectedSkillIds([]);

    setProjectError("");

    setShowAddProject(true);

  };


  /* =======================================================
     CLOSE ADD PROJECT
     ======================================================= */

  const closeAddProject = () => {

    if (creatingProject) {
      return;
    }

    setShowAddProject(false);

    setProjectName("");
    setProjectDescription("");

    setProjectImage(null);
    setProjectImagePreview("");

    setProjectGithubURL("");
    setProjectURL("");
    setProjectYear("");

    setSelectedSkillIds([]);

    setProjectError("");

  };


  /* =======================================================
     SELECT TECHNOLOGIES
     ======================================================= */

  const toggleProjectSkill =
    (skillId) => {

      setSelectedSkillIds(
        (previous) => {

          if (
            previous.includes(
              skillId
            )
          ) {

            return previous.filter(
              (id) =>
                id !== skillId
            );

          }


          return [
            ...previous,
            skillId
          ];

        }
      );

    };


  /* =======================================================
     CREATE PROJECT
     ======================================================= */

  const handleCreateProject =
    async (e) => {

      e.preventDefault();

      setProjectError("");


      if (!projectName.trim()) {

        setProjectError(
          "Please enter the project name."
        );

        return;

      }


      if (!projectDescription.trim()) {

        setProjectError(
          "Please enter the project description."
        );

        return;

      }


      if (!projectImage) {

        setProjectError(
          "Please select a project image."
        );

        return;

      }


      if (!projectGithubURL.trim()) {

        setProjectError(
          "Please enter the GitHub URL."
        );

        return;

      }


      if (!projectYear) {

        setProjectError(
          "Please enter the year."
        );

        return;

      }


      try {

        setCreatingProject(
          true
        );


        /*
         IMPORTANT:

         These parameters match
         your OutSystems API.

         Name
         Description
         GithubURL
         ProjectURL
         Year

         ImageLink = BINARY BODY
        */


        const url =
          `${PROJECT_CREATE_API}` +
          `?Name=${encodeURIComponent(
            projectName.trim()
          )}` +
          `&Description=${encodeURIComponent(
            projectDescription.trim()
          )}` +
          `&GithubURL=${encodeURIComponent(
            projectGithubURL.trim()
          )}` +
          `&ProjectURL=${encodeURIComponent(
            projectURL.trim()
          )}` +
          `&Year=${encodeURIComponent(
            projectYear
          )}`;


        const response =
          await fetch(
            url,
            {
              method: "POST",

              headers: {

                "Content-Type":
                  projectImage.type ||
                  "application/octet-stream"

              },

              body:
                projectImage

            }
          );


        if (!response.ok) {

          const errorText =
            await response.text();

          console.error(
            "OutSystems response:",
            errorText
          );

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        alert(
          "Project created successfully!"
        );


        closeAddProject();


        /*
         Get the actual data from
         OutSystems after creation.
        */

        await fetchProjects();

      } catch (error) {

        console.error(
          "Create Project Error:",
          error
        );

        setProjectError(
          "Failed to create project."
        );

      } finally {

        setCreatingProject(
          false
        );

      }

    };


  /* =======================================================
     OPEN EDIT PROJECT
     ======================================================= */

  const openEditProject =
    (project) => {

      setSelectedProject(
        project
      );


      setEditProjectName(
        project.name
      );


      setEditProjectDescription(
        project.description
      );


      setEditProjectGithubURL(
        project.githubURL
      );


      setEditProjectURL(
        project.projectURL
      );


      setEditProjectYear(
        project.year
      );

    };


  /* =======================================================
     CLOSE EDIT PROJECT
     ======================================================= */

  const closeEditProject = () => {

    if (
      updatingProject ||
      deletingProject
    ) {

      return;

    }

    setSelectedProject(
      null
    );

  };


  /* =======================================================
     UPDATE PROJECT
     ======================================================= */

  const handleUpdateProject =
    async (e) => {

      e.preventDefault();


      if (!selectedProject) {
        return;
      }


      if (!editProjectName.trim()) {

        alert(
          "Please enter the project name."
        );

        return;

      }


      if (!editProjectDescription.trim()) {

        alert(
          "Please enter the description."
        );

        return;

      }


      if (!editProjectYear) {

        alert(
          "Please enter the year."
        );

        return;

      }


      try {

        setUpdatingProject(
          true
        );


        /*
         EXACT API PARAMETER NAMES:

         projectID
         Name
         description
         year
         GithubLink
         ProjectLink
        */


        const url =
          `${PROJECT_UPDATE_API}` +
          `?projectID=${encodeURIComponent(
            selectedProject.id
          )}` +
          `&Name=${encodeURIComponent(
            editProjectName.trim()
          )}` +
          `&description=${encodeURIComponent(
            editProjectDescription.trim()
          )}` +
          `&year=${encodeURIComponent(
            editProjectYear
          )}` +
          `&GithubLink=${encodeURIComponent(
            editProjectGithubURL.trim()
          )}` +
          `&ProjectLink=${encodeURIComponent(
            editProjectURL.trim()
          )}`;


        console.log(
          "Update Project URL:",
          url
        );


        const response =
          await fetch(
            url,
            {
              method: "PUT"
            }
          );


        if (!response.ok) {

          const errorText =
            await response.text();

          console.error(
            "Update response:",
            errorText
          );

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        alert(
          "Project updated successfully!"
        );


        closeEditProject();

        await fetchProjects();

      } catch (error) {

        console.error(
          "Update Project Error:",
          error
        );

        alert(
          "Failed to update project."
        );

      } finally {

        setUpdatingProject(
          false
        );

      }

    };


  /* =======================================================
     DELETE PROJECT
     ======================================================= */

  const handleDeleteProject =
    async () => {

      if (!selectedProject) {
        return;
      }


      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${selectedProject.name}"?`
        );


      if (!confirmed) {
        return;
      }


      try {

        setDeletingProject(
          true
        );


        /*
         EXACT DELETE API:

         DeleteProject?projectId={projectId}
        */


        const url =
          `${PROJECT_DELETE_API}` +
          `?projectId=${encodeURIComponent(
            selectedProject.id
          )}`;


        console.log(
          "Delete Project URL:",
          url
        );


        const response =
          await fetch(
            url,
            {
              method: "DELETE"
            }
          );


        if (!response.ok) {

          const errorText =
            await response.text();

          console.error(
            "Delete response:",
            errorText
          );

          throw new Error(
            `HTTP ${response.status}`
          );

        }


        alert(
          "Project deleted successfully!"
        );


        closeEditProject();

        await fetchProjects();

      } catch (error) {

        console.error(
          "Delete Project Error:",
          error
        );

        alert(
          "Failed to delete project."
        );

      } finally {

        setDeletingProject(
          false
        );

      }

    };


  /* =======================================================
     PROJECT SKILLS
     ======================================================= */

  const getProjectSkills =
    (project) => {

      if (
        !project.skillIds ||
        !Array.isArray(
          project.skillIds
        )
      ) {

        return [];

      }


      return skills.filter(
        (skill) =>
          project.skillIds.includes(
            skill.id
          )
      );

    };


  /* =======================================================
     RETURN
     ======================================================= */

  return (

    <div
      className={
        darkMode
          ? "admin dark"
          : "admin light"
      }
    >

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
        }

        .admin {

          min-height: 100vh;

          --bg: #0d1117;
          --surface: #161b22;
          --surface2: #1c222b;
          --border: #30363d;
          --text: #f0f3f6;
          --muted: #8b949e;
          --accent: #5865f2;

          background: var(--bg);
          color: var(--text);

        }

        .admin.light {

          --bg: #f5f6f8;
          --surface: #ffffff;
          --surface2: #f0f1f4;
          --border: #d8dbe2;
          --text: #17191d;
          --muted: #686e79;
          --accent: #4f46e5;

        }

        /* NAVBAR */

        .navbar {

          height: 64px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 25px;

          border-bottom:
            1px solid var(--border);

          background: var(--bg);

          position: sticky;
          top: 0;

          z-index: 20;

        }

        .brand {

          font-size: 18px;
          font-weight: 700;

        }

        .nav-actions {

          display: flex;
          align-items: center;
          gap: 10px;

        }

        .theme-button {

          width: 40px;
          height: 40px;

          border:
            1px solid var(--border);

          border-radius: 50%;

          background: var(--surface);

          cursor: pointer;

          font-size: 16px;

        }

        .logout {

          padding: 9px 14px;

          border:
            1px solid var(--border);

          border-radius: 8px;

          background: var(--surface);

          color: var(--muted);

          cursor: pointer;

        }

        /* LAYOUT */

        .layout {

          display: flex;

          min-height:
            calc(100vh - 64px);

        }

        .sidebar {

          width: 220px;

          flex-shrink: 0;

          padding: 20px 12px;

          border-right:
            1px solid var(--border);

          background: var(--bg);

        }

        .nav-item {

          width: 100%;

          padding: 12px 14px;

          margin-bottom: 5px;

          border: none;

          border-radius: 8px;

          background: transparent;

          color: var(--muted);

          text-align: left;

          cursor: pointer;

          font-size: 14px;

        }

        .nav-item:hover {

          background: var(--surface);

          color: var(--text);

        }

        .nav-item.active {

          background: var(--surface);

          color: var(--text);

          border-left:
            3px solid var(--accent);

        }

        .content {

          flex: 1;

          padding: 32px;

          min-width: 0;

        }

        /* HEADER */

        .page-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 25px;

          gap: 20px;

        }

        .title {

          margin: 0 0 6px;

          font-size: 27px;

        }

        .subtitle {

          margin: 0;

          color: var(--muted);

          font-size: 13px;

        }

        /* BUTTON */

        .primary {

          padding: 11px 17px;

          border: none;

          border-radius: 8px;

          background: var(--accent);

          color: white;

          cursor: pointer;

          font-weight: 600;

        }

        .primary:hover {

          opacity: .9;

        }

        .primary:disabled {

          opacity: .5;

          cursor: not-allowed;

        }

        .secondary {

          width: 100%;

          padding: 11px;

          margin-top: 9px;

          border:
            1px solid var(--border);

          border-radius: 8px;

          background: transparent;

          color: var(--muted);

          cursor: pointer;

        }

        /* EMPTY */

        .empty {

          padding: 60px 20px;

          border:
            1px dashed var(--border);

          border-radius: 12px;

          background: var(--surface);

          text-align: center;

          color: var(--muted);

        }

        .empty h3 {

          margin: 0 0 7px;

          color: var(--text);

        }

        /* SKILLS */

        .skill-grid {

          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(150px, 1fr)
            );

          gap: 16px;

        }

        .skill-card {

          padding: 20px;

          border:
            1px solid var(--border);

          border-radius: 12px;

          background: var(--surface);

          cursor: pointer;

          text-align: center;

          transition:
            transform .2s,
            border-color .2s;

        }

        .skill-card:hover {

          transform: translateY(-3px);

          border-color: var(--accent);

        }

        .skill-logo {

          width: 65px;
          height: 65px;

          object-fit: contain;

          margin-bottom: 12px;

        }

        .skill-name {

          font-size: 14px;
          font-weight: 600;

        }

        .skill-id {

          margin-top: 5px;

          color: var(--muted);

          font-size: 11px;

        }

        /* PROJECTS */

        .project-grid {

          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(280px, 1fr)
            );

          gap: 18px;

        }

        .project-card {

          overflow: hidden;

          border:
            1px solid var(--border);

          border-radius: 13px;

          background: var(--surface);

          cursor: pointer;

          transition:
            transform .2s,
            border-color .2s;

        }

        .project-card:hover {

          transform: translateY(-3px);

          border-color: var(--accent);

        }

        .project-image {

          width: 100%;
          height: 165px;

          object-fit: cover;

          display: block;

          background: var(--surface2);

        }

        .project-body {

          padding: 17px;

        }

        .project-name {

          margin: 0 0 7px;

          font-size: 17px;

        }

        .project-description {

          margin: 0 0 12px;

          color: var(--muted);

          font-size: 13px;

          line-height: 1.5;

        }

        .project-year {

          color: var(--muted);

          font-size: 12px;

        }

        .project-links {

          display: flex;

          gap: 8px;

          margin-top: 13px;

        }

        .project-link {

          padding: 6px 9px;

          border:
            1px solid var(--border);

          border-radius: 7px;

          color: var(--muted);

          text-decoration: none;

          font-size: 11px;

        }

        /* TECHNOLOGIES */

        .technology-list {

          display: flex;

          flex-wrap: wrap;

          gap: 7px;

          margin-top: 14px;

        }

        .technology {

          display: flex;

          align-items: center;

          gap: 5px;

          padding: 5px 8px;

          border:
            1px solid var(--border);

          border-radius: 999px;

          background: var(--surface2);

          font-size: 11px;

        }

        .technology img {

          width: 18px;
          height: 18px;

          object-fit: contain;

        }

        /* MODAL */

        .overlay {

          position: fixed;

          inset: 0;

          z-index: 100;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            rgba(0, 0, 0, .72);

          backdrop-filter: blur(7px);

        }

        .modal {

          width: 100%;

          max-width: 600px;

          max-height: 92vh;

          overflow-y: auto;

          padding: 27px;

          border:
            1px solid var(--border);

          border-radius: 15px;

          background: var(--surface);

        }

        .modal-header {

          display: flex;

          align-items: center;
          justify-content: space-between;

          margin-bottom: 22px;

        }

        .modal-header h2 {

          margin: 0;

          font-size: 21px;

        }

        .close {

          width: 34px;
          height: 34px;

          border:
            1px solid var(--border);

          border-radius: 50%;

          background: var(--surface2);

          color: var(--text);

          cursor: pointer;

          font-size: 19px;

        }

        /* FORM */

        .field {

          margin-bottom: 17px;

        }

        .field label {

          display: block;

          margin-bottom: 7px;

          font-size: 13px;

          font-weight: 600;

        }

        .field input,
        .field textarea {

          width: 100%;

          padding: 11px 13px;

          border:
            1px solid var(--border);

          border-radius: 8px;

          outline: none;

          background: var(--surface2);

          color: var(--text);

          font-size: 13px;

        }

        .field input:focus,
        .field textarea:focus {

          border-color: var(--accent);

        }

        .field textarea {

          min-height: 105px;

          resize: vertical;

        }

        .help {

          margin-top: 6px;

          color: var(--muted);

          font-size: 11px;

        }

        .file-input {

          padding: 12px !important;

          cursor: pointer;

        }

        /* PREVIEW */

        .preview {

          margin-top: 10px;

          min-height: 120px;

          padding: 10px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid var(--border);

          border-radius: 8px;

          background: var(--surface2);

        }

        .preview img {

          max-width: 100%;

          max-height: 160px;

          object-fit: contain;

        }

        /* SELECTOR */

        .selector {

          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(150px, 1fr)
            );

          gap: 8px;

          max-height: 220px;

          overflow-y: auto;

          padding: 9px;

          border:
            1px solid var(--border);

          border-radius: 9px;

          background: var(--surface2);

        }

        .selector-item {

          display: flex;

          align-items: center;

          gap: 7px;

          padding: 8px;

          border:
            1px solid var(--border);

          border-radius: 8px;

          background: var(--surface);

          cursor: pointer;

        }

        .selector-item.selected {

          border-color: var(--accent);

        }

        .selector-item input {

          width: 15px;
          height: 15px;

          accent-color: var(--accent);

        }

        .selector-item img {

          width: 25px;
          height: 25px;

          object-fit: contain;

        }

        .selector-name {

          font-size: 12px;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;

        }

        /* ERROR */

        .error {

          margin-bottom: 15px;

          padding: 11px;

          border:
            1px solid #ef4444;

          border-radius: 8px;

          color: #ef4444;

          background:
            rgba(239, 68, 68, .08);

          font-size: 12px;

        }

        /* EDIT BUTTONS */

        .edit-buttons {

          display: flex;

          gap: 9px;

          margin-top: 20px;

        }

        .update-button {

          flex: 1;

          padding: 11px;

          border: none;

          border-radius: 8px;

          background: var(--accent);

          color: white;

          cursor: pointer;

          font-weight: 600;

        }

        .delete-button {

          flex: 1;

          padding: 11px;

          border:
            1px solid #ef4444;

          border-radius: 8px;

          background: transparent;

          color: #ef4444;

          cursor: pointer;

          font-weight: 600;

        }

        .update-button:disabled,
        .delete-button:disabled {

          opacity: .5;

          cursor: not-allowed;

        }

        @media (max-width: 700px) {

          .sidebar {

            width: 70px;

          }

          .content {

            padding: 20px 15px;

          }

          .page-header {

            align-items: flex-start;

            flex-direction: column;

          }

          .primary {

            width: 100%;

          }

        }

      `}</style>


      {/* ===================================================
          NAVBAR
          =================================================== */}

      <nav className="navbar">

        <div className="brand">
          Sadiq Portfolio Admin
        </div>


        <div className="nav-actions">

          <button
            className="theme-button"
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >
            {darkMode
              ? "🌙"
              : "☀️"}
          </button>


          <button className="logout">
            Logout
          </button>

        </div>

      </nav>


      {/* ===================================================
          LAYOUT
          =================================================== */}

      <div className="layout">


        {/* SIDEBAR */}

        <aside className="sidebar">

          <button
            className={
              `nav-item ${
                activeTab ===
                "dashboard"
                  ? "active"
                  : ""
              }`
            }
            onClick={() =>
              setActiveTab(
                "dashboard"
              )
            }
          >
            Dashboard
          </button>


          <button
            className={
              `nav-item ${
                activeTab ===
                "skills"
                  ? "active"
                  : ""
              }`
            }
            onClick={() =>
              setActiveTab(
                "skills"
              )
            }
          >
            Skills
          </button>


          <button
            className={
              `nav-item ${
                activeTab ===
                "projects"
                  ? "active"
                  : ""
              }`
            }
            onClick={() =>
              setActiveTab(
                "projects"
              )
            }
          >
            Projects
          </button>

        </aside>


        {/* =================================================
            CONTENT
            ================================================= */}

        <main className="content">


          {/* =================================================
              DASHBOARD
              ================================================= */}

          {activeTab ===
            "dashboard" && (

            <>

              <h1 className="title">
                Dashboard
              </h1>

              <p className="subtitle">
                Manage your portfolio.
              </p>

            </>

          )}


          {/* =================================================
              SKILLS
              ================================================= */}

          {activeTab ===
            "skills" && (

            <>

              <div className="page-header">

                <div>

                  <h1 className="title">
                    Skills
                  </h1>

                  <p className="subtitle">
                    Click a skill to edit
                    or delete.
                  </p>

                </div>


                <button
                  className="primary"
                  onClick={
                    openAddSkill
                  }
                >
                  + Add Skill
                </button>

              </div>


              {skillsError && (

                <div className="error">
                  {skillsError}
                </div>

              )}


              {skillsLoading ? (

                <div className="empty">
                  Loading skills...
                </div>

              ) : (

                <div className="skill-grid">

                  {skills.map(
                    (skill) => (

                      <div
                        key={
                          skill.id
                        }
                        className="skill-card"
                        onClick={() =>
                          openEditSkill(
                            skill
                          )
                        }
                      >

                        <img
                          className="skill-logo"
                          src={
                            skill.icon
                          }
                          alt={
                            skill.name
                          }
                        />


                        <div className="skill-name">
                          {
                            skill.name
                          }
                        </div>


                        <div className="skill-id">
                          ID:{" "}
                          {
                            skill.id
                          }
                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </>

          )}


          {/* =================================================
              PROJECTS
              ================================================= */}

          {activeTab ===
            "projects" && (

            <>

              <div className="page-header">

                <div>

                  <h1 className="title">
                    Projects
                  </h1>

                  <p className="subtitle">
                    Click a project to
                    edit or delete.
                  </p>

                </div>


                <button
                  className="primary"
                  onClick={
                    openAddProject
                  }
                >
                  + Add Project
                </button>

              </div>


              {projectsError && (

                <div className="error">
                  {projectsError}
                </div>

              )}


              {projectsLoading ? (

                <div className="empty">
                  Loading projects...
                </div>

              ) : projects.length ===
                0 ? (

                <div className="empty">

                  <h3>
                    No projects yet
                  </h3>

                  <p>
                    Click "+ Add Project"
                    to create one.
                  </p>

                </div>

              ) : (

                <div className="project-grid">

                  {projects.map(
                    (project) => {

                      const projectSkills =
                        getProjectSkills(
                          project
                        );


                      return (

                        <div
                          className="project-card"
                          key={
                            project.id
                          }
                          onClick={() =>
                            openEditProject(
                              project
                            )
                          }
                        >


                          {project.image ? (

                            <img
                              className="project-image"
                              src={
                                project.image
                              }
                              alt={
                                project.name
                              }
                            />

                          ) : (

                            <div
                              className="project-image"
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                color:
                                  "var(--muted)"
                              }}
                            >
                              No Image
                            </div>

                          )}


                          <div className="project-body">

                            <h3 className="project-name">
                              {
                                project.name
                              }
                            </h3>


                            <p className="project-description">
                              {
                                project.description
                              }
                            </p>


                            <div className="project-year">
                              Year:{" "}
                              {
                                project.year
                              }
                            </div>


                            {projectSkills.length >
                              0 && (

                              <div className="technology-list">

                                {projectSkills.map(
                                  (skill) => (

                                    <div
                                      className="technology"
                                      key={
                                        skill.id
                                      }
                                    >

                                      <img
                                        src={
                                          skill.icon
                                        }
                                        alt=""
                                      />

                                      <span>
                                        {
                                          skill.name
                                        }
                                      </span>

                                    </div>

                                  )
                                )}

                              </div>

                            )}


                            <div className="project-links">

                              {project.githubURL && (

                                <a
                                  className="project-link"
                                  href={
                                    project.githubURL
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                >
                                  GitHub
                                </a>

                              )}


                              {project.projectURL && (

                                <a
                                  className="project-link"
                                  href={
                                    project.projectURL
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                >
                                  Project
                                </a>

                              )}

                            </div>

                          </div>

                        </div>

                      );

                    }
                  )}

                </div>

              )}

            </>

          )}

        </main>

      </div>


      {/* ===================================================
          ADD SKILL MODAL
          =================================================== */}

      {showAddSkill && (

        <div
          className="overlay"
          onClick={
            closeAddSkill
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Add Skill
              </h2>

              <button
                className="close"
                onClick={
                  closeAddSkill
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleCreateSkill
              }
            >

              <div className="field">

                <label>
                  Skill Name
                </label>

                <input
                  type="text"
                  value={
                    newSkillName
                  }
                  onChange={(e) =>
                    setNewSkillName(
                      e.target.value
                    )
                  }
                  placeholder="React"
                />

              </div>


              <div className="field">

                <label>
                  Image URL
                </label>

                <input
                  type="url"
                  value={
                    newSkillImage
                  }
                  onChange={(e) =>
                    setNewSkillImage(
                      e.target.value
                    )
                  }
                  placeholder="https://example.com/react.png"
                />

              </div>


              <button
                className="primary"
                type="submit"
                disabled={
                  addingSkill
                }
                style={{
                  width:
                    "100%"
                }}
              >
                {addingSkill
                  ? "Creating..."
                  : "Create Skill"}
              </button>


              <button
                className="secondary"
                type="button"
                onClick={
                  closeAddSkill
                }
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}


      {/* ===================================================
          EDIT SKILL MODAL
          =================================================== */}

      {selectedSkill && (

        <div
          className="overlay"
          onClick={
            closeEditSkill
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Edit Skill
              </h2>

              <button
                className="close"
                onClick={
                  closeEditSkill
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleUpdateSkill
              }
            >

              <div className="field">

                <label>
                  Skill Name
                </label>

                <input
                  type="text"
                  value={
                    editSkillName
                  }
                  onChange={(e) =>
                    setEditSkillName(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="field">

                <label>
                  Image URL
                </label>

                <input
                  type="url"
                  value={
                    editSkillImage
                  }
                  onChange={(e) =>
                    setEditSkillImage(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="edit-buttons">

                <button
                  className="update-button"
                  type="submit"
                  disabled={
                    updatingSkill ||
                    deletingSkill
                  }
                >
                  {updatingSkill
                    ? "Updating..."
                    : "Update"}
                </button>


                <button
                  className="delete-button"
                  type="button"
                  onClick={
                    handleDeleteSkill
                  }
                  disabled={
                    updatingSkill ||
                    deletingSkill
                  }
                >
                  {deletingSkill
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ===================================================
          ADD PROJECT MODAL
          =================================================== */}

      {showAddProject && (

        <div
          className="overlay"
          onClick={
            closeAddProject
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Add Project
              </h2>

              <button
                className="close"
                onClick={
                  closeAddProject
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleCreateProject
              }
            >


              {/* PROJECT NAME */}

              <div className="field">

                <label>
                  Project Name
                </label>

                <input
                  type="text"
                  value={
                    projectName
                  }
                  onChange={(e) =>
                    setProjectName(
                      e.target.value
                    )
                  }
                  placeholder="Nombre Akuma"
                />

              </div>


              {/* DESCRIPTION */}

              <div className="field">

                <label>
                  Description
                </label>

                <textarea
                  value={
                    projectDescription
                  }
                  onChange={(e) =>
                    setProjectDescription(
                      e.target.value
                    )
                  }
                  placeholder="Describe your project..."
                />

              </div>


              {/* IMAGE */}

              <div className="field">

                <label>
                  Project Image
                </label>

                <input
                  className="file-input"
                  type="file"
                  accept="
                    image/png,
                    image/jpeg,
                    image/jpg,
                    image/webp
                  "
                  onChange={
                    handleProjectImageChange
                  }
                />

                <div className="help">
                  PNG, JPG, JPEG or
                  WEBP. Maximum 10 MB.
                </div>

              </div>


              {projectImagePreview && (

                <div className="preview">

                  <img
                    src={
                      projectImagePreview
                    }
                    alt="Preview"
                  />

                </div>

              )}


              {/* GITHUB */}

              <div className="field">

                <label>
                  GitHub URL
                </label>

                <input
                  type="url"
                  value={
                    projectGithubURL
                  }
                  onChange={(e) =>
                    setProjectGithubURL(
                      e.target.value
                    )
                  }
                  placeholder="https://github.com/username/project"
                />

              </div>


              {/* PROJECT URL - OPTIONAL */}

              <div className="field">

                <label>
                  Project URL
                </label>

                <input
                  type="url"
                  value={
                    projectURL
                  }
                  onChange={(e) =>
                    setProjectURL(
                      e.target.value
                    )
                  }
                  placeholder="https://myproject.vercel.app"
                />

              </div>


              {/* YEAR */}

              <div className="field">

                <label>
                  Year
                </label>

                <input
                  type="number"
                  value={
                    projectYear
                  }
                  onChange={(e) =>
                    setProjectYear(
                      e.target.value
                    )
                  }
                  placeholder="2026"
                />

              </div>


              {/* TECHNOLOGIES */}

              <div className="field">

                <label>
                  Technologies
                </label>


                <div className="selector">

                  {skills.map(
                    (skill) => {

                      const selected =
                        selectedSkillIds.includes(
                          skill.id
                        );


                      return (

                        <label
                          key={
                            skill.id
                          }
                          className={
                            `selector-item ${
                              selected
                                ? "selected"
                                : ""
                            }`
                          }
                        >

                          <input
                            type="checkbox"
                            checked={
                              selected
                            }
                            onChange={() =>
                              toggleProjectSkill(
                                skill.id
                              )
                            }
                          />


                          <img
                            src={
                              skill.icon
                            }
                            alt=""
                          />


                          <span className="selector-name">
                            {
                              skill.name
                            }
                          </span>

                        </label>

                      );

                    }
                  )}

                </div>

              </div>


              {projectError && (

                <div className="error">
                  {
                    projectError
                  }
                </div>

              )}


              <button
                className="primary"
                type="submit"
                disabled={
                  creatingProject
                }
                style={{
                  width:
                    "100%"
                }}
              >

                {creatingProject
                  ? "Uploading..."
                  : "Create Project"}

              </button>


              <button
                className="secondary"
                type="button"
                onClick={
                  closeAddProject
                }
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}


      {/* ===================================================
          EDIT PROJECT MODAL
          =================================================== */}

      {selectedProject && (

        <div
          className="overlay"
          onClick={
            closeEditProject
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Edit Project
              </h2>


              <button
                className="close"
                onClick={
                  closeEditProject
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleUpdateProject
              }
            >


              {/* CURRENT IMAGE */}

              {selectedProject.image && (

                <div className="preview">

                  <img
                    src={
                      selectedProject.image
                    }
                    alt={
                      selectedProject.name
                    }
                  />

                </div>

              )}


              <div className="help">
                Project ID:{" "}
                {
                  selectedProject.id
                }
              </div>


              {/* NAME */}

              <div className="field">

                <label>
                  Project Name
                </label>

                <input
                  type="text"
                  value={
                    editProjectName
                  }
                  onChange={(e) =>
                    setEditProjectName(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* DESCRIPTION */}

              <div className="field">

                <label>
                  Description
                </label>

                <textarea
                  value={
                    editProjectDescription
                  }
                  onChange={(e) =>
                    setEditProjectDescription(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* GITHUB */}

              <div className="field">

                <label>
                  GitHub URL
                </label>

                <input
                  type="url"
                  value={
                    editProjectGithubURL
                  }
                  onChange={(e) =>
                    setEditProjectGithubURL(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* PROJECT URL */}

              <div className="field">

                <label>
                  Project URL
                </label>

                <input
                  type="url"
                  value={
                    editProjectURL
                  }
                  onChange={(e) =>
                    setEditProjectURL(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* YEAR */}

              <div className="field">

                <label>
                  Year
                </label>

                <input
                  type="number"
                  value={
                    editProjectYear
                  }
                  onChange={(e) =>
                    setEditProjectYear(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* BUTTONS */}

              <div className="edit-buttons">

                <button
                  className="update-button"
                  type="submit"
                  disabled={
                    updatingProject ||
                    deletingProject
                  }
                >

                  {updatingProject
                    ? "Updating..."
                    : "Update"}

                </button>


                <button
                  className="delete-button"
                  type="button"
                  onClick={
                    handleDeleteProject
                  }
                  disabled={
                    updatingProject ||
                    deletingProject
                  }
                >

                  {deletingProject
                    ? "Deleting..."
                    : "Delete"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}
