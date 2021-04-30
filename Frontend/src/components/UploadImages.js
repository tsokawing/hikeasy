/**
 * Upload Images Component
 * For user to upload images, with image preview.
 */

import React, { Component } from "react";
import { Typography, Button, ListItem } from "@material-ui/core";

export default class UploadImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      progress: 0,
      message: "",
      isError: false,
      imageInfos: [],
    };
  }

  selectFile = (event) => {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: "",
    });
  };

  submit = () => {
    this.props.submit();
  };

  upload = (trailID) => {
    this.setState({
      progress: 0,
    });
  };

  render() {
    const {
      currentFile,
      previewImage,
      message,
      imageInfos,
      isError,
    } = this.state;

    return (
      <div className="mg20">
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={this.selectFile}
          />
          <Button className="btn-choose" variant="outlined" component="span">
            Choose Image
          </Button>
        </label>

        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!currentFile}
          onClick={this.submit}
        >
          Submit
        </Button>

        {previewImage && (
          <div>
            <img className="preview my20" src={previewImage} alt="" />
          </div>
        )}

        {message && (
          <Typography
            variant="subtitle2"
            className={`upload-message ${isError ? "error" : ""}`}
          >
            {message}
          </Typography>
        )}

        <ul className="list-group">
          {imageInfos &&
            imageInfos.map((image, index) => (
              <ListItem divider key={index}>
                <img
                  src={image.url}
                  alt={image.name}
                  height="80px"
                  className="mr20"
                />
                <a href={image.url}>{image.name}</a>
              </ListItem>
            ))}
        </ul>
      </div>
    );
  }
}
