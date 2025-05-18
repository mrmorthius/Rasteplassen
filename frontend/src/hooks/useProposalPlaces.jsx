import React from "react";
import { useState, useEffect } from "react";

function useProposalPlaces(token) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          "http://localhost:8080/api/RasteplassForslag",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [token]);

  return { places, loading, error };
}

export default useProposalPlaces;
