import React, { useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "/images/leaflet/marker-icon.png";
import { Link } from "react-router-dom";
import { LocationContext } from "../LocationProvider";

import { Icon } from "leaflet";

export default function Webmap({ places, mapRef, consent }) {
  //   const { postData, setPost } = React.useContext(PostContext);
  const { lat, setLat, lng, setLng } = useContext(LocationContext);
  console.log("lat", lat, " lng ", lng);
  const mapCenter = [lat, lng];

  useEffect(() => {
    if (lat === false) {
      setLat(65.84334244692293);
    }
    if (lng === false) {
      setLng(13.202311134528127);
    }

    if (consent === true && lat) {
      console.log(consent, "etter");
      console.log("lat", lat, " lng ", lng);
    }
  }, [consent, lat, lng]);

  console.log(places);

  return (
    <div className="w-full h-500px">
      <MapContainer
        ref={mapRef}
        center={lat ? mapCenter : [65.84334244692293, 13.202311134528127]}
        zoom={lat ? 16 : 4}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lat ? (
          <Marker
            position={[lat ? lat : 63.43, lng ? lng : 10.3957]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [30, 41],
                iconAnchor: [16, 41],
              })
            }
          >
            <Popup>Du er her!</Popup>
          </Marker>
        ) : null}
        {/* {places && */}
        {/* places.map((place) => ( */}
        {/* <Marker */}
        {/* key={crypto.randomUUID()}
              position={[place.rasteplass_lat, place.rasteplass_long]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [41, 41],
                  iconAnchor: [16, 41],
                })
              }
            >
              <Popup className="mx-auto" key={place.rasteplass_id.current}> */}
        {/* <Link to={"/place/" + place.slug.current} key={place.slug.current}>
                  <h1>{place.title}</h1>
                </Link> */}
        {/* <p>Hihi</p> */}
        {/* <p>{place.description[0].children[0].text}</p> */}
        {/* </Popup> */}
        {/* </Marker> */}
        {/* ))} */}
        {/* {location.pathname === "/place" ? <PopulateRooms /> : null} */}
        {/* <RecenterAuto lat={lat} lng={lng} /> */}
      </MapContainer>
      <div className="width-full flex pt-10 pb-10 text-red-700 items-center justify-center"></div>
    </div>
  );
}
