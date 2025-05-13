import React from "react";
import { useState } from "react";
function usePlaceApi() {
  const [result, setResult] = useState(null);

  async function deletePlace(id) {
    if (!id) {
      setResult({ success: false, message: "Ingen ID" });
      return;
    }

    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("Ingen token funnet");
      }

      const response = await fetch(
        `http://localhost:8080/api/Rasteplass/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setResult({ success: true, message: "Sletting gjennomført" });
    } catch (error) {
      setResult({ success: false, message: error.message });
    }
  }

  return { result, deletePlace };
}

export default usePlaceApi;
