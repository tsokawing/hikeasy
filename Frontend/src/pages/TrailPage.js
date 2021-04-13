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

class TrailPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
      reviewList: [],
      showGallery: false,
      showEventForm: false,
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

  // Load trail info

  loadComments = () => {
    var get_all = "http://localhost:8080/trails/get_all/";
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
          trail={this.state.trailList[0]}
          ref={this.imageSectionRef}
          toggleGallery={this.toggleGallery}
          showGallery={this.state.showGallery}
        />
        {this.state.showGallery ? (
          <GallerySection />
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
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Event Name"
              // type="email"
              // fullWidth
            />
            <TextField
              id="datetime-local"
              class="primary"
              // label="Next appointment"
              type="datetime-local"
              // defaultValue={new Date()}
              className={"datetime-picker"}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Discription"
              // type="email"
              // fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open form dialog
        </Button>
      </>
    );
  }
}

export default TrailPage;
