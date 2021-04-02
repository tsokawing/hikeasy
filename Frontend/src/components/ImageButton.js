import React from "react";
import "./ImageButton.css";
import { Link } from "react-router-dom";

const STYLES = ["image-btn--primary", "image-btn--outline", "image-btn--test"];

const SIZES = ["image-btn--medium", "image-btn--large"];

export const ImageButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/login" className="image-btn-mobile">
      <button
        className={`image-btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
