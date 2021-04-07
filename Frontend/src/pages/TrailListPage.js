import React, { Component } from "react";
import "../components/SearchBarComponent.css";
import SearchBar from "material-ui-search-bar";
import TrailList from "../components/TrailList";
import EmphasisButton from "../components/EmphasisButton";

import "./TrailListPage.css";

class TrailListPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
      keyword: "",
      filteredList: [],
    };
  }

  componentDidMount() {
    //alllow cors to fetch ==> install cors extension for chrome
    fetch(
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all"
    )
      .then((response) => response.json())
      .then((result) => {
        const trails = result.map((item) => {
          return item;
        });
        this.setState({ trailList: trails });
      });
  }

  filterTrails = (keyword) => {
    let filteredList = this.state.trailList.filter((trailList) =>
      JSON.stringify(trailList)
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase())
    );
    this.setState({ filteredList: filteredList });
  };

  render() {
    return (
      <>
        <div className="trail-header">
          <div className="trail-heading">
            <h1>Hiking Trails: </h1>
          </div>
          <div className="trail-button">
            <EmphasisButton type="trail" />
          </div>
        </div>
        <SearchBar
          value={this.state.keyword}
          onChange={(newValue) => this.setState({ keyword: newValue })}
          onRequestSearch={() => this.filterTrails(this.state.keyword)}
        />
        <TrailList
          trailList={
            this.state.filteredList.length > 0
              ? this.state.filteredList
              : this.state.trailList
          }
        />
      </>
    );
  }
}

export default TrailListPage;
