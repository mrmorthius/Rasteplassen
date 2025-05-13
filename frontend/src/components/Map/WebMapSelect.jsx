import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "/images/leaflet/marker-orange.png";
import markerShadowPng from "/images/leaflet/marker-shadow.png";

export default function WebmapSelect({ coordinates, setCoordinates }) {
  console.log("Coordinates:", coordinates);
  const [coords, setCoords] = useState(coordinates);

  useEffect(() => {
    setCoordinates(coords);
  }, [coords, setCoordinates]);

  function SetMarker() {
    useMapEvents({
      click(e) {
        setCoords([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  const customIcon = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [40, 51],
    iconAnchor: [16, 41],
  });

  return (
    <div className="h-[450px] w-[450px]">
      <MapContainer
        center={coords}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetMarker />
        <Marker position={coords} icon={customIcon} />
      </MapContainer>
    </div>
  );
}
