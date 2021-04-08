import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import UploadImages from "../components/UploadImages";
import MapSection from "../components/MapSection";
import "./NewTrailPage.css";

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
  }

  clicked = () => {
    console.log(this.state.title.value);
    console.log(this.state.difficulty.value);
  };

  render() {
    return (
      <>
        <div className="newtrailpage-container">
          <div className="newtrail-info-section">
            <div className={"trail-map"}>
              <MapSection />
            </div>
            <div className="info-section-right">
              <div className="newtrail-details">
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.title = c;
                  }}
                  label="Required"
                  defaultValue="Title"
                />
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.description = c;
                  }}
                  label="Required"
                  defaultValue="Description"
                />
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.length = c;
                  }}
                  label="Required"
                  defaultValue="Length"
                />
                <TextField
                  required
                  id="standard-required"
                  inputRef={(c) => {
                    this.state.city = c;
                  }}
                  label="Required"
                  defaultValue="City"
                />
                <TextField
                  id="standard-select-difficulty"
                  select
                  label="Select"
                  value={this.difficulty}
                  inputRef={(c) => {
                    this.state.difficulty = c;
                  }}
                  onChange={this.clicked}
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
                <UploadImages />
              </div>
            </div>
          </div>
          <div onClick={this.clicked}>new trail page</div>
        </div>
      </>
    );
  }
}

export default NewTrailPage;
