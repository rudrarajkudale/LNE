import React, { useEffect, useState } from "react";
import "../styles/Teaching.css";
import SearchBar from './SearchBar';

const Teaching = () => {
  const [teaching, setTeaching] = useState([]);

  useEffect(() => {
    const fetchTeaching = async () => {
      try {
        const response = await fetch("/api/data/teaching");
        const data = await response.json();
        setTeaching(data);
      } catch (error) {
        console.error("Error fetching teaching data:", error);
      }
    };

    fetchTeaching();
  }, []);

  return (
    <div className="container mt-4">
      <SearchBar />
      <h2 className="text-center mb-4">Teaching</h2>
      <div className="row">
        {teaching.length > 0 ? (
          teaching.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card project-card">
                <img
                  src={item.imgSrc}
                  className="card-img-top project-image"
                  alt={item.title}
                />
                <div className="card-body project-details">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>

                  {/* Buttons Section */}
                  <div className="d-flex justify-content-between mt-3">
                    <a
                      href={item.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn live-demo-btn"
                    >
                      📚 View Resource
                    </a>
                    <button className="btn snapshot-btn">📸 Snapshot</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No teaching resources found.</p>
        )}
      </div>
    </div>
  );
};

export default Teaching;