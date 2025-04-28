import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Send til admin hvis innlogget
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sjekk bruker og passord mot API
      const response = await fetch("http://localhost:8080/api/Login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Vellykket innlogging
      if (response.ok) {
        const data = await response.json();
        login(data.token);
        navigate("/admin");
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
    <div className="bg-amber-200">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            className="bg-white text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            className="bg-white text-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Logg inn</button>
      </form>
    </div>
  );
};

export default Login;
