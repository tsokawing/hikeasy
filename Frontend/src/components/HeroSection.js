/*	
	What: This is used to add style to the <HeroSection>, the homepage main component and defiine the functionality of it
	Who: Tso Ka Wing 1155125488
	Where: React components for the Homepage to display photos and info
	Why: We need to define how the text and photo are displayed in the <HeroSection>
	How: import css style for the  <HeroSection>
*/

import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

//define function for <HeroSection>
function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-banner">
        <h1>Start your journey</h1>
        <p>Discover your favourite trails.</p>
        {/* <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default HeroSection;
