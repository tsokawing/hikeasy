/**
 * Event List Page
 * List of events from the database will be displayed.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchBar from "material-ui-search-bar";
import "./EventListPage.css";
import { CSSGrid, measureItems, makeResponsive } from "react-stonecutter";
import EventCard from "../components/EventCard";
import LoadingOverlay from "react-loading-overlay";

// grid object for event cards formatting
const Grid = makeResponsive(measureItems(CSSGrid), {
  maxWidth: 1600,
  minPadding: 100,
});

class EventListPage extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      eventPhotoNames: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.loadEvents();
  }

  // get all events from server
  loadEvents = () => {
    fetch("http://3.143.248.67:8080/events/get_all")
      .then((response) => response.json())
      .then((result) => {
        const events = result.map((item) => {
          return item;
        });
        this.setState({ eventList: events }, this.loadEventPhotos);
        this.setState({ loading: false });
      });
  };

  // get all event photos from server
  loadEventPhotos = async function () {
    var fileNameList = [];

    // get image file name for a given event id
    let getImageFileOfSpecificEvent = async function (eventID) {
      return new Promise((resolve, reject) => {
        fetch("http://3.143.248.67:8080/events/get_photo/".concat(eventID))
          .then((response) => response.json())
          .then((result) => {
            const fileNameOfThisPhoto =
              result.photoFileNames[0]?.fileName ?? undefined;
            resolve(fileNameOfThisPhoto);
          })
          .catch((e) => {
            reject(e);
          });
      });
    };

    // wait until all events' image file names ready
    for (let index in this.state.eventList) {
      let currentEvent = this.state.eventList[index];
      let eventImageFileName = await getImageFileOfSpecificEvent(
        currentEvent.id
      );
      fileNameList.push(eventImageFileName);
    }

    // store the list of file names
    this.setState({ eventPhotoNames: fileNameList }, () => {});
  };

  render() {
    return (
      <>
        <div className="event-header">
          <SearchBar />
        </div>

        <LoadingOverlay
          active={this.state.loading}
          spinner={true}
          fadeSpeed={1}
          text="Loading..."
          styles={{
            overlay: (base) => ({
              ...base,
              background: "rgba(255, 0, 0, 0)",
            }),
          }}
        >
          <div className="grid-container animate__animated animate__fadeInUp">
            <Grid
              component="ul"
              columnWidth={350}
              gutterWidth={50}
              itemHeight={300}
            >
              {this.state.eventList.map((item, index) => (
                <div>
                  <Link to={`../event/${item.id}`}>
                    <EventCard event={this.state.eventList[index]} />
                  </Link>
                </div>
              ))}
            </Grid>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default EventListPage;
