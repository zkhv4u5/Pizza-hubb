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
          <h2>Welcome to Pizza Hub!</h2>
          <p>
          At Pizza-Hub, we believe that great pizza brings people together. We are a passionate team of pizza enthusiasts dedicated to serving delicious, handcrafted pizzas that satisfy your cravings and leave you wanting more!
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
          <Link to="/our-story">
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