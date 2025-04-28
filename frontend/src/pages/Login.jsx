import { useState, useNavigate } from "react";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const recaptcha = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!recaptcha.current.getValue()) {
      toast.error("Please Submit Captcha");
    }

    if (!email || !password) {
      toast.error("Vennligst fyll ut alle feltene");
      return;
    }

    setIsLoading(true);

    try {
      // Send innloggingsforespørsel til API
      const response = await fetch("http://localhost:8080/api/Login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Innlogging mislyktes");
      }

      // Lagre token og brukerinformasjon i localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          name: data.name,
        })
      );

      // Vis suksessmelding
      toast.success("Innlogging vellykket!");

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Noe gikk galt ved innlogging");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] mx-auto my-20 flex flex-col items-center justify-center font-poppins">
      <h1 className="mb-3 text-4xl font-bold text-[#403F3F] uppercase tracking-wider">
        Login
      </h1>

      <form
        className="w-[30%] mx-auto flex flex-col items-center gap-5"
        onSubmit={handleLogin}
      >
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow focus:outline-none focus:border-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full text-white bg-[#403F3F] py-3 rounded-lg uppercase font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Logger inn..." : "Login"}
        </button>

        <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} ref={recaptcha} />

        <h1 className="font-medium text-sm">Or Login With</h1>
        <div className="w-full flex items-center gap-5 justify-center">
          <button
            type="button"
            className="w-10 h-10 bg-[#403F3F] rounded-lg text-white flex items-center justify-center"
          ></button>
          <button
            type="button"
            className="w-10 h-10 bg-[#403F3F] rounded-lg text-white flex items-center justify-center"
          ></button>
          <button
            type="button"
            className="w-10 h-10 bg-[#403F3F] rounded-lg text-white flex items-center justify-center"
          ></button>
        </div>

        <p className="text-sm">
          Har du ikke en konto?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrer deg
          </Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
