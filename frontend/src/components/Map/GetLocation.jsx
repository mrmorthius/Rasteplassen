import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { LocationContext } from "../LocationProvider";

export default function GetLocation() {
  const { setLat, setLng } = useContext(LocationContext);
  const [status, setStatus] = useState("");

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }, [setLat, setLng]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);
  return status ? <div className="geolocation-status"></div> : null;
}
