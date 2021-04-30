/**
 * Chats Component
 * React components for the chatbox in events section.
 */

import React, { Component } from "react";

import "./Chats.css";
import { Button, Comment, Form, Header } from "semantic-ui-react";

import firebase from "firebase";
import firebaseJwtManager from "../firebaseJwtManager";
import http from "../http-common";
//export the component
class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComments: [],
    };
  }
  handleChange = (e, { value }) => {
    this.setState({ newComments: value });
  };

  // post comment to server
  postComment = () => {
    let formData = new FormData();
    formData.append("comment", this.state.newComments);

    let tProps = this.props;
    let commentSectionReloadComments = () => {
      console.log("reload");
      tProps.reloadComments();
    };

    // get JWT for backend verification
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        // send token to backend via HTTP
        http
          .post(
            "http://ec2-3-143-248-67.us-east-2.compute.amazonaws.com:8080/chat/publish_chat/" +
              tProps.eventID,
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
            commentSectionReloadComments();
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //try to render out the <Comment> to make chatbox
  render() {
    let reviews = this.props.reviews;
    return (
      <Comment.Group>
        <div className="comment-display-section">
          <Header as="h3" dividing>
            Chats
          </Header>
          {reviews.map((item) => (
            <div className="review-block">
              <Comment>
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
                <Comment.Content>
                  <Comment.Author as="a">
                    {item.user.firstName} {item.user.lastName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{item.comment}</Comment.Text>
                </Comment.Content>
              </Comment>
            </div>
          ))}
        </div>
        {firebaseJwtManager.getToken() ? (
          <Form clasName="add-comment">
            <Form.Group>
              <Form.TextArea
                placeholder="Start Chatting!"
                name="name"
                onChange={this.handleChange}
              />
              <div className="comment-buttons">
                <Button content="Post" onClick={this.postComment} />
              </div>
            </Form.Group>
          </Form>
        ) : null}
      </Comment.Group>
    );
  }
}
//export Chats class
export default Chats;
