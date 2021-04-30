/*	
	What: This is used to add style to the <EmphasisButton> and defiine the functionality of it
	Who: Tso Ka Wing 1155125488
	Where: React components for the Button in the nav bar
	Why: We need to set up standard style for the Button for the button in nav bar, so we have to define the style in /componenet directory
	How: import css style for the <EmphasisButton> componenet using the <Button> of semantic-ui, and use react-router to set router
*/

//imports
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
