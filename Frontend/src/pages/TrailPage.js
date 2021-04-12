import React, { Component } from "react";
import ImageSection from "../components/ImageSection";
import Comments from "../components/Comments";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./TrailPage.css";
import MapSection from "../components/MapSection";
import GallerySection from "../components/GallerySection";

class TrailPage extends Component {
  constructor() {
    super();
    this.state = {
      trailList: [],
      reviewList: [],
      showGallery: false,
    };
  }

  componentDidMount() {
    // Allow cors to fetch ==> install cors extension for chrome

    var get_all = "http://localhost:8080/trails/get_all/";
    // var get_all =
    //   "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all/";

    var id = this.props.match.params.trailID;
    var get_review = "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/review/get_all_by_trail/".concat(
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

  toggleGallery = () => {
    this.state.showGallery
      ? this.setState({ showGallery: false })
      : this.setState({ showGallery: true });
  };

  render() {
    return (
      <>
        <ImageSection
          trail={this.state.trailList[0]}
          ref={this.imageSectionRef}
          toggleGallery={this.toggleGallery}
          showGallery={this.state.showGallery}
        />
        {this.state.showGallery ? (
          <GallerySection />
        ) : (
          <div className={"trail-main-section"}>
            <div>
              <div className={"trail-map"}>
                {this.state.trailList.length > 0 ? (
                  <MapSection trail={this.state.trailList[0]} />
                ) : null}
              </div>
            </div>
            <div className={"comment-section"}>
              <Comments reviews={this.state.reviewList} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default TrailPage;
