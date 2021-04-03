import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "./Comments.css";

const Comments = () => (
  <Comment.Group>
    <Header as="h3" dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a"> Name </Comment.Author>
        <Comment.Metadata>
          <div> Review Time </div>
        </Comment.Metadata>
        <Comment.Text> How artistic! </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a"> Name </Comment.Author>
        <Comment.Metadata>
          <div> Review Time </div>
        </Comment.Metadata>
        <Comment.Text> How artistic! </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a"> Name </Comment.Author>
        <Comment.Metadata>
          <div> Review Time </div>
        </Comment.Metadata>
        <Comment.Text> How artistic! </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a"> Name </Comment.Author>
        <Comment.Metadata>
          <div> Review Time </div>
        </Comment.Metadata>
        <Comment.Text> How artistic! </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Comment.Group>
);

export default Comments;
