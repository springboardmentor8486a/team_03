import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { decimalToDMS, dmsToDecimal } from "../../utils/coordinateUtils";

const DEFAULT_POSITION = [20.5937, 78.9629]; // Center of India

function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      if (onLocationSelect) onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Selected Location<br />
        {decimalToDMS(position[0], true)}<br />
        {decimalToDMS(position[1], false)}
      </Popup>
    </Marker>
  ) : null;
}

export default function LocationMap({ onLocationChange }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <MapContainer center={DEFAULT_POSITION} zoom={5} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker onLocationSelect={(coords) => {
          setSelected(coords);
          if (onLocationChange) onLocationChange(coords);
        }} />
      </MapContainer>
    </div>
  );
}
