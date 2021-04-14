import React, { Component } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import firebase from "firebase";
import "./Chats.css";
import http from "../http-common";

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

  postComment = () => {
    let formData = new FormData();
    formData.append("comment", this.state.newComments);

    let tProps = this.props;
    let commentSectionReloadComments = () => {
      console.log("reload");
      tProps.reloadComments();
    };

    // Get JWT for backend verification
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        // Send token to backend via HTTPS

        // Post here
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
        // Handle error
        console.log(error);
      });
  };

  render() {
    let reviews = this.props.reviews;
    console.log(reviews);
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
                  {/* <Comment.Actions>
                  <Comment.Action> Reply </Comment.Action>
                </Comment.Actions> */}
                </Comment.Content>
              </Comment>
            </div>
          ))}
        </div>
        <Form clasName="add-comment">
          <Form.Group>
            <Form.TextArea
              placeholder="Start Chatting!"
              name="name"
              // value={coommen}
              onChange={this.handleChange}
            />
            <div className="comment-buttons">
              <Button content="Post" onClick={this.postComment} />
            </div>
          </Form.Group>
        </Form>
      </Comment.Group>
    );
  }
}

export default Chats;
