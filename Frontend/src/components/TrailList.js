import React, { Component } from "react";
import TrailCard from "./TrailCard";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import "./TrailList.css";

class TrailList extends Component {
  render() {
    return (
      <div className="trail-list">
        {this.props.trailList.map((item) => (
          <Link to={`../trail/${item.id}`}>
            <TrailCard
              img="https://picsum.photos/id/1018/400/300"
              title={item.name}
              description={item.description}
              author="Admin"
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default TrailList;
