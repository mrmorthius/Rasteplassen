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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Logg inn
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Epost
            </label>
            <div class="mt-2">
              <input
                type="email"
                autocomplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navbar-gray sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Passord
              </label>
            </div>
            <div class="mt-2">
              <input
                type="password"
                autocomplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navbar-gray sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
            >
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
