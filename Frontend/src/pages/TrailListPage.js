import React, { Component } from "react";

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
    const trailItems = this.state.trailList.map((item) => (
      <>
        <div>Trail name: {item.trailName}</div>
        <div>Difficulty: {item.difficulty}</div>
        <div>Rating: {item.rating}</div>
        <div>Description: {item.description}</div>
      </>
    ));

    return (
      <>
        <h1>Trails Results:</h1>
        {trailItems}
      </>
    );
  }
}

export default TrailListPage;
