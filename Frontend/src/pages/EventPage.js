import React, { Component } from "react";
import ImageSection from "../components/ImageSection";
import Chats from "../components/Chats";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./EventPage.css";
import MapSection from "../components/MapSection";
import GallerySection from "../components/GallerySection";
import { SplitPane } from "react-collapse-pane";
import CalendarIcon from "react-calendar-icon";
import { ThemeProvider } from "styled-components";
import { Button, Comment } from "semantic-ui-react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import firebase from "firebase";
import http from "../http-common";

const calendarTheme = {
  calendarIcon: {
    textColor: "white", // text color of the header and footer
    primaryColor: "#0da472", // background of the header and footer
    backgroundColor: "#fafafa",
  },
};

class EventPage extends Component {
  constructor() {
    super();
    this.state = {
      event: [],
      showPane: false,
      Date: [],
      eventList: [],
      reviewList: [],
    };
  }

  loadComments = () => {
    var get_all = "http://18.188.120.239:8080/trails/get_all/";
    //   "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/trails/get_all/";

    var id = this.props.match.params.eventID;
    var get_review =
      "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/chat/get_all_by_event/" +
      id;

    // Get trail details request
    fetch(get_all)
      .then((response) => response.json())
      .then((result) => {
        const events = result.filter((item) => {
          if (item.id == id) {
            return item;
          }
        });
        this.setState({ eventList: events });
      });

    // Get reviews request
    fetch(get_review)
      .then((response) => response.json())
      .then((result) => {
        const reviews = result.response.map((item) => {
          return item;
        });
        this.setState({ reviewList: reviews });
        console.log(reviews);
      });

    console.log("RELOAD");
  };

  componentDidMount() {
    // this.loadComments();
    let get_event = "http://18.188.120.239:8080/events/get_specific/".concat(
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

  joinEvent = () => {
    console.log("upload");

    let formData = new FormData();
    let tState = this.state;

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        // Send token to backend via HTTPS
        console.log(idToken);

        // Post here
        http
          .post(
            "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/events/join_event/" +
              tState.event.id,
            formData,
            {
              headers: {
                authorization: "Bearer " + idToken,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log(response);
          });
      })
      .catch(function (error) {
        // Handle error
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="event-main">
          <SideNav
            onSelect={(selected) => {}}
            onToggle={() => {
              this.setState({ showPane: !this.state.showPane });
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  <i
                    class="fas fa-angle-right"
                    aria-hidden="true"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
              </NavItem>
            </SideNav.Nav>
            {this.state.showPane ? (
              <div className="event-pane">
                <div className="event-pane-title">{this.state.event.name}</div>
                <div className="pane-header">
                  <div className="pane-calendar">
                    <ThemeProvider theme={calendarTheme}>
                      <CalendarIcon date={new Date(this.state.event.time)} />
                    </ThemeProvider>
                  </div>
                  <div className="time-display">
                    {new Date(this.state.event.time).toLocaleTimeString()}
                  </div>
                </div>

                <div className="event-description">
                  {this.state.event.description}
                </div>

                <br></br>
                <Button onClick={this.joinEvent}>Join Event</Button>
                <br></br>
                <br></br>
                <div>Participants: </div>
                {this.state.event.participants.map((item) => (
                  <div className="event-participant">
                    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                    {item.firstName} {item.lastName}
                  </div>
                ))}
                <br></br>
                <div className="chat-session">
                  <Chats
                    reviews={this.state.reviewList}
                    reloadComments={this.loadComments}
                  />
                </div>
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
