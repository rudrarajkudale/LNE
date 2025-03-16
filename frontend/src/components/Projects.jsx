import React from "react";
import "../styles/Projects.css";

const projects = [
  {
    title: "Btech Gamer",
    description: "A gamified coding platform with 1v1 and team battles.",
    link: "#",
  },
  {
    title: "Shopify",
    description: "An eCommerce website built with React and Firebase.",
    link: "#",
  },
  {
    title: "Joint Eye & Gaze Estimation",
    description: "A machine learning project using TensorFlow and CNN.",
    link: "#",
  },
];

const Projects = () => {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
