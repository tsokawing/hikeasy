import React, { Component } from "react";
import HeroSection from "../components/HeroSection";

class TrailPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
    };
  }

  componentDidMount() {
    // allow cors to fetch ==> install cors extension for chrome

    var get_all =
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all/";

    var str1 =
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_specific/";
    var id = this.props.match.params.trailID;
    var link = str1.concat(id);
    fetch(get_all)
      .then((response) => response.json())
      .then((result) => {
        const trails = result.filter((item) => {
          if (item.id == id) {
            return item;
          }
        });
        this.setState({ trailList: trails });
      });
  }

  render() {
    if (this.state.trailList.length > 0) {
      console.log(this.state.trailList[0].id);
    }

    return (
      <div>
        {this.state.trailList.length > 0
          ? this.state.trailList[0].id
          : "LOADING"}
      </div>
    );
  }
}

export default TrailPage;
