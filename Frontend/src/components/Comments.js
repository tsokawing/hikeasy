import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "./Comments.css";
import http from "../http-common";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComments: [],
      rating: [],
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ newComments: value });
    console.log(this.state.newComments);
  };

  postComment = () => {
    let formData = new FormData();
    formData.append("userID", 7);
    formData.append("rating", 2);
    formData.append("comment", this.state.newComments);

    console.log("Add comments");

    http
      .post(
        "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/review/publish_review/2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
    console.log(this.state.newComments);
  };

  render() {
    let reviews = this.props.reviews;

    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {reviews.map((item) => (
          <div className="review-block">
            <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">{item.id}</Comment.Author>
                <Comment.Metadata>
                  <div>{item.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{item.comment}</Comment.Text>
                {/* <Comment.Actions>
                  <Comment.Action> Reply </Comment.Action>
                </Comment.Actions> */}
              </Comment.Content>
            </Comment>
            <div>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="read-only"
                value={item.rating}
                size="large"
                readOnly
              />
            </div>
          </div>
        ))}
        <Form>
          <Form.Group>
            <Form.TextArea
              placeholder="Name"
              name="name"
              // value={coommen}
              onChange={this.handleChange}
            />
            <Form.Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              onClick={this.postComment}
              primary
            />
          </Form.Group>
        </Form>
      </Comment.Group>
    );
  }
}

export default Comments;
