import React, { Component } from "react";
import ImageSection from "../components/ImageSection";
import Comments from "../components/Comments";

class TrailPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
      reviewList: [],
    };
  }

  componentDidMount() {
    // Allow cors to fetch ==> install cors extension for chrome

    var get_all =
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all/";

    var id = this.props.match.params.trailID;
    var get_review = "http://localhost:8080/review/get_all_by_trail/".concat(
      id
    );

    // Get trail details request
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

    // Get reviews request
    fetch(get_review)
      .then((response) => response.json())
      .then((result) => {
        const reviews = result.response.map((item) => {
          return item;
        });
        this.setState({ reviewList: reviews });
      });
  }

  render() {
    return (
      <>
        <ImageSection trail={this.state.trailList[0]} />
        <Comments reviews={this.state.reviewList} />
      </>
    );
  }
}

export default TrailPage;
