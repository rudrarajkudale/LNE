import React from "react";
import "../styles/Teaching.css";

const courses = [
  {
    title: "Data Structures & Algorithms",
    description: "Learn DSA concepts with problem-solving techniques.",
    link: "#",
  },
  {
    title: "Full Stack Development",
    description: "Master frontend and backend development with hands-on projects.",
    link: "#",
  },
  {
    title: "Computer Networking",
    description: "Understand networking protocols, routing, and security.",
    link: "#",
  },
];

const Teaching = () => {
  return (
    <div className="teaching-container">
      <h1>Teaching & Courses</h1>
      <div className="teaching-grid">
        {courses.map((course, index) => (
          <div key={index} className="teaching-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <a href={course.link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teaching;
