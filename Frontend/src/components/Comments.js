import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "./Comments.css";

class Comments extends Component {
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
      </Comment.Group>
    );
  }
}

export default Comments;
