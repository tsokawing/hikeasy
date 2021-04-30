/**
 * Image Button Component
 * React components for the trail page to add button in the ImageSection
 */

import React from "react";
import "./ImageButton.css";

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
