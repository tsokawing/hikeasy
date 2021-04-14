import React, { Component } from "react";
import ImageSection from "../components/ImageSection";
import Comments from "../components/Comments";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./TrailPage.css";
import MapSection from "../components/MapSection";
import GallerySection from "../components/GallerySection";

// New event form dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import http from "../http-common";

class TrailPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
      reviewList: [],
      showGallery: false,
      showEventForm: false,
      name: [],
      description: [],
      date: [],
      images: [],
      dimensions: [],
      imageList: [],
    };
  }

  // Handle new event dialog
  handleClickOpen = () => {
    // setOpen(true);
    this.setState({ showEventForm: true });
  };

  handleClose = () => {
    // setOpen(false);
    this.setState({ showEventForm: false });
  };

  submitEvent = () => {
    // Get form data

    console.log(this.state.name.value);
    console.log(this.state.date.value);
    console.log(this.state.description.value);
    console.log(this.state.trailList[0].id);

    let formData = new FormData();
    formData.append("eventName", this.state.name.value);
    formData.append("eventDescription", this.state.description.value);
    formData.append("eventTime", this.state.date.value);
    formData.append("trailID", this.state.trailList[0].id);
    formData.append("userID", 2);
    console.log("upload");

    http
      .post(
        //deafault second user id : 2
        "http://18.188.120.239:8080/events/add_event/",
        formData,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  // Load trail info

  loadComments = () => {
    var get_all = "http://18.188.120.239:8080/trails/get_all/";
    //   "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all/";

    var id = this.props.match.params.trailID;
    var get_review = "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/review/get_all_by_trail/".concat(
      id
    );

    // Get trail details request
    fetch(get_all)
      .then((response) => response.json())
      .then((result) => {
        const trails = result.filter((item) => {
          if (item.id == id) {
            return item;
          }
        });
        this.setState({ trailList: trails });
      });

    // Get reviews request
    fetch(get_review)
      .then((response) => response.json())
      .then((result) => {
        const reviews = result.response.map((item) => {
          return item;
        });
        this.setState({ reviewList: reviews });
      });

    console.log("RELOAD");
  };

  componentDidMount() {
    this.loadComments();
  }

  toggleGallery = () => {
    this.state.showGallery
      ? this.setState({ showGallery: false })
      : this.setState({ showGallery: true });
  };

  render() {
    return (
      <>
        <ImageSection
          newEvent={this.handleClickOpen}
          trail={this.state.trailList[0]}
          ref={this.imageSectionRef}
          toggleGallery={this.toggleGallery}
          showGallery={this.state.showGallery}
        />
        {this.state.showGallery ? (
          <GallerySection
            images={this.state.images}
            trailID={this.state.trailList[0].id}
          />
        ) : (
          <div className={"trail-main-section"}>
            <div>
              <div className={"trail-map"}>
                {this.state.trailList.length > 0 ? (
                  <MapSection trail={this.state.trailList[0]} />
                ) : null}
              </div>
            </div>
            <div className={"comment-section"}>
              <Comments
                trail={this.state.trailList[0]}
                reviews={this.state.reviewList}
                reloadComments={this.loadComments}
              />
            </div>
          </div>
        )}
        <Dialog
          open={this.state.showEventForm}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the event details !!!!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Event Name"
              inputRef={(c) => {
                this.state.name = c;
              }}
              fullWidth
            />
            <TextField
              id="datetime-local"
              label="Event Date"
              type="datetime-local"
              // defaultValue={new Date()}
              className={"datetime-picker"}
              inputRef={(c) => {
                this.state.date = c;
              }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Discription"
              // type="email"
              fullWidth
              inputRef={(c) => {
                this.state.description = c;
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitEvent} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default TrailPage;
