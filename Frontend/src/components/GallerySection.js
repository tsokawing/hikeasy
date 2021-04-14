import React, { Component } from "react";
import Gallery from "react-grid-gallery";

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
];

class GallerySection extends Component {
  constructor() {
    super();
    this.state = {
      imageList: [],
      dimensions: [],
      images: [],
    };
  }
  componentDidMount() {
    console.log(this.props.trailID);

    fetch(
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_trail_photos/" +
        this.props.trailID
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ imageList: result.photoFileNames }, () => {
          this.loadImages();
        });
      });
  }

  loadImages = async function () {
    // load images
    let images = [];
    for (let currentKey in this.state.imageList) {
      let item = this.state.imageList[currentKey];
      console.log(item);

      // for each, concat
      let get_photo =
        "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_photo/";
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
      // we have already set the state
    });
  };

  render() {
    return (
      <>
        <Gallery
          images={this.state.images}
          enableLightbox={true}
          // maxRows={3}
          margin={0}
          backdropClosesModal
          // currentImage={3}
          // isOpen={ true}
        />
      </>
    );
  }
}

export default GallerySection;
