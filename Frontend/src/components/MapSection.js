import React, { Component, useState  } from "react";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import L from 'leaflet';

function AddMarkerToClick(props) {
    const [markers, setMarkers] = useState([]);
    const defaultIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    const map = useMapEvents({
      click(e) {
        var stuSplit = L.latLng(e.latlng.lat, e.latlng.lng);
       var marker = L.marker(stuSplit,{icon: defaultIcon}, {riseOnHover: true, draggable: false}).bindPopup("" + e.latlng.lat + ", " + e.latlng.lng).addTo(map);
       console.log(marker.getLatLng());
      },
    })
  
    return (
      <>
        {markers.map(marker => 
          <Marker position ={marker}>
          </Marker>
        )}
      </>
    )
  }
  
class MapSection extends Component{

    render(){
        return (
            <MapContainer
            center={[22.302711, 114.177216]}
            zoom={12}
            scrollWheelZoom={false}
            // onClick={this.handleClick}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddMarkerToClick/>
        </MapContainer>    
        )
    }
}
export default MapSection

// import React, { Component } from "react";
// import {MapContainer, TileLayer, Popup, Marker, withLeaflet} from "react-leaflet";


// const MyMarker = props => {

//   const initMarker = ref => {
//     if (ref) {
//       ref.leafletElement.openPopup()
//     }
//   }

//   return <Marker ref={initMarker} {...props}/>
// }

// class MapSection extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentPos: null
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }


//   handleClick(e){
//     this.setState({ currentPos: e.latlng });
//   }

//   render() {
//     return (
//       <div>
//         <MapContainer center={this.props.center} zoom={this.props.zoom} onClick={this.handleClick}>
//           <TileLayer
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           { this.state.currentPos && <MyMarker position={this.state.currentPos}>
//             <Popup position={this.state.currentPos}>
//               Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
//             </Popup>
//           </MyMarker>}
//         </MapContainer>
//       </div>
//     )
//   }
// }

// export default MapSection;