import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class EmphasisButton extends Component {
  render() {
    let type = this.props.type;
    return (
      <>
        <Link to={`../new-trail`}>
          <Button onClick="" size="mini" secondary>
            New
          </Button>
        </Link>
      </>
    );
  }
}

export default EmphasisButton;
