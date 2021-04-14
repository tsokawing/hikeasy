import React, { Component } from "react";
import "../App.css";
import { ImageButton } from "./ImageButton";
import "./ImageSection.css";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Toggle from "react-toggle";

class ImageSection extends Component {
  render() {
    let trail = this.props.trail;

    let getPhoto = "http://18.188.120.239:8080/trails/get_photo/";
    let defaultBackground =
      "https://cdn1.i-scmp.com/sites/default/files/images/methode/2017/05/02/35cc35e2-2a41-11e7-acff-d77f13c4971d_image_hires_150136.JPG";
    // "https://cdn1.i-scmp.com/sites/default/files/images/methode/2017/05/02/35cc35e2-2a41-11e7-acff-d77f13c4971d_image_hires_150136.JPG";
    let Background = this.props.trail
      ? this.props.trail.profilePic
        ? getPhoto.concat(this.props.trail.profilePic)
        : defaultBackground
      : defaultBackground;
    return (
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
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
              <p class="trail-info">
                {trail ? trail.city : "Shatin"}, {trail ? trail.length : "28"}KM
              </p>
            </div>
            <div className="image-btns">
              <ImageButton
                className="image-btns"
                buttonStyle="image-btn--outline"
                buttonSize="image-btn--large"
                eventClicked={this.props.newEvent}
                // onClick={this.props.newEvent}
              >
                EVENT
              </ImageButton>
              <ImageButton
                eventClicked={this.props.pageUrlCopier}
                className="image-btns"
                buttonStyle="image-btn--outline"
                buttonSize="image-btn--large"
              >
                SHARE
              </ImageButton>
              <ImageButton
                eventClicked={this.props.rateClicked}
                className="image-btns"
                buttonStyle="image-btn--outline"
                buttonSize="image-btn--large"
              >
                RATE
              </ImageButton>
            </div>
          </div>
        </div>
        <div className={"gallery-toggle-section"}>
          <p className={"toggle-title"}>Show photos</p>
          <label>
            <Toggle
              defaultChecked={this.props.showGallery}
              icons={false}
              onChange={this.props.toggleGallery}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ImageSection;
