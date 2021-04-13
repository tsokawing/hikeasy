import React, { Component } from "react";
import SearchBarComponent from "../components/SearchBarComponent";
import TrailList from "../components/TrailList";
import EmphasisButton from "../components/EmphasisButton";
import "./EventListPage.css";
import { SpringGrid } from "react-stonecutter";
import EventCard from "../components/EventCard";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
          <div className="event-heading">
            <h1>Hiking Events: </h1>
          </div>
          <div className="event-button">
            <EmphasisButton />
          </div>
        </div>

        <SearchBarComponent />
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
