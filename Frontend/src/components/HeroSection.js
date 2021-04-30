/**
 * Hero Section Component
 * React components for the Homepage to display photos and info.
 */

import React from "react";
import "../App.css";
import "./HeroSection.css";

//define function for <HeroSection>
function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-banner">
        <h1>Start your journey</h1>
        <p>Discover your favourite trails.</p>
      </div>
    </div>
  );
}

export default HeroSection;
