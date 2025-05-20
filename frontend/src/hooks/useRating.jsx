import React from "react";
import { useState } from "react";
import { apiUrl } from "../config";

function useRating() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  async function deleteRating(id) {
    if (!id || !Number.isInteger(Number(id))) {
      const errorResult = { success: false, message: "Ingen ID" };
      setResult(errorResult);
      setLoading(false);
      return;
    }

    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("Ingen token funnet");
      }

      const response = await fetch(`${apiUrl}/api/Rating/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await response.json();
      const successResult = { success: true, message: "Vurdering slettet" };
      setResult(successResult);
      setLoading(false);
      return successResult;
    } catch (error) {
      const errorResult = { success: false, message: error.message };
      setResult(errorResult);
      setLoading(false);
      return errorResult;
    }
  }

  return { result, loading, deleteRating };
}

export default useRating;
