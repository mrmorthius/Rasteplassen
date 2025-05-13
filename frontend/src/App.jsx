import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LocationProvider from "./components/LocationProvider";
import AppRoutes from "./components/Routes";
import GetLocation from "./components/Map/GetLocation";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const mapRef = useRef();
  const [consent] = useState(false);

  // Kontroller om token er utstedt
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    console.log("Consent:", consent);
  }, []);

  // Funksjonalitet for å logge inn og lage token
  const login = (authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setIsAuthenticated(true);
  };

  // Funksjonalitet for å slette token og logge ut
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <LocationProvider>
      <GetLocation mapRef={mapRef} />
      <BrowserRouter>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          token={token}
          logout={logout}
          login={login}
          mapRef={mapRef}
          consent={consent}
        />
      </BrowserRouter>
    </LocationProvider>
  );
}

export default App;
