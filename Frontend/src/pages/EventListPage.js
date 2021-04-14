import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";
import "./EventListPage.css";
import { CSSGrid, measureItems, makeResponsive } from "react-stonecutter";
import EventCard from "../components/EventCard";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
    };
  }

  componentDidMount() {
    // Get events
    this.loadEvents();
  }

  loadEvents = () => {
    // load all events
    fetch("http://3.143.248.67:8080/events/get_all")
      .then((response) => response.json())
      .then((result) => {
        const events = result.map((item) => {
          return item;
        });
        this.setState({ eventList: events }, this.loadEventPhotos);
      });
  };

  loadEventPhotos = async function () {
    // load list of event photos' names
    var fileNameList = [];
    let getImageFileOfSpecificEvent = async function (eventID) {
      return new Promise((resolve, reject) => {
        fetch("http://3.143.248.67:8080/events/get_photo/".concat(eventID))
          .then((response) => response.json())
          .then((result) => {
            const fileNameOfThisPhoto =
              result.photoFileNames[0]?.fileName ?? undefined;
            resolve(fileNameOfThisPhoto);
            // console.log(fileNameList);
            // fileNameList = fileNameList.concat(fileNameOfThisPhoto);
          })
          .catch((e) => {
            reject(e);
          });
      });
    };
    for (let index in this.state.eventList) {
      let currentEvent = this.state.eventList[index];
      let eventImageFileName = await getImageFileOfSpecificEvent(
        currentEvent.id
      );
      fileNameList.push(eventImageFileName);
    }
    this.setState({ eventPhotoNames: fileNameList }, () => {
      // console.log(this.state.eventPhotoNames);
    });
  };

  render() {
    return (
      <>
        <div className="event-header">
          <SearchBar
          // value={this.state.keyword}
          // onChange={(newValue) => this.setState({ keyword: newValue })}
          // onRequestSearch={() => this.filterTrails(this.state.keyword)}
          />
          {/* <div className="event-button">
            <Link to="/new-event">
              <Button content="New Event" />
            </Link>
          </div> */}
        </div>

        {/* <SearchBarComponent /> */}
        <div className="grid-container">
          <Grid
            component="ul"
            // columns={3}
            columnWidth={350}
            gutterWidth={50}
            // gutterHeight={1}
            itemHeight={300}
            // springConfig={{ stiffness: 170, damping: 26 }}
          >
            {this.state.eventList.map((item, index) => (
              <div>
                {/* <Link to={`../event/${item.id}`}> */}
                <Link to={`../event/${item.id}`}>
                  <EventCard event={this.state.eventList[index]} />
                </Link>
              </div>
            ))}
          </Grid>
        </div>

        {/* <TrailList trailList={this.state.trailList} /> */}
      </>
    );
  }
}

export default EventListPage;
