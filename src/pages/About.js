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
          <h2>About us</h2>
          <p>
            A small introduction of the restaurant (WORK IN PROGRESS)
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
          <Link to="/about-us">
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