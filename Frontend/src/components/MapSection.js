// import React, { Component, useState  } from "react";
// import { MapContainer, TileLayer, Marker, Popup ,useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet/dist/images/marker-shadow.png";
// import L from 'leaflet';

// var points = [];
// var polyline = null;

// // function AddMarkerToClick(props) {
// //     const [markers, setMarkers] = useState([]);
// //     const defaultIcon = new L.Icon({
// //         iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
// //         iconSize:     [25, 41], // size of the icon
// //         shadowSize:   [50, 64], // size of the shadow
// //         iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
// //         shadowAnchor: [4, 62],  // the same for the shadow
// //         popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// //       });
// //     const map = useMapEvents({
// //       click(e) {
// //         var stuSplit = L.latLng(e.latlng.lat, e.latlng.lng);
// //         var marker = L.marker(stuSplit,{icon: defaultIcon}, {riseOnHover: true, draggable: false}).bindPopup("" + e.latlng.lat + ", " + e.latlng.lng).addTo(map);
// //         console.log(marker.getLatLng());
// //         points.push(marker.getLatLng());
// //       },
// //     })

// //     return (
// //       <>
// //         {markers.map(marker =>
// //           <Marker position ={marker}>
// //           </Marker>
// //         )}
// //       </>
// //     )
// //   }

// class MapSection extends Component{

//     polyline = undefined;
//     constructor(){
//         super();
//         this.state = {
//             points: [],
//             mapList: [],

//         };
//         // polyline = L.polyline([], {color:'orange'}).addTo(map);
//         this.handler = this.handler.bind(this)
//     }
//     AddMarkerToClick = () => {
//         console.log("START CLIKING");
//         const [markers, setMarkers] = this.useState([]);
//         const defaultIcon = new L.Icon({
//             iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
//             iconSize:     [25, 41], // size of the icon
//             shadowSize:   [50, 64], // size of the shadow
//             iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
//             shadowAnchor: [4, 62],  // the same for the shadow
//             popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
//           });
//         const map = this.useMapEvents({
//           click(e) {
//             var stuSplit = L.latLng(e.latlng.lat, e.latlng.lng);
//            var marker = L.marker(stuSplit,{icon: defaultIcon}, {riseOnHover: true, draggable: false}).bindPopup("" + e.latlng.lat + ", " + e.latlng.lng).addTo(map);
//             console.log(marker.getLatLng());
//             this.setState({points: marker.getLatLng()});
//           },
//         })

//         this.setState({mapList: map});
//         // console.log("11");
//         if (this.state.polyline === []) {
//             // polyline = L.polyline([], {color:'orange'}).addTo(map);
//         }

//         return (
//           <>
//             {markers.map(marker =>
//               <Marker position ={marker}>
//               </Marker>
//             )}
//           </>
//         )
//       };
//     handler() {
//         this.setState({
//           points: '1'
//         })
//     }
//     render(){
//         console.log(this.state.points);
//         return (
//             <MapContainer
//             center={[22.302711, 114.177216]}
//             zoom={12}
//             scrollWheelZoom={false}
//             onClick={this.AddMarkerToClick}
//             >
//             <TileLayer
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//         </MapContainer>
//         )
//     }
// }
// export default MapSection

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

  saveMarkers = (newMarkerCoords) => {
    const point = [...this.state.point, newMarkerCoords];
    this.setState((prevState) => ({ ...prevState, point }));
  };

  render() {
    console.log(this.state.point);
    return (
      <MapContainer
        className="Map"
        center={[22.302711, 114.177216]}
        zoom={15}
        scrollWheelZoom={false}
        //   style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">© <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">© OSM contributors</a>'
          url="https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=XizVS9BuQftVgJAFcw6YteSaCP9OyCzJIYI6vqXeFWQjo7EbAaeYfIVc34YfUWzZ"
        />
        <MyComponent saveMarkers={this.saveMarkers} />
        <Polyline
          pathOptions={{ color: "lime" }}
          positions={this.state.point}
        />
      </MapContainer>
    );
  }
}

export default MapSection;
