import React, { Component } from "react";
import "./TrailCard.css";

class TrailCard extends Component {
  render() {
    return (
      <div className="trail-card">
        <div className="trail-card-profile">
          <img className="trail-card-pic" src={this.props.img} />
        </div>
        <div className="trail-card-body">
          <h2>{this.props.title}</h2>
          <p>{this.props.description}</p>
          <h5>{this.props.author}</h5>
        </div>
      </div>
    );
  }
}

export default TrailCard;
