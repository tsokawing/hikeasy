import React, { Component } from "react";
import SearchBarComponent from "../components/SearchBarComponent";
import TrailList from "../components/TrailList";
import EmphasisButton from "../components/EmphasisButton";
import "./EventListPage.css";

class EventListPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
    };
  }

  componentDidMount() {
    fetch("./trails.json")
      .then((response) => response.json())
      .then((result) => {
        const trails = result.map((item) => {
          return item;
        });
        this.setState({ trailList: trails });
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
        <TrailList trailList={this.state.trailList} />
      </>
    );
  }
}

export default EventListPage;
