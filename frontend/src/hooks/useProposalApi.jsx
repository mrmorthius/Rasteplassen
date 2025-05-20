import React from "react";
import { useState } from "react";
import { apiUrl } from "../config";

function useProposalApi() {
  const [result, setResult] = useState({ success: false, message: "" });

  async function updatePlace(data) {
    if (!data) {
      setResult({ success: false, message: "Ingen data" });
      return;
    }
    if (!data.forslag_id) {
      setResult({ success: false, message: "Ingen ID" });
      return;
    }

    const id = data.forslag_id;

    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("Ingen token funnet");
      }

      const response = await fetch(`${apiUrl}/api/RasteplassForslag/${id}`, {
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

      setResult({ success: true, message: "Oppdatert" });
    } catch (error) {
      setResult({ success: false, message: error.message });
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

      const response = await fetch(`${apiUrl}/api/RasteplassForslag/${id}`, {
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

  async function acceptPlace(id) {
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
        `${apiUrl}/api/RasteplassForslag/${id}/godkjenn`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setResult({ success: true, message: "Rasteplass godkjent" });
    } catch (error) {
      setResult({ success: false, message: error.message });
    }
  }

  return { result, deletePlace, updatePlace, acceptPlace };
}

export default useProposalApi;
