import React, { Component } from "react";

class TrailList extends Component {
  render() {
    const trailItems = this.props.trailList.map((item) => (
      <>
        <div>Trail name: {item.trailName}</div>
        <div>Difficulty: {item.difficulty}</div>
        <div>Rating: {item.rating}</div>
        <div>Description: {item.description}</div>
      </>
    ));

    return <div>{trailItems}</div>;
  }
}

export default TrailList;
