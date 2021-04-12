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
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src:
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_photo/2-1618213098554-1.jpg",
    thumbnail:
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_photo/2-1618213098554-1.jpg",
    thumbnailWidth: 720,
    thumbnailHeight: 212,
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
    fetch(
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_trail_photos/2"
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
