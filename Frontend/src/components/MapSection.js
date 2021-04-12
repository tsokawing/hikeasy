import React, { Component, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function MyComponent({ saveMarkers }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], { icon }).addTo(map);
      saveMarkers([lat, lng]);
    },
  });
  return null;
}

class MapSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [[40.7, -74]],
      point: [],
    };
  }

  componentDidMount() {
    if (this.props.trail) {
      var polyline = require("@mapbox/polyline");
      let waypoints = polyline.decode(this.props.trail.waypoints, 6);
      this.setState({ point: waypoints });
    }
  }

  saveMarkers = (newMarkerCoords) => {
    const point = [...this.state.point, newMarkerCoords];
    this.setState((prevState) => ({ ...prevState, point }));
    // console.log(this.state.point);
  };

  render() {
    return (
      <MapContainer
        className="Map"
        center={[22.28552, 114.15769]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">© <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">© OSM contributors</a>'
          url="https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=XizVS9BuQftVgJAFcw6YteSaCP9OyCzJIYI6vqXeFWQjo7EbAaeYfIVc34YfUWzZ"
        />
        <MyComponent saveMarkers={this.saveMarkers} />
        {this.state.point.map((item) => (
          <Marker position={[item[0], item[1]]} icon={icon} />
        ))}
        <Polyline
          pathOptions={{ color: "#9b3675" }}
          positions={this.state.point}
        />
      </MapContainer>
    );
  }
}

export default MapSection;
