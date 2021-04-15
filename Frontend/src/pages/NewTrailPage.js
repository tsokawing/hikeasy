import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import UploadImages from "../components/UploadImages";
import MapSection from "../components/MapSection";
import "./NewTrailPage.css";

import LoadingOverlay from "react-loading-overlay";

// import { Button } from "semantic-ui-react";
import http from "../http-common";
import UploadService from "../services/upload-files.service";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
      trailID: "0",
      progress: 0,
      message: "",
      isError: false,
      submitDone: false,
      redirect: false,
      loading: false,
      color: "#ffffff",
    };
    this.waypointsRef = React.createRef();
    this.imageRef = React.createRef();
  }

  submitClicked = () => {
    this.setState({ loading: true });

    const currentWaypointsRef = this.waypointsRef.current;

    let formData = new FormData();
    formData.append("trailName", this.state.title.value);
    formData.append("trailDifficulty", this.state.difficulty.value);
    formData.append("trailDescription", this.state.description.value);
    formData.append("trailLength", this.state.length.value);
    formData.append("trailCity", this.state.city.value);

    http
      .post(
        "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/trails/add_trail",
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
          const trailID = response.data.message;
          console.log(trailID);

          //******************************************************
          // Upload photos and waypoints after creating a trail
          //******************************************************

          // Upload waypoint details
          // at the same time can set profile pic (below)

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
            .post(
              "http://3.143.248.67:8080/trails/update_trail/" + trailID,
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
              },
              (error) => {
                console.log(error);
              }
            );

          // Upload trail profile picture

          let imgFile = this.imageRef.current.state.currentFile;

          UploadService.uploadProfilePicForTrail(trailID, imgFile, (event) => {
            this.setState({
              progress: Math.round((100 * event.loaded) / event.total),
            });
          })
            .then((response) => {
              this.setState({
                message: response.data.message,
                isError: false,
              });
              this.submitDone();
              console.log(this.state.message);
            })
            .catch((err) => {
              this.setState({
                progress: 0,
                message: "Could not upload the image!",
                isError: true,
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  submitDone = () => {
    this.setState({ submitDone: true });
    this.setState({ loading: false });
  };

  handleClose = () => {
    this.setState({ submitDone: false });
    this.setState({ redirect: true });
  };

  render() {
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={true}
          text="Loading..."
        >
          <div className="newtrailpage-container">
            <div className="newtrail-info-section">
              <div className={"trail-map"}>
                <MapSection ref={this.waypointsRef} readOnly={false} />
              </div>
              <div className="info-section-right">
                <div className="newtrail-title">
                  <p>Click on the map to mark the waypoints of your trail!</p>
                </div>
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
                    type="number"
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
                  {/* <Button id="" name="" onClick={}>
                  Clear Waypoints
                </Button> */}
                </div>
                <div className="image-section">
                  <UploadImages
                    ref={this.imageRef}
                    submit={this.submitClicked}
                    trailID={this.state.trailID}
                  />
                </div>
              </div>
            </div>
            {/* <div onClick={this.submitClicked}>new trail page</div> */}
          </div>

          <Dialog open={this.state.submitDone}>
            <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your trail is ready!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </LoadingOverlay>
        {this.state.redirect ? <Redirect to="/trails" /> : null}
      </>
    );
  }
}

export default NewTrailPage;
