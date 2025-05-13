import React from "react";
import usePlaces from "../hooks/usePlaces";
import Webmap from "../components/Map/WebMap";
import WebmapSimple from "../components/Map/WebMapSimple";

function Home({ mapRef, consent }) {
  // const getRasteplasser = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/Rasteplass", {
  //       method: "GET",
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { places } = usePlaces();
  // console.log({ places, loading, error });
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900"></h1>
        </div>
      </header>
      <main>
        <WebmapSimple mapRef={mapRef} consent={consent} places={places} />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* <button
            className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
            onClick={usePlaces()}
          >
            Hent Rasteplasser
          </button> */}
        </div>
      </main>
    </>
  );
}

export default Home;
