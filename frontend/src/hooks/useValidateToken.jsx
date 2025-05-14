import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useValidateToken(token, logout) {
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(token);
  useEffect(() => {
    if (!token) {
      logout();
      navigate("/login");
    }
    const checkToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/Login/validateJWT",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Vellykket innlogging
        if (response.ok) {
          const data = await response.json();
          if (!data.authenticated) {
            logout();
            navigate("/login");
          } else {
            setIsValidated(true);
            setIsLoading(false);
          }
        } else {
          logout();
          navigate("/login");
        }
      } catch (error) {
        alert("Noe gikk galt ved valdiering");
        console.error(error);
        logout();
        navigate("/login");
      }
    };

    checkToken();
  }, [token, navigate, logout]);

  return { isValidated, isLoading };
}

export default useValidateToken;
