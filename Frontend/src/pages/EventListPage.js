import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";
import "./EventListPage.css";
import { SpringGrid } from "react-stonecutter";
import EventCard from "../components/EventCard";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EventListPage extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/events/get_all")
      .then((response) => response.json())
      .then((result) => {
        const events = result.map((item) => {
          return item;
        });
        this.setState({ eventList: events }, () => {});
      });
  }

  render() {
    return (
      <>
        <div className="event-header">
          <SearchBar
          // value={this.state.keyword}
          // onChange={(newValue) => this.setState({ keyword: newValue })}
          // onRequestSearch={() => this.filterTrails(this.state.keyword)}
          />
          <div className="event-button">
            <Link to="/new-event">
              <Button content="New Event" />
            </Link>
          </div>
        </div>

        {/* <SearchBarComponent /> */}
        <div className="grid-container">
          <SpringGrid
            component="ul"
            columns={3}
            columnWidth={350}
            gutterWidth={50}
            // gutterHeight={1}
            itemHeight={350}
            // springConfig={{ stiffness: 170, damping: 26 }}
          >
            {this.state.eventList.map((item) => (
              <div>
                {/* <Link to={`../event/${item.id}`}> */}
                <Link to={`../event/${item.id}`}>
                  <EventCard eventList={this.state.eventList[0]} />
                </Link>
              </div>
            ))}
          </SpringGrid>
        </div>

        {/* <TrailList trailList={this.state.trailList} /> */}
      </>
    );
  }
}

export default EventListPage;
