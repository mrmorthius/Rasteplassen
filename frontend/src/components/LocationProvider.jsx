import React from "react";

export const LocationContext = React.createContext();

function LocationProvider({ children }) {
  const [lat, setLat] = React.useState(false);
  const [lng, setLng] = React.useState(false);

  return (
    <LocationContext.Provider value={{ lat, setLat, lng, setLng }}>
      {children}
    </LocationContext.Provider>
  );
}
export default LocationProvider;
