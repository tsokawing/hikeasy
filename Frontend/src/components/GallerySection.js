/**
 * Gallery Section Component
 * React components for the gallery in the eventPage
 */

import React, { Component } from "react";
import Gallery from "react-grid-gallery";
import LoadingOverlay from "react-loading-overlay";

class GallerySection extends Component {
  constructor() {
    super();
    this.state = {
      imageList: [],
      dimensions: [],
      images: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.prepareImages();
  }

  // get trail image file names, then download images
  prepareImages = () => {
    fetch(
      "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/trails/get_trail_photos/" +
        this.props.trailID
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ imageList: result.photoFileNames }, () => {
          this.loadImages();
        });
      });
  };

  loadImages = async function () {
    // load images
    let images = [];
    for (let currentKey in this.state.imageList) {
      let item = this.state.imageList[currentKey];
      console.log(item);

      // for each, concat
      let get_photo =
        "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/image/";
      let source = get_photo.concat(item);

      let dummy = async function () {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => {
            console.log(`Dimensions ${img.width} x ${img.height}`);
            resolve([img.width, img.height]);
          };
          img.onerror = reject;
          img.src = source;
        });
      };
      let imageDimensions = undefined;
      try {
        imageDimensions = await dummy();
        console.log(imageDimensions);
        // hint: because of our enviromnemt config, it is possible that the db claims that a file exists but it actually doesnt exist
        // when that file does not exist, it wil GET 404, will call reject, so jhere we mut catch them

        images.push({
          src: source,
          thumbnail: source,
          thumbnailWidth: imageDimensions[0],
          thumbnailHeight: imageDimensions[1],
        });
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({ images: images }, () => {
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={true}
          fadeSpeed={1}
          text="Loading..."
          styles={{
            overlay: (base) => ({
              ...base,
              background: "rgba(255, 0, 0, 0)",
              height: "15vh",
            }),
          }}
        >
          <Gallery
            images={this.state.images}
            enableLightbox={true}
            margin={0}
          />
        </LoadingOverlay>
      </>
    );
  }
}
//export  <GallerySection>
export default GallerySection;
