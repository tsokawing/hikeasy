import React, { Component } from "react";
import "../App.css";
import { Button } from "./Button";
import "./ImageSection.css";

class ImageSection extends Component {
  render() {
    let trail = this.props.trail;

    console.log(trail);

    return (
      <div className="image-container">
        <h1>{trail ? trail.name : null}</h1>
        <p>{trail ? trail.description : null}</p>
        <div className="image-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageSection;
