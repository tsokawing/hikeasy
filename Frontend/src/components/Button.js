/*	
	What: This is used to add style to the <Button> and defiine the functionality of it 
	Who: Tso Ka Wing 1155125488
	Where: React component
	Why: We need to set up standard style for the button, so we have to define the style in /componenet directory
	How: import css style for the button componenet 
	*/

//imports
import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
//standard styles
const STYLES = ["btn--primary", "btn--outline", "btn--test"];
//standard sizes
const SIZES = ["btn--medium", "btn--large"];

//export the Button to HikEasy
export const Button = ({
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
  //returning the <Button>
  return (
    // <Link to="/login" className="btn-mobile">
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
    // </Link>
  );
};
