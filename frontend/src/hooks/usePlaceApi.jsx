import React from "react";
import { useState } from "react";
import { apiUrl } from "../config";

function usePlaceApi() {
  const [result, setResult] = useState(null);

  async function updatePlace(data) {
    console.log(data);
    if (!data) {
      const errorResult = { success: false, message: "Ingen data" };
      setResult(errorResult);
      return;
    }
    if (!data.rasteplass_id) {
      const errorResult = { success: false, message: "Ingen ID" };
      setResult(errorResult);
      return;
    }

    const id = data.rasteplass_id;

    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("Ingen token funnet");
      }

      const response = await fetch(`${apiUrl}/api/Rasteplass/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const successResult = { success: true, message: "Oppdatert" };
      setResult(successResult);
      return successResult;
    } catch (error) {
      const errorResult = { success: false, message: error.message };
      setResult(errorResult);
      return errorResult;
    }
  }

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

      const response = await fetch(`${apiUrl}/api/Rasteplass/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setResult({ success: true, message: "Sletting gjennomført" });
    } catch (error) {
      setResult({ success: false, message: error.message });
    }
  }

  return { result, deletePlace, updatePlace };
}

export default usePlaceApi;
