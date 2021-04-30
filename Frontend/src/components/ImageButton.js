/*	
	What: This is used to add style to the <ImageButton>, the button on the image of trail page and defiine the functionality of it
	Who: Tso Ka Wing 1155125488
	Where: React components for the trail page to add button in the ImageSection
	Why: We need to define how the button handling with the clicking action and define style 
	How: import css style for the  <ImageButton>
*/
import React from "react";
import "./ImageButton.css";
import { Link } from "react-router-dom";
const STYLES = ["image-btn--primary", "image-btn--outline", "image-btn--test"];
const SIZES = ["image-btn--medium", "image-btn--large"];

export const ImageButton = ({
  children,
  type,
  buttonStyle,
  buttonSize,
  eventClicked,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`image-btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={eventClicked}
      type={type}
    >
      {children}
    </button>
    // </Link>
  );
};
