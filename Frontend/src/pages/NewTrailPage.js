import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import UploadImages from "../components/UploadImages";
import MapSection from "../components/MapSection";
import "./NewTrailPage.css";
import http from "../http-common";

const difficulties = [
  {
    value: "5",
    label: "Expert",
  },
  {
    value: "4",
    label: "Advanced",
  },
  {
    value: "3",
    label: "Intermediate",
  },
  {
    value: "2",
    label: "Elementary",
  },
  {
    value: "1",
    label: "Beginner",
  },
];

class NewTrailPage extends Component {
  constructor() {
    super();
    this.state = {
      title: [],
      description: [],
      length: [],
      city: [],
      difficulty: "1",
    };
    this.waypointsRef = React.createRef();
  }

  submitClicked = () => {
    // console.log(this.state.title.value);
    // console.log(this.state.description.value);
    // console.log(this.state.length.value);
    // console.log(this.state.city.value);
    // console.log(this.state.difficulty.value);
    const currentWaypointsRef = this.waypointsRef.current;
    // console.log(currentWaypointsRef.state.point);
    let formData = new FormData();
    formData.append("trailName", this.state.title.value);
    formData.append("trailDifficulty", this.state.difficulty.value);
    formData.append("trailDescription", this.state.description.value);
    console.log("upload");

    http
      .post(
        "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/add_trail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(
        (response) => {
          console.log(response);

          //******************************************************
          // Upload photos and waypoints after creating a trail
          //******************************************************

          let formData = new FormData();
          formData.append("trailName", this.state.title.value);
          formData.append("trailDifficulty", this.state.difficulty.value);
          formData.append("trailDescription", this.state.description.value);
          formData.append("isVerified", 1);
          formData.append("isShown", 1);
          var polyline = require("@mapbox/polyline");

          formData.append(
            "waypoints",
            polyline.encode(currentWaypointsRef.state.point, 6)
          );

          http
            .post("http://localhost:8080/trails/update_trail/2", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <>
        <div className="newtrailpage-container">
          <div className="newtrail-info-section">
            <div className={"trail-map"}>
              <MapSection ref={this.waypointsRef} />
            </div>
            <div className="info-section-right">
              <div className="newtrail-details">
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.title = c;
                  }}
                  label="Title"
                  // defaultValue="Title"
                />
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.description = c;
                  }}
                  label="Description"
                  // defaultValue="Description"
                />
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.length = c;
                  }}
                  label="Length"
                  // defaultValue="Length"
                />
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.city = c;
                  }}
                  label="City"
                  // defaultValue="City"
                />
                <TextField
                  id="standard-select-difficulty"
                  select
                  label="Difficulty"
                  value={this.difficulty}
                  inputRef={(c) => {
                    this.state.difficulty = c;
                  }}
                  // onChange={this.clicked}
                  helperText="Please select your difficulty"
                >
                  {difficulties.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="image-section">
                <UploadImages submit={this.submitClicked} />
              </div>
            </div>
          </div>
          {/* <div onClick={this.submitClicked}>new trail page</div> */}
        </div>
      </>
    );
  }
}

export default NewTrailPage;
