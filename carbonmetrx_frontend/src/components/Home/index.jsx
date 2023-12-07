// src/components/Home/Home.jsx
import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div class = "body">
      <h1>Welcome to CarbonMetrX!</h1>
      <p>
        CarbonMetrX is your go-to platform for managing and analyzing carbon emissions.
        Track your environmental impact and make informed decisions for a sustainable future.
      </p>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li>Real-time carbon footprint tracking</li>
          <li>Data visualization and analytics</li>
          <li>Personalized recommendations for reducing emissions</li>
        </ul>
      </section>

      <section>
        <h2>Why Choose CarbonMetrX?</h2>
        <p>
          Our platform empowers individuals and businesses to take control of their carbon
          footprint. Join us in building a greener and more sustainable world.
        </p>
      </section>
    </div>
  );
};

export default Home;