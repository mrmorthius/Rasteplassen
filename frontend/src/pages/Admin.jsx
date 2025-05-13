import React from "react";
import useValidateToken from "../hooks/useValidateToken";

function Admin({ token, logout }) {
  const { isValidated, isLoading } = useValidateToken(token, logout);

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
