// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { LatLngExpression } from "leaflet";

// const MapComponent = ({ latitude, longitude }: { latitude: number; longitude: number;}) => {
   
//   if (latitude === undefined || longitude === undefined) {
//     return <p>Loading map...</p>;
//   }

//   const center: LatLngExpression = [latitude, longitude];

//   return (
//     <MapContainer
//       center={center}
//       zoom={13}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
//       <Marker position={center}>
//         <Popup>Property Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;



import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, LatLng } from "leaflet";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

interface MapComponentProps{
  latitude: number; 
  longitude: number; 
  onLocationChange: (lat: number, lng: number) => void;
  isEditing: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({isEditing, latitude, longitude, onLocationChange}) => {
   const [position, setPosition] = useState<LatLngExpression>([latitude, longitude]);

   if(latitude == 0 || longitude == 0){
      return (
         <Box
            sx={{
               height: "100%", 
               width: "100%", 
            }}
         >
            <Typography
               sx={{
                  color:'gray',
                  textAlign:'center',
                  marginTop:'115px'
               }}
               >
               No location data available
            </Typography>
         </Box>
      )
   }

   return (
      <MapContainer 
         center={position} 
         zoom={13} 
         style={{ height: "100%", width: "100%", marginTop:'10px' }}
      >
         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         
         <Marker 
            position={position} 
            draggable={isEditing} // ✅ Drag enabled only in edit mode
            eventHandlers={{
               dragend: (e) => {
                  if (isEditing) {
                     const newLatLng = (e.target as any).getLatLng() as LatLng;
                     setPosition([newLatLng.lat, newLatLng.lng]);
                     onLocationChange(newLatLng.lat, newLatLng.lng);
                  }
               }
            }}
         >
            <Popup>{isEditing ? "Drag to adjust location" : "Location (Edit to modify)"}</Popup>
         </Marker>
      </MapContainer>
   );
};

export default MapComponent;

