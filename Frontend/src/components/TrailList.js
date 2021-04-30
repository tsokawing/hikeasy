/**
 * Trail List Component
 * Return a list of trail cards.
 */

import React, { Component } from "react";
import TrailCard from "./TrailCard";
import { BrowserRouter as Link } from "react-router-dom";
import "./TrailList.css";

class TrailList extends Component {
  render() {
    return (
      <div className="trail-list">
        {this.props.trailList.map((item) => (
          <Link to={`../trail/${item.id}`}>
            <TrailCard
              img={
                item.profilePic != null
                  ? "http://3.143.248.67:8080/image/".concat(item.profilePic)
                  : "https://picsum.photos/id/1018/400/300"
              }
              title={item.name}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default TrailList;
