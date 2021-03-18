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
  </>
);

export default EventListPage;
