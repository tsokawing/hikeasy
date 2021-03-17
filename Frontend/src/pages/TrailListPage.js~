import React, { Component } from "react";
import TrailList from "../components/TrailList";

class TrailListPage extends Component {
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
        <h1>Trails Results:</h1>
        <TrailList trailList={this.state.trailList} />
      </>
    );
  }
}

export default TrailListPage;
