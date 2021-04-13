import React, { Component } from "react";
import ImageSection from "../components/ImageSection";
import Comments from "../components/Comments";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./EventPage.css";
import MapSection from "../components/MapSection";
import GallerySection from "../components/GallerySection";
import { SplitPane } from "react-collapse-pane";
import { Button } from "semantic-ui-react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

class EventPage extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      reviewList: [],
    };
  }

  loadComments = () => {
    var get_all = "http://localhost:8080/trails/get_all/";
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

    console.log("RELOAD");
  };

  componentDidMount() {
    // this.loadComments();
  }

  render() {
    return (
      <>
        <div className="event-main">
          <SideNav
            onSelect={(selected) => {
              // Add your code here
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText>
                  <div>A div here...</div>
                </NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
          <div className={"event-trail-map"}>
            {
              <MapSection
                trail={{
                  id: 2,
                  name: "Trail 22",
                  difficulty: 3,
                  description: "wefowej",
                  isVerified: true,
                  profilePic: "1-1617525286566-0.jpg",
                  isShown: true,
                  waypoints:
                    "mxnoi@mozuxE`s@afH|pAajAhZg}Ccx@mbC`}@akFh}AimDnlCylA|fA}~L",
                  createdAt: "2021-03-17T00:28:36.744Z",
                  updatedAt: "2021-04-11T01:00:31.000Z",
                  deletedAt: null,
                }}
              />
            }
          </div>
        </div>
      </>
    );
  }
}

export default EventPage;
