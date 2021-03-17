import React, { Component } from "react";
import TrailCard from "./TrailCard";
import "./TrailList.css";

class TrailList extends Component {
  render() {
    return (
      <div className="trail-list">
        {this.props.trailList.map((item) => (
          <TrailCard
            img="https://picsum.photos/id/1018/400/300"
            title={item.trailName}
            description={item.description}
            author="Admin"
          />
        ))}
      </div>
    );
  }
}

export default TrailList;
