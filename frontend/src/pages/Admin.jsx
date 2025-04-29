import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin({ token, logout }) {
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [isValidated, token, navigate]);

  const checkToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/Login/validateJWT",
        {
          method: "GET",
          headers: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      );

      // Vellykket innlogging
      if (response.ok) {
        const data = await response.json();
        if (data.token) navigate("/admin");
      } else {
        // Mislykket innlogging
        alert("Feil brukernavn eller passord");
      }
    } catch (error) {
      alert("Noe gikk galt ved innlogging");
      console.error(error);
      navigate("/login");
    }
  };
  return (
    <>
      <div>Admin</div>
      <button onClick={() => logout()}>Logout</button>
      <h1>Vite + React</h1>
      <h1 className="text-3xl font-bold underline text-yellow-500">
        Hello world! EirikTest12345
      </h1>
    </>
  );
}

export default Admin;
