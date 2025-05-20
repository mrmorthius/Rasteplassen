import React from "react";
import { useState, useEffect } from "react";
import { apiUrl } from "../config";

function usePlace(id) {
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
        const response = await fetch(`${apiUrl}/api/Rasteplass/${id}`, {
          method: "GET",
          headers: { Accept: "application/json; charset=utf-8" },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        setPlace(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setPlace(null);
        setLoading(false);
      }
    }
    getPlace();
  }, [id]);

  return { place, loading, error };
}

export default usePlace;
