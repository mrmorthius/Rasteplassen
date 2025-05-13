import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "/images/leaflet/marker-orange.png";
import markerShadowPng from "/images/leaflet/marker-shadow.png";
import ChangeView from "./ChangeView";

export default function WebmapMini() {
  const [lat, setLat] = useState(59.91197);
  const [lng, setLng] = useState(10.754432);

  const customIcon = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [40, 51],
    iconAnchor: [16, 41],
  });

  return (
    <div style={{ height: "450px", width: "450px" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
