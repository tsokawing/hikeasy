/*	
	What: This is used to add <Link> to the trailListPage.js upon clicking particular trail, and mapping out the trail
	Who: Tso Ka Wing 1155125488
	Where: React components for the /trails endpoint in frontend
	Why: Upon clicking particular card of the trail, we need to redirect the users 
	How: import css style for the <CommentSection>
	*/

//imports
import React, { Component } from "react";
import Comments from "./Comments";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


class CommentSection extends Component {
  render() {
    return (
      <div className="trail-list">
        {this.props.trailList.map((item) => (
          <Link to={`../trail/${item.id}`}>
            <TrailCard
              img="https://picsum.photos/id/1018/400/300"
              title={item.name}
              description={item.description}
              author="Admin"
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default CommentSection;
