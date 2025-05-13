import React, { useState, useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationContext } from "../LocationProvider";
import { Icon } from "leaflet";
import markerIconPng from "/images/leaflet/marker-orange.png";
import personIconPng from "/images/leaflet/person-icon.png";
import markerShadowPng from "/images/leaflet/marker-shadow.png";
import ChangeView from "./ChangeView";
import { Link } from "react-router-dom";

export default function Webmap({ mapRef, consent, places }) {
  const { lat, setLat, lng, setLng } = useContext(LocationContext);
  const [zoom, setZoom] = useState(12);
  useEffect(() => {
    if (lat === false) {
      setLat(59.91197);
    }
    if (lng === false) {
      setLng(10.754432);
    }

    // Prøv å hente brukerens posisjon hvis consent er gitt
    if (consent === true && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setZoom(14);
          console.log(
            "Posisjon oppdatert:",
            position.coords.latitude,
            position.coords.longitude,
            zoom
          );
        },
        (error) => {
          console.error("Kunne ikke hente posisjon:", error);
        }
      );
    }
  }, [consent, lat, lng, setLat, setLng, zoom]);

  const centerLat = lat !== false ? lat : 59.91197;
  const centerLng = lng !== false ? lng : 10.754432;

  const customIcon = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [40, 51],
    iconAnchor: [16, 41],
  });

  const personIcon = new Icon({
    iconUrl: personIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [50, 51],
    iconAnchor: [24, 8],
  });

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        ref={mapRef}
        center={[centerLat, centerLng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={[centerLat, centerLng]} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />{" "}
        {lat !== false && (
          <Marker position={[centerLat, centerLng]} icon={personIcon}>
            <Popup>Din plassering</Popup>
          </Marker>
        )}
        {places &&
          places.length > 0 &&
          places.map((place, index) => {
            console.log(place);
            return (
              <Marker
                key={index}
                position={[place.rasteplass_lat, place.rasteplass_long]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">
                      {place.rasteplass_navn || "Rasteplass"}
                    </h3>
                    {place.rasteplass_navn && (
                      <>
                        <p>{place.rasteplass_informasjon}</p>
                        <Link
                          to={`/rasteplass/${place.rasteplass_id}`}
                          className="flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                          >
                            <path d="m720-430 80 80v190q0 33-23.5 56.5T720-80H160q-33 0-56.5-23.5T80-160v-560q0-33 23.5-56.5T160-800h220q-8 18-12 38.5t-6 41.5H160v560h560v-270Zm52-174 128 128-56 56-128-128q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-700q0-75 52.5-127.5T620-880q75 0 127.5 52.5T800-700q0 27-8 51t-20 45Zm-152 4q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM160-430v270-560 280-12 22Z" />
                          </svg>
                          <p>Les mer</p>
                        </Link>
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
