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
import CalendarIcon from "react-calendar-icon";
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
      event: [],
      showPane: false,
      Date: [],
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
  };

  componentDidMount() {
    // this.loadComments();
    let get_event = "http://localhost:8080/events/get_specific/".concat(
      this.props.match.params.eventID
    );

    fetch(get_event)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ event: result.response });
        const timestring = new Date(this.state.event.time);
        const dateobj = [];
        timestring.getDate();
        timestring.getTime();
        this.setState({ Date: timestring.toString() });
      });
  }

  render() {
    return (
      <>
        <div className="event-main">
          <SideNav
            onSelect={(selected) => {
              // Add your code here
            }}
            onToggle={() => {
              this.setState({ showPane: !this.state.showPane });
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  <i
                    class="fa fa-calendar"
                    aria-hidden="true"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                {/* <NavText>
                  <div class="event-pane">
                    <div>Test</div>
                    <div>{this.state.event.name}</div>
                    <p className="event-description">
                      {this.state.event.description}
                    </p>
                    <div>{this.state.event.time}</div>
                  </div>
                </NavText> */}
              </NavItem>
            </SideNav.Nav>
            {this.state.showPane ? (
              <div class="event-pane">
                <div>Test</div>
                <div>{this.state.event.name}</div>
                <div className="event-description">
                  {this.state.event.description}
                </div>
                <CalendarIcon date={new Date(this.state.event.time)} />
              </div>
            ) : null}
          </SideNav>
          <div className={"event-trail-map"}>
            {this.state.event["trail"] ? (
              <MapSection trail={this.state.event["trail"]} />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default EventPage;
