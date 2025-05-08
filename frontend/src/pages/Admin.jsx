import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin({ token, logout }) {
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
            console.log({ data });
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

  const getRasteplasser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Rasteplass", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isValidated && (
        <div>
          <div>Admin</div>
          <button onClick={() => logout()}>Logout</button>
          <h1>Vite + React</h1>
          <h1 className="text-3xl font-bold underline text-yellow-500">
            Hello world! EirikTest12345
          </h1>
          <button onClick={getRasteplasser}>Hent Rasteplasser</button>
        </div>
      )}
    </>
  );
}

export default Admin;
