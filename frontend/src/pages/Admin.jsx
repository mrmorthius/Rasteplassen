import React, { useEffect, useState } from "react";
import useValidateToken from "../hooks/useValidateToken";
import useProposalPlaces from "../hooks/useProposalPlaces";
import WebMapMini from "../components/Map/WebMapMini";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Admin({ token, logout }) {
  const { isValidated, isLoading } = useValidateToken(token, logout);
  const { places, loading } = useProposalPlaces(token);

  const [listOfPlaces, setListOfPlaces] = useState(places || []);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!places || places.length === 0) return;

    var filteredData = [...places];

    if (search !== "") {
      filteredData = filteredData.filter((element) => {
        return (
          element.rasteplass_navn
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          element.rasteplass_informasjon
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          element.geo_kommune.toLowerCase().includes(search.toLowerCase()) ||
          element.geo_fylke.toLowerCase().includes(search.toLowerCase()) ||
          element.rasteplass_type.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    setListOfPlaces(filteredData);

    const calculatedPageCount = Math.max(
      1,
      Math.ceil(filteredData.length / itemsPerPage)
    );
    setPageCount(calculatedPageCount);
    if (currentPage >= calculatedPageCount) {
      setCurrentPage(0);
    }
  }, [search, places, setListOfPlaces, itemsPerPage, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = listOfPlaces.slice(offset, offset + itemsPerPage);
  const displayingFrom = listOfPlaces.length > 0 ? offset + 1 : 0;
  const displayingTo = Math.min(offset + itemsPerPage, listOfPlaces.length);
  return (
    <>
      <header className="bg-white">{isLoading && <div>Loading...</div>}</header>
      {!isLoading && isValidated && (
        <main
          key="rasteplasser"
          className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between items-center rounded-lg p-4 mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Forslag til rasteplasser
              </h1>
            </div>
            <div className="flex  rounded-xl bg-[#f9f9f9] px-3 py-1.5 gap-2.5 shadow-xs hover:bg-[#f0f0f0] focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-navbar-orange">
              <label
                className="text-sm font-semibold hover:text-black text-black/80 cursor-pointer self-end "
                htmlFor="search"
              >
                Søk
              </label>
              <input
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none text-sm"
              ></input>
            </div>
          </div>
          {!loading &&
            currentItems &&
            currentItems.length > 0 &&
            currentItems.map((place) => (
              <div
                className="flex justify-start border-b-2 border-gray-200 hover:bg-gray-50"
                key={place.rasteplass_id}
              >
                <Link
                  className="flex p-4 mb-4"
                  to={`/admin/new/rasteplass/${place.forslag_id}`}
                >
                  <div className="flex flex-col">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-base/7 font-semibold text-gray-900">
                        {place.rasteplass_navn} - {place.rasteplass_type}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                        {place.rasteplass_informasjon} Rasteplassen ligger i{" "}
                        {place.geo_kommune} kommune ({place.geo_fylke} fylke).
                      </p>
                    </div>
                  </div>{" "}
                </Link>
              </div>
            ))}{" "}
          {!loading && places.length === 0 ? (
            <div className="flex justify-center mb-10">
              Ingen ventende forslag
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex flex-col justify-center mt-6">
            <div className="flex justify-center mb-4 cursor-pointer">
              <ReactPaginate
                previousLabel={"Forrige"}
                nextLabel={"Neste"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex gap-2"}
                previousLinkClassName={
                  "px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
                }
                nextLinkClassName={
                  "px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
                }
                disabledClassName={"text-gray-300 cursor-not-allowed"}
                activeClassName={"bg-navbar-orange text-black font-semibold"}
                pageClassName={
                  "px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
                }
                forcePage={currentPage}
              />
            </div>
            <div className="flex justify-center text-sm text-gray-500">
              {listOfPlaces.length > 0
                ? `Rasteplass ${displayingFrom}-${displayingTo} av ${listOfPlaces.length} stykker`
                : null}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Admin;
