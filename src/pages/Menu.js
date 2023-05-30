import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function HomePage() {
  return (
    <div className="wrapper">
      <section className="sliced">
      </section>
      <div className="background-image">
        <div className="content">
          <h2>Menu</h2>
          <p>
            
          </p>
          
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Link to="/OurStory">
            <button className="btn btn-primary">
              <span className="btn-text">Our Story</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;