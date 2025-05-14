import React from "react";
import { useState, useEffect } from "react";
function useProposalPlace(id, token) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (!id || !Number.isInteger(Number(id))) {
      setPlace(null);
      setLoading(false);
      return;
    }

    async function getPlace() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/RasteplassForslag/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPlace(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setPlace(null);
        setLoading(false);
      }
    }
    getPlace();
  }, [id, token]);

  return { place, loading, error };
}

export default useProposalPlace;
