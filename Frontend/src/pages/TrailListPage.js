import React, { Component } from "react";
import "../components/SearchBarComponent.css";
import SearchBar from "material-ui-search-bar";
import TrailList from "../components/TrailList";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
      "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/trails/get_all"
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
        <div className="trail-list-container">
          <div className="trail-header">
            <SearchBar
              value={this.state.keyword}
              onChange={(newValue) => this.setState({ keyword: newValue })}
              onRequestSearch={() => this.filterTrails(this.state.keyword)}
            />
            <div className="trail-button">
              <Link to="/new-trail">
                <Button content="New Trail" />
              </Link>
            </div>
          </div>

          <TrailList
            trailList={
              this.state.filteredList.length > 0
                ? this.state.filteredList
                : this.state.trailList
            }
          />
        </div>
      </>
    );
  }
}

export default TrailListPage;
