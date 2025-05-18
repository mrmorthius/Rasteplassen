import React from "react";
import usePlaces from "../hooks/usePlaces";
import WebmapSimple from "../components/Map/WebMapSimple";

function Home({ mapRef, consent }) {
  const { places } = usePlaces();

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900"></h1>
        </div>
      </header>
      <main>
        <WebmapSimple mapRef={mapRef} consent={consent} places={places} />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
      </main>
    </>
  );
}

export default Home;
