import React, { useState, useEffect } from "react";
import usePlace from "../hooks/usePlace";
import { useParams, useNavigate, Link } from "react-router-dom";
import WebMapMini from "../components/Map/WebMapMini";
import usePlaceApi from "../hooks/usePlaceApi";
import { changeUTF } from "../utils/utils";

function Rasteplass({ isAuthenticated }) {
  const { slug } = useParams();
  const { place, loading } = usePlace(slug);
  const [time, setTime] = useState(null);
  const [posts, setPosts] = useState(null);
  const { deletePlace } = usePlaceApi();
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Bekreft sletting av rasteplass")) {
      await deletePlace(id);
      navigate("/rasteplass");
    }
  };
  useEffect(() => {
    if (place) {
      const formattedDate = new Date(place.oppdatert)
        .toLocaleString()
        .replace(",", "");
      setTime(formattedDate);
    }
  }, [place, setTime]);
  // console.log({ place });

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          {loading && <div>Loading...</div>}
          {!loading && place && (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {changeUTF(place.rasteplass_navn)}
            </h1>
          )}
          {!loading && place === null && (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Ingen rasteplasser funnet
            </h1>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {!loading && place != null && (
          <div className="bg-[#f9f9f9] flex justify-around rounded-lg p-4 mb-4 flex-wrap md:flex-nowrap">
            <div className="flex flex-col">
              <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  {changeUTF(place.rasteplass_informasjon)}
                </h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                  Rasteplassen ligger i {changeUTF(place.geo_kommune)} kommune (
                  {changeUTF(place.geo_fylke)} fylke).
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Renovasjon
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {place.rasteplass_renovasjon}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Toalett
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {place.rasteplass_toalett ? "Ja" : "Nei"}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Type
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {place.rasteplass_type}
                    </dd>
                  </div>
                  {place.vegvesen_id && place.vegvesen_id !== null ? (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Vegvesenet
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <a
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          target="_blank"
                          href={
                            "https://vegkart.atlas.vegvesen.no/?objektType=39&vegobjekt=" +
                            place.vegvesen_id +
                            "#kartlag:geodata/@600000,7162941,4/valgt:" +
                            place.vegvesen_id +
                            ":39"
                          }
                        >
                          Lenke
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Google Maps - Vegbeskrivelse
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {place.rasteplass_lat && place.rasteplass_long ? (
                        <a
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          target="_blank"
                          href={
                            "https://www.google.com/maps/search/?api=1&query=" +
                            place.rasteplass_lat +
                            "," +
                            place.rasteplass_long
                          }
                        >
                          Lenke
                        </a>
                      ) : (
                        "Ingen lenke funnet"
                      )}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Informasjon oppdatert
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {time && time != null
                        ? time
                        : "Ingen oppdateringer funnet"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex mt-6 gap-2">
                <a
                  className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                  href="mailto:test1@example.com"
                >
                  Rapporter Rasteplass
                </a>
                <button
                  className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                  onClick={() => setShowComments(!showComments)}
                >
                  {showComments ? "Skjul kommentarer" : "Vis kommentarer"}
                </button>
                {isAuthenticated && (
                  <>
                    <Link
                      to={`/admin/edit/rasteplass/${place.rasteplass_id}`}
                      className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                    >
                      Rediger Rasteplass
                    </Link>
                    <button
                      className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                      onClick={() => handleDelete(slug)}
                    >
                      Slett Rasteplass
                    </button>
                  </>
                )}
              </div>
            </div>
            {place && place.rasteplass_lat && place.rasteplass_long ? (
              <div className="rounded-md border-gray-300 bg-white shadow-sm w-[450px] h-[450px]">
                <WebMapMini
                  lat={place.rasteplass_lat}
                  lng={place.rasteplass_long}
                  id={place.rasteplass_id}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
        {showComments && (
          <div className="bg-[#f9f9f9] flex justify-around rounded-lg p-4 mb-4">
            {posts &&
              posts.map((post) => (
                <>
                  <div>{post.kommentar}</div>
                </>
              ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Rasteplass;
