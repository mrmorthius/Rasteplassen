import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import WebmapSelect from "../components/Map/WebMapSelect";
import { useNavigate } from "react-router-dom";

function New() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [trash, setTrash] = useState(false);
  const [toilet, setToilet] = useState(false);
  const [access, setAccess] = useState(false);
  const [county, setCounty] = useState("Akershus");
  const [municipality, setMunicipality] = useState("");
  const [coordinates, setCoordinates] = useState([59.91197, 10.754432]);
  const [vegvesen, setVegvesen] = useState("");
  const navigate = useNavigate();
  const countys = [
    "Akershus",
    "Oslo",
    "Vestland",
    "Rogaland",
    "Trøndelag",
    "Innlandet",
    "Agder",
    "Østfold",
    "Møre og Romsdal",
    "Buskerud",
    "Vestfold",
    "Nordland",
    "Telemark",
    "Troms",
    "Finnmark",
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    const rasteplass = {
      rasteplass_navn: name,
      rasteplass_type: type,
      rasteplass_informasjon: info,
      geo_fylke: county,
      geo_kommune: municipality,
      rasteplass_toalett: toilet,
      rasteplass_renovasjon: trash,
      rasteplass_tilgjengelig: access,
      rasteplass_vegvesen_id: vegvesen,
      rasteplass_lat: coordinates[0],
      rasteplass_long: coordinates[1],
    };

    try {
      const response = await fetch(`http://localhost:8080/api/Rasteplass/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rasteplass),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <form onSubmit={(event) => submitHandler(event)}>
          <div className="space-y-2">
            <div className="border-b border-gray-900/10 pb-6">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Forslag til ny rasteplass
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Savner du en rasteplass? Fyll ut skjemaet under så skal vi se på
                det. Vi kan ikke garantere at den blir lagt ut på nettsiden.
              </p>
            </div>

            <div>
              <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Navn på rasteplass
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sandmoen kro"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="type"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      placeholder="Parkering, rasteplass, rasteplass med toalett"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="county"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Fylke
                  </label>
                  <div className="mt-2">
                    <select
                      type="text"
                      id="county"
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      {countys &&
                        countys.map((place) => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="municipality"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Kommune
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="municipality"
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      placeholder="Trondheim"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="vegvesen"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Vegvesen ID
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="vegvesen"
                      value={vegvesen}
                      onChange={(e) => setVegvesen(e.target.value)}
                      placeholder="ID til rasteplass fra vegvesenet"
                      autoComplete="number"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="coordinates"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Koordinater
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-between w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6">
                      <div>{coordinates[0] + ", " + coordinates[1]}</div>
                      <Popup
                        trigger={
                          <button type="button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#434343"
                            >
                              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
                            </svg>
                          </button>
                        }
                        position="center center"
                      >
                        {(close) => (
                          <>
                            <div className="bg-white shadow-lg w-[450px] h-[450px] relative">
                              <button
                                className="absolute top-2 right-2 bg-white rounded-full p-1 w-8 h-8 hover:bg-[#f0f0f0] shadow-md z-[401] cursor-pointer"
                                onClick={close}
                              >
                                X
                              </button>
                              <WebmapSelect
                                coordinates={coordinates}
                                setCoordinates={setCoordinates}
                              />
                            </div>
                          </>
                        )}
                      </Popup>
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="info"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Informasjon
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="info"
                      rows="3"
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                      placeholder="Informasjon om rasteplassen"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-6">
              <div className="mt-2 space-y-3">
                <fieldset>
                  <div className="mt-6 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="toilets"
                            aria-describedby="toilets-toggle"
                            type="checkbox"
                            checked={toilet}
                            onChange={(e) => setToilet(e.target.checked)}
                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              className="opacity-0 group-has-checked:opacity-100"
                              d="M3 8L6 11L11 3.5"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              className="opacity-0 group-has-indeterminate:opacity-100"
                              d="M3 7H11"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label
                          htmlFor="toilets"
                          className="font-medium text-gray-900"
                        >
                          Toalett
                        </label>
                        <p id="toilets-description" className="text-gray-500">
                          Har rasteplassen toalett?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="trash"
                            aria-describedby="trash-description"
                            checked={trash}
                            onChange={(e) => setTrash(e.target.checked)}
                            type="checkbox"
                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              className="opacity-0 group-has-checked:opacity-100"
                              d="M3 8L6 11L11 3.5"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              className="opacity-0 group-has-indeterminate:opacity-100"
                              d="M3 7H11"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label
                          htmlFor="trash"
                          className="font-medium text-gray-900"
                        >
                          Renovasjon
                        </label>
                        <p id="trash-description" className="text-gray-500">
                          Har rasteplassen søppelbøtter?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="access"
                            aria-describedby="access-description"
                            type="checkbox"
                            checked={access}
                            onChange={(e) => setAccess(e.target.checked)}
                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              className="opacity-0 group-has-checked:opacity-100"
                              d="M3 8L6 11L11 3.5"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              className="opacity-0 group-has-indeterminate:opacity-100"
                              d="M3 7H11"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label
                          htmlFor="access"
                          className="font-medium text-gray-900"
                        >
                          Tilgjengelig
                        </label>
                        <p id="access-description" className="text-gray-500">
                          Er rasteplassen åpen og tilgjengelig?{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm/6 text-gray-600 align-middle">
                Vennligst ikke foreslå private områder som ikke er åpen for
                almenn trafikk.
              </p>
              <div className="flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-gray-900 cursor-pointer px-3 py-2 hover:rounded-md hover:bg-[#f9f9f9]"
                  onClick={() =>
                    confirm("Tilbakestill skjema", window.location.reload())
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </header>
  );
}

export default New;
