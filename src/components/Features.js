import React from 'react';
import './Features.css';

const features = [
  { title: "Easy Setup", description: "Get started in minutes with our easy onboarding process." },
  { title: "24/7 Support", description: "We are here to assist you anytime you need help." },
  { title: "Analytics Dashboard", description: "Track your progress with real-time analytics and reports." }
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="container text-center">
        <h2 className="features-title">Features</h2>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4 feature-item">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
