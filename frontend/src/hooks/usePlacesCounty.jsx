import React from "react";
import { useState, useEffect } from "react";
import { apiUrl } from "../config";

function usePlacesCounty(id) {
  const [countyPlaces, setCountyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function (id) {
      try {
        const response = await fetch(`${apiUrl}/api/Rasteplass/kommune/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        setCountyPlaces(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [id]);

  return { countyPlaces, loading, error };
}

export default usePlacesCounty;
