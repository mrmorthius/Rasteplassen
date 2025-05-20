import React, { useState, useEffect } from "react";
import usePlace from "../hooks/usePlace";
import { useParams, useNavigate, Link } from "react-router-dom";
import WebMapMini from "../components/Map/WebMapMini";
import usePlaceApi from "../hooks/usePlaceApi";
import { changeUTF } from "../utils/utils";
import useRating from "../hooks/useRating";
import StarRating from "../components/StarRating";
import GoogleMap from "../components/GoogleMap";
import Vegvesen from "../components/Vegvesen";
import Comments from "../components/Comments/Comments";
import Rating from "../components/Comments/Rating";

function Rasteplass({ isAuthenticated }) {
  const { slug } = useParams();
  const { place, loading } = usePlace(slug);
  const { deleteRating } = useRating();
  const [time, setTime] = useState(null);
  const [posts, setPosts] = useState([]);
  const { deletePlace } = usePlaceApi();
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const [percent, setPercent] = useState(0);
  const [showLines, setShowLines] = useState(2);
  const [giveRating, setGiveRating] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Bekreft sletting av rasteplass")) {
      await deletePlace(id);
      navigate("/rasteplass");
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm("Bekreft sletting av rasteplass")) {
      await deleteRating(id);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (place) {
      const formattedDate = new Date(place.oppdatert)
        .toLocaleString()
        .replace(",", "");
      setTime(formattedDate);
    }
    if (place && place.ratings.length > 0) {
      setPosts(place.ratings);
      var totalRating = 0;
      var count = 0;

      place.ratings.forEach((rating) => {
        if (rating.vurdering !== undefined && rating.vurdering !== null) {
          totalRating += rating.vurdering;
          count += 1;
        }
      });

      var stars = count > 0 ? totalRating / count : 0;
      var starPercent = (stars / 5) * 100;
      setPercent(starPercent);
    }
  }, [place, percent, setTime]);

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
      <main className="mx-auto max-w-7xl px-4 py-5 pb-6 md:pb-0 sm:px-6 lg:px-8">
        {!loading && place != null && (
          <div className="bg-[#f9f9f9] flex justify-around rounded-lg p-4 mb-4 flex-wrap md:flex-nowrap">
            <div className="flex flex-col">
              <div className="px-4 sm:px-0">
                <div className="flex justify-between">
                  <h3 className="text-base/7 font-semibold text-gray-900">
                    {changeUTF(place.rasteplass_informasjon)}
                  </h3>
                  <StarRating percent={percent} />
                </div>
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
                  <Vegvesen vegvesen_id={place.vegvesen_id} />
                  <GoogleMap
                    latitude={place.rasteplass_lat}
                    longitude={place.rasteplass_long}
                  />
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
              <div className="flex flex-wrap mt-6 mb-2 gap-2">
                <a
                  className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                  href="mailto:test1@example.com"
                >
                  Rapporter
                </a>
                {posts && posts.length > 0 && (
                  <button
                    className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                    onClick={() => {
                      setShowComments(!showComments);
                      setShowLines(2);
                    }}
                  >
                    {showComments ? "Skjul kommentarer" : "Vis kommentarer"}
                  </button>
                )}
                {!giveRating && (
                  <button
                    className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                    onClick={() => {
                      setGiveRating(true);
                    }}
                  >
                    Skriv vurdering
                  </button>
                )}
                {isAuthenticated && (
                  <>
                    <Link
                      to={`/admin/edit/rasteplass/${place.rasteplass_id}`}
                      className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                    >
                      Rediger
                    </Link>
                    <button
                      className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                      onClick={() => handleDelete(slug)}
                    >
                      Slett
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
        {giveRating && <Rating slug={slug} setGiveRating={setGiveRating} />}
        <Comments
          posts={posts}
          showComments={showComments}
          isAuthenticated={isAuthenticated}
          handleDeleteComment={handleDeleteComment}
          showLines={showLines}
          setShowLines={setShowLines}
        />
      </main>
    </>
  );
}

export default Rasteplass;
