import React from "react";
import SearchBar from "../components/SearchBar";
import EmphasisButton from "../components/EmphasisButton";
import "./EventListPage.css";

const EventListPage = () => (
  <>
    <div className="event-header">
      <div className="event-heading">
        <h1>Hiking Events: </h1>
      </div>
      <div className="event-button">
        <EmphasisButton />
      </div>
    </div>

    <SearchBar />
    
    <p>Click the New button to create your own event.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>

    <p>Below are the list of hiking events</p>
    
  </>
);

export default EventListPage;