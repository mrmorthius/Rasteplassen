import React from "react";
import { useState, useEffect } from "react";
function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:8080/api/Rasteplass", {
          method: "GET",
        });
        const data = await response.json();
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  return { places, loading, error };
}

export default usePlaces;
