import React, { Component } from "react";
import "../App.css";
import { ImageButton } from "./ImageButton";
import "./ImageSection.css";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

class ImageSection extends Component {
  render() {
    let trail = this.props.trail;
    return (
      <div className="image-container">
        <div className="image-inner-container">
          <h1 className="image-header">{trail ? trail.name : null}</h1>
          <p className="image-description">
            {trail ? trail.description : null}
          </p>
          <div className="image-btn-container">
            <div className="trail-info-container">
              <Typography component="legend">Difficulty</Typography>
              <Rating
                name="read-only"
                value={trail ? trail.difficulty : 0}
                size="large"
                readOnly
              />
              <p class="trail-info">Shatin, NT 28KM</p>
            </div>

            <div className="image-btns">
              <ImageButton
                className="image-btns"
                buttonStyle="image-btn--outline"
                buttonSize="image-btn--large"
              >
                LIKE
              </ImageButton>
              <ImageButton
                className="image-btns"
                buttonStyle="image-btn--outline"
                buttonSize="image-btn--large"
              >
                SHARE
              </ImageButton>
              <ImageButton
                className="image-btns"
                buttonStyle="image-btn--outline"
                buttonSize="image-btn--large"
              >
                RATE
              </ImageButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageSection;
