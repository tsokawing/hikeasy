import React, { Component } from "react";
import SearchBarComponent from "../components/SearchBarComponent";
import TrailList from "../components/TrailList";
import EmphasisButton from "../components/EmphasisButton";

import "./TrailListPage.css";

class TrailListPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
    };
  }

  componentDidMount() {
    //alllow cors to fetch ==> install cors extension for chrome
    fetch("http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all")
      .then((response) => response.json())
      .then((result) => {
        const trails = result.map((item) => {
          console.log(item);
          return item;
        });
        this.setState({ trailList: trails });
      });
  }

  render() {
    return (
      <>
        <div className="trail-header">
          <div className="trail-heading">
            <h1>Hiking Trails: </h1>
          </div>
          <div className="trail-button">
            <EmphasisButton />
          </div>
        </div>
        <SearchBarComponent />
        <TrailList trailList={this.state.trailList} />
      </>
    );
  }
}

export default TrailListPage;
