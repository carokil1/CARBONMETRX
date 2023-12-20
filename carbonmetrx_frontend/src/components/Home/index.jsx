// src/components/Home/Home.jsx
import React from 'react';
import './Home.css'; // Import the CSS file
import '../../styles/app.css';  // Go up two levels to reach the 'styles' folder

const Home = () => {
  return (
    <main className="home-container">
      <div className="background">
        <img src='/background.png' alt="Background" />
        <div className="welcome">Welcome to CarbonMetrX!</div>
        <div className="paragraph">
          <p>CarbonMetrX is your go-to platform for managing and analyzing carbon emissions.
          Track your environmental impact and make informed decisions for a sustainable future.</p>
        </div>
        <section>
          <div className="heading">
            <h>Key Features</h>
          </div>
          <div className="list">
            <ul>Real-time carbon footprint tracking</ul>
            <ul>Data visualization and analytics</ul>
            <ul>Personalized recommendations for reducing emissions</ul>
          </div>  
        </section>

        <section>
            <div className="heading">Why Choose CarbonMetrX?</div>
            <div className="paragraph">
              <p>Our platform empowers individuals and businesses to take control of their carbon
              footprint. Join us in building a greener and more sustainable world.</p>
            </div>
        </section>
      </div>
    </main>
  );
};

export default Home;