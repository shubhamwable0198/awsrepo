import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container text-center" >
        <h1 className="hero-title text-black">Welcome to StartupSprint</h1>
        <p className="hero-description text-black">
          Accelerate your business with innovative tools for growth and productivity.
        </p>
        <a href="#get-started" className="btn btn-light btn-lg hero-btn">
          Get Started for Free
        </a>
      </div>
    </section>
  );
};

export default Hero;
